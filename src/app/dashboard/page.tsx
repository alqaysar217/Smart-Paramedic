
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Car, 
  Flame, 
  Activity, 
  Zap, 
  Droplets, 
  AlertCircle,
  Menu,
  Bell,
  Navigation,
  MapPin,
  ShieldCheck,
  Search,
  Maximize2,
  Layers
} from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";

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

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-28 font-cairo" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-50 px-5 h-14 flex items-center justify-between shadow-sm">
        <Button variant="ghost" size="icon" className="rounded-xl bg-slate-50 h-9 w-9 active-scale">
          <Menu className="w-4 h-4 text-slate-600" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-sm shadow-primary/20">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-xs tracking-tight text-slate-800 uppercase">Smart Medic</span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-xl bg-slate-50 h-9 w-9 relative active-scale">
          <Bell className="w-4 h-4 text-slate-600" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-white"></span>
        </Button>
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
