"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
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
  Clock,
  ShieldCheck,
  ChevronLeft
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
  const mapImg = PlaceHolderImages.find(i => i.id === "map-placeholder");

  const quickActions = [
    { id: "accident", label: "حادث سير", icon: Car, color: "text-orange-500 bg-orange-50" },
    { id: "fire", label: "حريق", icon: Flame, color: "text-red-500 bg-red-50" },
    { id: "faint", label: "إغماء", icon: Activity, color: "text-blue-500 bg-blue-50" },
    { id: "electric", label: "صعق", icon: Zap, color: "text-yellow-500 bg-yellow-50" },
    { id: "bleeding", label: "نزيف", icon: Droplets, color: "text-rose-500 bg-rose-50" },
    { id: "other", label: "أخرى", icon: AlertCircle, color: "text-slate-500 bg-slate-50" },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-16 flex items-center justify-between shadow-soft">
        <Button variant="ghost" size="icon" className="rounded-full bg-slate-50">
          <Menu className="w-5 h-5 text-slate-600" />
        </Button>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight">المسعف الذكي</span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-slate-50 relative">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-white"></span>
        </Button>
      </header>

      <main className="px-5 pt-6 space-y-8">
        {/* Welcome Section */}
        <section>
          <p className="text-xs font-semibold text-slate-400 mb-1">طاب يومك،</p>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">
            مرحباً، {profile?.fullName?.split(' ')[0] || user?.displayName?.split(' ')[0] || "منى"}
          </h1>
        </section>

        {/* SOS Button Section */}
        <section className="flex flex-col items-center justify-center py-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping scale-150 opacity-40"></div>
            <button 
              onClick={() => router.push('/report?type=urgent')}
              className="relative z-10 w-44 h-44 bg-primary rounded-full flex flex-col items-center justify-center text-white shadow-2xl active-scale emergency-pulse border-[6px] border-white ring-1 ring-primary/5"
            >
              <AlertCircle className="w-12 h-12 mb-2" />
              <span className="text-lg font-black uppercase tracking-tighter">طلب نجدة</span>
              <span className="text-[10px] opacity-70 font-bold">استجابة فورية</span>
            </button>
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-3 bg-primary rounded-full"></div>
              بلاغ سريع عن حالة
            </h2>
            <Button variant="ghost" size="sm" className="text-[10px] text-slate-400 font-bold px-0 h-auto hover:bg-transparent">
              مشاهدة الكل
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => router.push(`/report?type=${action.id}`)}
                className="flex flex-col items-center p-3.5 bg-white rounded-2xl border border-slate-100 shadow-soft hover:bg-slate-50 transition-colors active-scale group"
              >
                <div className={`p-2.5 rounded-xl mb-2 transition-transform group-hover:scale-110 ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-600">{action.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Location Card */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <div className="w-1.5 h-3 bg-primary rounded-full"></div>
            موقعك الحالي في المكلا
          </h2>
          <Card className="overflow-hidden border-none shadow-soft rounded-3xl bg-slate-50">
            <div className="relative aspect-[16/8]">
              {mapImg && (
                <Image
                  src={mapImg.imageUrl}
                  alt="Location Map"
                  fill
                  className="object-cover grayscale-[20%] opacity-90"
                  data-ai-hint={mapImg.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping"></div>
                  <div className="w-5 h-5 bg-primary rounded-full border-[3px] border-white shadow-lg relative z-10"></div>
                </div>
              </div>
            </div>
            <CardContent className="p-4 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <p className="text-[11px] text-slate-600 font-bold truncate">
                  {profile?.homeAddress || "حي فوة، شارع الستين، المكلا"}
                </p>
              </div>
              <Button size="icon" variant="ghost" className="rounded-lg h-9 w-9 shrink-0">
                <Navigation className="w-4 h-4 text-slate-400" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <BottomNav activeTab="home" />
    </div>
  );
}