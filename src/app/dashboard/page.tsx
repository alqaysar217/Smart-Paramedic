
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Car, 
  Flame, 
  Activity, 
  Zap, 
  Droplets, 
  AlertCircle,
  Bell,
  Navigation,
  MapPin,
  Search,
  Loader2
} from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useUser();
  const db = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, "users", user.uid);
  }, [db, user]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(userProfileRef);

  // منطق الإجبار: إذا كانت فصيلة الدم "غير محددة"، فهذا يعني أن المستخدم جديد ولم يكمل ملفه
  useEffect(() => {
    if (!isProfileLoading && profile && profile.bloodType === "غير محدد") {
      router.push("/profile?reason=incomplete");
    }
  }, [profile, isProfileLoading, router]);

  const quickActions = [
    { id: "accident", label: "حادث سير", icon: Car, color: "text-orange-500 bg-orange-50" },
    { id: "fire", label: "حريق", icon: Flame, color: "text-red-500 bg-red-50" },
    { id: "faint", label: "إغماء", icon: Activity, color: "text-blue-500 bg-blue-50" },
    { id: "electric", label: "صعق", icon: Zap, color: "text-yellow-500 bg-yellow-50" },
    { id: "bleeding", label: "نزيف", icon: Droplets, color: "text-rose-500 bg-rose-50" },
    { id: "other", label: "أخرى", icon: AlertCircle, color: "text-slate-500 bg-slate-50" },
  ];

  const logo = PlaceHolderImages.find((img) => img.id === "medical-app-logo");

  if (isProfileLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-5 h-5 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-24 font-cairo" dir="rtl">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 h-14 flex items-center justify-between shadow-soft">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 relative rounded-[10px] overflow-hidden border border-slate-100">
            <Image 
              src={logo?.imageUrl || "https://images.unsplash.com/photo-1583324113626-70df0f43aaad?w=200&h=200&fit=crop"} 
              alt="Logo" 
              fill 
              className="object-cover"
            />
          </div>
          <h1 className="text-[13px] font-bold text-slate-800">المسعف الذكي</h1>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.push('/notifications')}
          className="rounded-[10px] bg-slate-50 h-9 w-9 relative active-scale border border-slate-100"
        >
          <Bell className="w-4 h-4 text-slate-600" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-white"></span>
        </Button>
      </header>

      <main className="px-4 pt-4 space-y-6">
        <section className="flex justify-between items-center px-1">
          <div>
            <p className="text-[9px] font-bold text-slate-400 mb-0.5 uppercase tracking-wider">مرحباً بك مجدداً</p>
            <h1 className="text-md font-bold text-slate-900 leading-tight">
               {profile?.fullName?.split(' ')[0] || "المستخدم العزيز"}
            </h1>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex -space-x-1.5 rtl:space-x-reverse">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm relative">
                  <Image src={`https://picsum.photos/seed/${i+20}/100/100`} alt="Medic" fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-[7px] font-bold text-accent uppercase flex items-center gap-1">
              <span className="w-1 h-1 bg-accent rounded-full animate-pulse"></span>
              مسعفون نشطون الآن
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 px-1">
            <MapPin className="w-3 h-3 text-primary" /> خريطة المكلا الحية
          </h2>
          
          <Card className="overflow-hidden border-none shadow-soft rounded-[10px] bg-slate-100 relative aspect-[16/9]">
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              src="https://www.openstreetmap.org/export/embed.html?bbox=49.10,14.52,49.15,14.56&amp;layer=mapnik&amp;marker=14.54,49.12"
              className="w-full h-full grayscale-[0.2] contrast-[1.1]"
              style={{ border: 0 }}
            ></iframe>
            
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-white/95 backdrop-blur p-2.5 rounded-[10px] shadow-lg flex items-center justify-between border border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                    <Search className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-800 truncate max-w-[120px]">
                      {profile?.homeAddress || "حي فوة، المكلا"}
                    </p>
                    <p className="text-[8px] text-slate-400">موقعك الحالي</p>
                  </div>
                </div>
                <Button onClick={() => router.push('/track')} size="icon" className="h-8 w-8 bg-primary rounded-[10px] shadow-md active-scale">
                  <Navigation className="w-3.5 h-3.5 text-white" />
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="flex flex-col items-center justify-center py-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20 scale-125"></div>
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping [animation-delay:-1s] opacity-20 scale-150"></div>
            
            <button 
              onClick={() => router.push('/report?type=urgent')}
              className="relative z-10 w-32 h-32 bg-primary rounded-full flex flex-col items-center justify-center text-white shadow-xl shadow-primary/30 active-scale emergency-pulse border-[5px] border-white/95"
            >
              <div className="p-2 bg-white/10 rounded-full mb-1">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
              <span className="text-[13px] font-black tracking-tight leading-none">طلب نجدة</span>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] mt-1.5 opacity-80">Urgent SOS</span>
            </button>
          </div>
          <p className="mt-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest px-6 text-center leading-relaxed">اضغط في حالات الطوارئ القصوى فقط</p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <div className="w-0.5 h-2.5 bg-primary rounded-full"></div>
              بلاغ سريع
            </h2>
            <button className="text-[9px] text-primary font-bold">المزيد</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => router.push(`/report?type=${action.id}`)}
                className="flex flex-col items-center p-3 bg-white rounded-[10px] border border-slate-50 shadow-soft hover:bg-slate-50 transition-all active-scale group"
              >
                <div className={`p-2.5 rounded-lg mb-2 transition-all group-hover:scale-105 ${action.color}`}>
                  <action.icon className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-bold text-slate-700">{action.label}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <BottomNav activeTab="home" />
    </div>
  );
}
