
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
  ShieldCheck
} from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useUser();
  const db = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, "userProfiles", user.uid);
  }, [db, user]);

  const { data: profile } = useDoc(userProfileRef);

  const mapImg = PlaceHolderImages.find(i => i.id === "map-placeholder");

  const quickActions = [
    { id: "accident", label: "حادث سير", icon: Car, color: "bg-orange-100 text-orange-600" },
    { id: "fire", label: "حريق", icon: Flame, color: "bg-red-100 text-red-600" },
    { id: "faint", label: "حالة إغماء", icon: Activity, color: "bg-blue-100 text-blue-600" },
    { id: "electric", label: "صعق كهربائي", icon: Zap, color: "bg-yellow-100 text-yellow-600" },
    { id: "bleeding", label: "نزيف حاد", icon: Droplets, color: "bg-rose-100 text-rose-600" },
    { id: "other", label: "حالة أخرى", icon: AlertCircle, color: "bg-gray-100 text-gray-600" },
  ];

  const handleEmergency = (type = "general") => {
    router.push(`/report?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-white pb-24 font-cairo" dir="rtl">
      <div className="p-6 flex justify-between items-center bg-white sticky top-0 z-20 border-b border-gray-50">
        <Button variant="ghost" size="icon" className="bg-gray-50 rounded-xl">
          <Menu className="w-6 h-6" />
        </Button>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <h1 className="font-headline text-xl font-bold">المسعف الذكي</h1>
        </div>
        <Button variant="ghost" size="icon" className="bg-gray-50 rounded-xl relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
        </Button>
      </div>

      <div className="px-6 space-y-8">
        <div className="pt-4">
          <h2 className="text-2xl font-black text-gray-900">مرحباً، {profile?.fullName || user?.displayName || "منى باحسين"}</h2>
          <p className="text-gray-500 font-medium">نحن جاهزون لمساعدتك في أي وقت في حضرموت</p>
        </div>

        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative group cursor-pointer" onClick={() => handleEmergency("urgent")}>
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse scale-150 group-hover:scale-175 transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse scale-125 delay-300 group-hover:scale-150 transition-transform duration-1000"></div>
            <button className="relative z-10 w-48 h-48 bg-primary rounded-full flex flex-col items-center justify-center text-white shadow-2xl emergency-pulse active:scale-95 transition-transform border-8 border-white">
              <AlertCircle className="w-16 h-16 mb-2" />
              <span className="text-2xl font-black">طلب نجدة</span>
              <span className="text-[10px] opacity-80 mt-1 uppercase tracking-widest">SOS</span>
            </button>
          </div>
          <p className="mt-12 text-gray-500 font-bold text-center flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            استجابة فورية خلال دقائق
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-lg font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              بلاغ سريع عن:
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleEmergency(action.id)}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-3xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all shadow-sm group"
              >
                <div className={`p-3 rounded-2xl mb-2 group-hover:scale-110 transition-transform ${action.color}`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="text-[12px] font-bold text-gray-700 whitespace-nowrap">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-lg font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              موقعك الحالي
            </h2>
            <Button variant="ghost" size="sm" className="text-primary font-bold gap-1">
              <Navigation className="w-4 h-4" />
              تحديث
            </Button>
          </div>
          <Card className="overflow-hidden border-none shadow-xl rounded-[2.5rem] bg-gray-50">
            <div className="relative aspect-[16/7]">
              {mapImg && (
                <Image
                  src={mapImg.imageUrl}
                  alt="Location Map"
                  fill
                  className="object-cover"
                  data-ai-hint={mapImg.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/30 rounded-full animate-ping"></div>
                  <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg relative z-10"></div>
                </div>
              </div>
            </div>
            <CardContent className="p-5 bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-gray-800 font-bold">{profile?.homeLocation || "حضرموت، المكلا، حي فوة - شارع الستين"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav activeTab="home" />
    </div>
  );
}
