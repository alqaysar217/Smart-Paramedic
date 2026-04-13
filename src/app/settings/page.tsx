"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  UserCircle, 
  LogOut, 
  ChevronLeft,
  Info,
  MessageSquare,
  CheckCircle2,
  XCircle
} from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const router = useRouter();
  const [urgentNotify, setUrgentNotify] = useState(true);
  const [nightMode, setNightMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-cairo" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md px-6 sticky top-0 z-30 border-b border-slate-100 flex items-center gap-4 h-16 shadow-soft">
        <div className="p-2 bg-slate-50 rounded-xl">
          <Settings className="w-5 h-5 text-slate-500" />
        </div>
        <h1 className="text-sm font-black text-slate-800">إعدادات النظام</h1>
      </header>

      <div className="p-6 space-y-8">
        {/* Account Section */}
        <div className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">الحساب والأمان</h2>
          <Card className="border-none shadow-soft rounded-[2rem] overflow-hidden bg-white">
            <CardContent className="p-0 divide-y divide-slate-50">
              <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group active-scale">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors">
                    <UserCircle className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-right">
                    <span className="block text-[13px] font-bold text-slate-700">تعديل الملف الشخصي</span>
                    <span className="text-[10px] text-slate-400">تحديث بياناتك الشخصية</span>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-slate-300" />
              </button>
              <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group active-scale">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-purple-50 rounded-2xl group-hover:bg-purple-100 transition-colors">
                    <Shield className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="text-right">
                    <span className="block text-[13px] font-bold text-slate-700">كلمة المرور والأمان</span>
                    <span className="text-[10px] text-slate-400">إدارة طرق الوصول</span>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-slate-300" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Preferences Section */}
        <div className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">التفضيلات الذكية</h2>
          <Card className="border-none shadow-soft rounded-[2rem] overflow-hidden bg-white">
            <CardContent className="p-5 space-y-6">
              {/* Custom Toggle for Urgent Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-orange-50 rounded-2xl">
                    <Bell className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-bold text-slate-700">التنبيهات العاجلة</p>
                    <p className="text-[10px] text-slate-400 font-medium">إشعارات الحالات الطارئة 24/7</p>
                  </div>
                </div>
                <button 
                  onClick={() => setUrgentNotify(!urgentNotify)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 active-scale",
                    urgentNotify ? "bg-accent/10 text-accent" : "bg-slate-100 text-slate-400"
                  )}
                >
                  <span className="text-[10px] font-black">{urgentNotify ? "مفعل" : "معطل"}</span>
                  {urgentNotify ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                </button>
              </div>

              {/* Custom Toggle for Night Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-100 rounded-2xl">
                    <Moon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-bold text-slate-700">الوضع الليلي</p>
                    <p className="text-[10px] text-slate-400 font-medium">تغيير المظهر لراحة العين</p>
                  </div>
                </div>
                <button 
                  onClick={() => setNightMode(!nightMode)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 active-scale",
                    nightMode ? "bg-accent/10 text-accent" : "bg-slate-100 text-slate-400"
                  )}
                >
                  <span className="text-[10px] font-black">{nightMode ? "نشط" : "غير نشط"}</span>
                  {nightMode ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-green-50 rounded-2xl">
                    <Globe className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-bold text-slate-700">اللغة</p>
                    <p className="text-[10px] text-slate-400 font-medium">العربية (حضرموت)</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-primary p-0 h-auto hover:bg-transparent">
                  تغيير
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Section */}
        <div className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">الدعم والخصوصية</h2>
          <Card className="border-none shadow-soft rounded-[2rem] overflow-hidden bg-white">
            <CardContent className="p-0 divide-y divide-slate-50">
              <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group active-scale">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-2xl">
                    <MessageSquare className="w-5 h-5 text-slate-500" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">تحدث مع الدعم الفني</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-slate-300" />
              </button>
              <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group active-scale">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-2xl">
                    <Info className="w-5 h-5 text-slate-500" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">عن المسعف الذكي</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-slate-300" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Logout */}
        <Button 
          variant="outline" 
          onClick={() => router.push("/auth")}
          className="w-full h-15 rounded-2xl border-rose-100 text-rose-600 hover:bg-rose-50 gap-3 font-black mt-4 shadow-sm active-scale"
        >
          <LogOut className="w-5 h-5" />
          تسجيل الخروج
        </Button>

        <div className="text-center space-y-2 py-6">
          <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">إصدار 2.4.0 (حضرموت)</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
            <p className="text-[10px] text-slate-300 font-medium">جميع الخوادم متصلة وتعمل بكفاءة</p>
          </div>
        </div>
      </div>

      <BottomNav activeTab="settings" />
    </div>
  );
}
