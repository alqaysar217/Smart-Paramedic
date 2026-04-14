
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  Maximize2,
  CheckCircle2,
  Clock
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

  const { data: profile } = useDoc(userProfileRef);

  const quickActions = [
    { id: "accident", label: "حادث سير", icon: Car, color: "text-orange-500 bg-orange-50" },
    { id: "fire", label: "حريق", icon: Flame, color: "text-red-500 bg-red-50" },
    { id: "faint", label: "إغماء", icon: Activity, color: "text-blue-500 bg-blue-50" },
    { id: "electric", label: "صعق", icon: Zap, color: "text-yellow-500 bg-yellow-50" },
    { id: "bleeding", label: "نزيف", icon: Droplets, color: "text-rose-500 bg-rose-50" },
    { id: "other", label: "أخرى", icon: AlertCircle, color: "text-slate-500 bg-slate-50" },
  ];

  const notifications = [
    { id: 1, title: "سيارة الإسعاف قريبة", desc: "الوحدة AMB-022 تبعد 500 متر عنك الآن", time: "منذ دقيقتين", icon: Navigation, color: "text-blue-500" },
    { id: 2, title: "تم تحديث الملف الطبي", desc: "تم حفظ بيانات فصيلة الدم بنجاح في السحابة", time: "منذ ساعة", icon: CheckCircle2, color: "text-green-500" },
    { id: 3, title: "تنبيه جوي", desc: "يرجى توخي الحذر عند القيادة في ساحل المكلا اليوم", time: "منذ 3 ساعات", icon: AlertCircle, color: "text-orange-500" },
  ];

  const logo = PlaceHolderImages.find((img) => img.id === "medical-app-logo");

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-28 font-cairo" dir="rtl">
      {/* Header Updated for Logo and Notifications */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-5 h-16 flex items-center justify-between shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative bg-primary/5 rounded-xl border border-primary/10 overflow-hidden shadow-sm">
            {logo ? (
              <Image 
                src={logo.imageUrl} 
                alt="المسعف الذكي" 
                fill 
                className="object-cover"
                data-ai-hint={logo.imageHint}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary text-white">
                <Activity className="w-6 h-6" />
              </div>
            )}
          </div>
          <div className="flex flex-col text-right">
            <h1 className="text-sm font-black text-slate-900 leading-none">المسعف الذكي</h1>
            <p className="text-[9px] text-slate-400 font-bold mt-1 tracking-tight">Smart Medic Mukalla</p>
          </div>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-2xl bg-slate-50 h-11 w-11 relative active-scale border border-slate-100">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full ring-2 ring-white"></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 rounded-[2rem] border-none shadow-2xl overflow-hidden mt-2" align="start">
            <div className="bg-slate-900 p-5 text-white">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-sm">مركز التنبيهات</h3>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">3 جديدة</span>
              </div>
            </div>
            <div className="max-h-[350px] overflow-y-auto bg-white">
              {notifications.map((n) => (
                <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-4 cursor-pointer">
                  <div className={`p-2 rounded-xl bg-slate-50 h-fit ${n.color}`}>
                    <n.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[12px] font-black text-slate-800">{n.title}</p>
                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{n.desc}</p>
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-300 font-bold pt-1">
                      <Clock className="w-3 h-3" />
                      {n.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full h-12 text-[10px] font-black text-slate-400 hover:bg-slate-50 rounded-none border-t border-slate-50">
              مشاهدة جميع الإشعارات
            </Button>
          </PopoverContent>
        </Popover>
      </header>

      <main className="px-5 pt-6 space-y-8">
        {/* Welcome Section */}
        <section className="flex justify-between items-end">
          <div>
            <p className="text-[10px] font-black text-slate-400 mb-0.5 uppercase tracking-widest">مرحباً بك مجدداً</p>
            <h1 className="text-lg font-black text-slate-900 leading-tight">
              كابتن {profile?.fullName?.split(' ')[0] || "منى باحسين"}
            </h1>
          </div>
          <div className="flex -space-x-2 rtl:space-x-reverse">
            {[1, 2].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                <Image src={`https://picsum.photos/seed/${i+10}/100/100`} alt="Medic" width={32} height={32} />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] text-white font-black shadow-sm">
              +12
            </div>
          </div>
        </section>

        {/* Real Interactive Map */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3 h-3 text-primary" /> خريطة المكلا الحية
            </h2>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] font-black text-green-600">GPS نشط</span>
              </div>
            </div>
          </div>
          
          <Card className="overflow-hidden border-none shadow-soft rounded-[2.5rem] bg-slate-100 relative group aspect-[16/10]">
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://www.openstreetmap.org/export/embed.html?bbox=49.10,14.52,49.15,14.56&amp;layer=mapnik&amp;marker=14.54,49.12"
              className="grayscale-[0.2] contrast-[1.1] w-full h-full"
              style={{ border: 0 }}
            ></iframe>
            
            <div className="absolute inset-0 pointer-events-none border-[12px] border-white/50 rounded-[2.5rem]"></div>
            
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-auto">
              <button className="w-8 h-8 bg-white/90 backdrop-blur shadow-md rounded-xl flex items-center justify-center text-slate-600 active-scale">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
              <div className="bg-white/95 backdrop-blur p-3 rounded-2xl shadow-xl flex items-center justify-between border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-black text-slate-800 truncate max-w-[150px]">
                      {profile?.homeAddress || "حي فوة، شارع الستين، المكلا"}
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold">موقعك الحالي - دقة عالية</p>
                  </div>
                </div>
                <Button onClick={() => router.push('/track')} size="icon" className="h-9 w-9 bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 active-scale">
                  <Navigation className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* SOS Emergency Button */}
        <section className="flex flex-col items-center justify-center py-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping scale-[1.6] opacity-30"></div>
            <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse scale-[2] opacity-20"></div>
            <button 
              onClick={() => router.push('/report?type=urgent')}
              className="relative z-10 w-40 h-40 bg-primary rounded-full flex flex-col items-center justify-center text-white shadow-2xl active-scale emergency-pulse border-[8px] border-white ring-1 ring-primary/5"
            >
              <AlertCircle className="w-10 h-10 mb-2 drop-shadow-md" />
              <span className="text-base font-black uppercase tracking-tighter">طلب نجدة</span>
              <span className="text-[9px] opacity-80 font-black tracking-widest mt-1">SOS SIGNAL</span>
            </button>
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-3 bg-primary rounded-full"></div>
              بلاغ سريع عن حالة
            </h2>
            <button className="text-[10px] text-primary font-black hover:underline underline-offset-4">مشاهدة الكل</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => router.push(`/report?type=${action.id}`)}
                className="flex flex-col items-center p-4 bg-white rounded-[2rem] border border-slate-50 shadow-soft hover:bg-slate-50 transition-all active-scale group"
              >
                <div className={`p-3 rounded-2xl mb-2.5 transition-all group-hover:scale-110 shadow-sm ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black text-slate-700">{action.label}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <BottomNav activeTab="home" />
    </div>
  );
}
