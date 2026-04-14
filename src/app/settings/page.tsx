
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
  ChevronRight
} from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const router = useRouter();
  const [urgentNotify, setUrgentNotify] = useState(true);
  const [nightMode, setNightMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-24 font-cairo" dir="rtl">
      {/* Header - Premium Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 h-14 flex items-center justify-between shadow-soft">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-50 rounded-[10px] flex items-center justify-center border border-slate-100">
            <Settings className="w-4 h-4 text-slate-600" />
          </div>
          <h1 className="text-[13px] font-bold text-slate-800">إعدادات النظام</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
          className="rounded-[10px] bg-slate-50 h-9 w-9 active-scale border border-slate-100"
        >
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </Button>
      </header>

      <main className="px-4 pt-6 space-y-6">
        {/* Account Section */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-1.5">
            <div className="w-0.5 h-2.5 bg-primary rounded-full"></div>
            الحساب والأمان
          </h2>
          <Card className="border border-slate-50 shadow-soft rounded-[10px] overflow-hidden bg-white">
            <CardContent className="p-0 divide-y divide-slate-50">
              <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-all group active-scale text-right">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <UserCircle className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-700">تعديل الملف الشخصي</span>
                    <span className="text-[9px] text-slate-400">تحديث بياناتك الشخصية والطبية</span>
                  </div>
                </div>
                <ChevronLeft className="w-3.5 h-3.5 text-slate-300" />
              </button>
              <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-all group active-scale text-right">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                    <Shield className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-700">كلمة المرور والأمان</span>
                    <span className="text-[9px] text-slate-400">إدارة طرق الوصول والخصوصية</span>
                  </div>
                </div>
                <ChevronLeft className="w-3.5 h-3.5 text-slate-300" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Preferences Section */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-1.5">
            <div className="w-0.5 h-2.5 bg-primary rounded-full"></div>
            التفضيلات الذكية
          </h2>
          <Card className="border border-slate-50 shadow-soft rounded-[10px] bg-white">
            <CardContent className="p-4 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-right">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Bell className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-700">التنبيهات العاجلة</p>
                    <p className="text-[9px] text-slate-400">إشعارات الحالات الطارئة 24/7</p>
                  </div>
                </div>
                <Switch checked={urgentNotify} onCheckedChange={setUrgentNotify} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-right">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <Moon className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-700">الوضع الليلي</p>
                    <p className="text-[9px] text-slate-400">تغيير المظهر لراحة العين</p>
                  </div>
                </div>
                <Switch checked={nightMode} onCheckedChange={setNightMode} />
              </div>

              <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <div className="flex items-center gap-3 text-right">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Globe className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-700">اللغة</p>
                    <p className="text-[9px] text-slate-400">العربية (حضرموت)</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-[10px] font-bold text-primary h-8 px-3 rounded-lg bg-primary/5 active-scale">
                  تغيير
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Section */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-1.5">
            <div className="w-0.5 h-2.5 bg-primary rounded-full"></div>
            الدعم والخصوصية
          </h2>
          <Card className="border border-slate-50 shadow-soft rounded-[10px] overflow-hidden bg-white">
            <CardContent className="p-0 divide-y divide-slate-50">
              <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-all group active-scale text-right">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">تحدث مع الدعم الفني</span>
                </div>
                <ChevronLeft className="w-3.5 h-3.5 text-slate-300" />
              </button>
              <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-all group active-scale text-right">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <Info className="w-4 h-4 text-slate-500" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">عن المسعف الذكي</span>
                </div>
                <ChevronLeft className="w-3.5 h-3.5 text-slate-300" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Logout */}
        <Button 
          variant="outline" 
          onClick={() => router.push("/auth")}
          className="w-full h-11 rounded-[10px] border-rose-100 text-rose-500 hover:bg-rose-50 hover:text-rose-600 gap-2 font-bold text-[11px] active-scale shadow-sm mt-2"
        >
          <LogOut className="w-4 h-4" />
          تسجيل الخروج الآمن
        </Button>

        <div className="text-center space-y-1.5 py-4">
          <p className="text-[9px] text-slate-300 font-bold tracking-widest uppercase">إصدار 2.4.0 (حضرموت)</p>
          <div className="flex items-center justify-center gap-1.5">
            <div className="w-1 h-1 bg-accent rounded-full animate-pulse"></div>
            <p className="text-[8px] text-slate-300 font-medium">جميع الخوادم متصلة وتعمل بكفاءة</p>
          </div>
        </div>
      </main>

      <BottomNav activeTab="settings" />
    </div>
  );
}
