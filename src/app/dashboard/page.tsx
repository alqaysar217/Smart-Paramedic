"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  Navigation
} from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";

export default function DashboardPage() {
  const router = useRouter();
  const mapImg = PlaceHolderImages.find(i => i.id === "map-placeholder");

  const quickActions = [
    { id: "accident", label: "حادث", icon: Car, color: "bg-orange-100 text-orange-600" },
    { id: "fire", label: "حريق", icon: Flame, color: "bg-red-100 text-red-600" },
    { id: "faint", label: "إغماء", icon: Activity, color: "bg-blue-100 text-blue-600" },
    { id: "electric", label: "كهرباء", icon: Zap, color: "bg-yellow-100 text-yellow-600" },
    { id: "bleeding", label: "نزيف", icon: Droplets, color: "bg-rose-100 text-rose-600" },
    { id: "other", label: "أخرى", icon: AlertCircle, color: "bg-gray-100 text-gray-600" },
  ];

  const handleEmergency = (type = "general") => {
    router.push(`/report?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="p-6 flex justify-between items-center bg-white sticky top-0 z-20">
        <Button variant="ghost" size="icon" className="bg-gray-50 rounded-xl">
          <Menu className="w-6 h-6" />
        </Button>
        <h1 className="font-headline text-xl font-bold">المسعف الذكي</h1>
        <Button variant="ghost" size="icon" className="bg-gray-50 rounded-xl">
          <Bell className="w-6 h-6" />
        </Button>
      </div>

      <div className="px-6 space-y-8">
        {/* Hero Section with Big Red Button */}
        <div className="flex flex-col items-center justify-center pt-8">
          <div className="relative group cursor-pointer" onClick={() => handleEmergency()}>
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse scale-150 group-hover:scale-175 transition-transform"></div>
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse scale-125 delay-75 group-hover:scale-150 transition-transform"></div>
            <button className="relative z-10 w-48 h-48 bg-primary rounded-full flex flex-col items-center justify-center text-white shadow-2xl emergency-pulse active:scale-95 transition-transform">
              <AlertCircle className="w-16 h-16 mb-2" />
              <span className="text-2xl font-bold">طلب إسعاف</span>
            </button>
          </div>
          <p className="mt-12 text-gray-500 font-medium text-center">اضغط على الزر في حالات الطوارئ القصوى</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="space-y-4">
          <h2 className="font-headline text-lg font-bold">بلاغ سريع عن:</h2>
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleEmergency(action.id)}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all shadow-sm"
              >
                <div className={`p-3 rounded-xl mb-2 ${action.color}`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mini Map */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-lg font-bold">موقعك الحالي</h2>
            <div className="flex items-center gap-1 text-sm text-primary font-bold">
              <Navigation className="w-4 h-4" />
              تحديث
            </div>
          </div>
          <Card className="overflow-hidden border-none shadow-md rounded-2xl">
            <div className="relative aspect-video">
              {mapImg && (
                <Image
                  src={mapImg.imageUrl}
                  alt="Location Map"
                  fill
                  className="object-cover"
                  data-ai-hint={mapImg.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-full border-2 border-white animate-bounce"></div>
              </div>
            </div>
            <CardContent className="p-4 bg-white">
              <p className="text-sm text-gray-600 font-medium">الرياض، حي النزهة، طريق الملك فهد</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav activeTab="home" />
    </div>
  );
}