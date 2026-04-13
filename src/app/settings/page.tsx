
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  Smartphone,
  MessageSquare
} from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-cairo" dir="rtl">
      {/* Header */}
      <div className="bg-white p-6 sticky top-0 z-30 border-b border-gray-100 flex items-center gap-4">
        <div className="p-2 bg-gray-100 rounded-xl">
          <Settings className="w-6 h-6 text-gray-500" />
        </div>
        <h1 className="text-xl font-bold">الإعدادات</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Account Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">الحساب والأمان</h2>
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-0 divide-y divide-gray-50">
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <UserCircle className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="font-bold text-gray-700">تعديل الملف الشخصي</span>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              </button>
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-500" />
                  </div>
                  <span className="font-bold text-gray-700">كلمة المرور والأمان</span>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Notifications & Prefs */}
        <div className="space-y-4">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">التفضيلات</h2>
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-4 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Bell className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-700">التنبيهات العاجلة</p>
                    <p className="text-[10px] text-gray-400">استلام إشعارات الحالات الطارئة</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Moon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-700">الوضع الليلي</p>
                    <p className="text-[10px] text-gray-400">تغيير مظهر التطبيق</p>
                  </div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Globe className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-700">اللغة</p>
                    <p className="text-[10px] text-gray-400">العربية (افتراضي)</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary">تغيير</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">الدعم والمساعدة</h2>
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-0 divide-y divide-gray-50">
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="font-bold text-gray-700">تحدث مع الدعم الفني</span>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              </button>
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Info className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="font-bold text-gray-700">عن المسعف الذكي</span>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Logout */}
        <Button 
          variant="outline" 
          onClick={() => router.push("/auth")}
          className="w-full h-14 rounded-2xl border-red-100 text-red-600 hover:bg-red-50 gap-3 font-black mt-4"
        >
          <LogOut className="w-5 h-5" />
          تسجيل الخروج
        </Button>

        <div className="text-center space-y-1 py-4">
          <p className="text-[10px] text-gray-400 font-bold">إصدار التطبيق 2.4.0</p>
          <p className="text-[10px] text-gray-300">جميع الحقوق محفوظة © 2024</p>
        </div>
      </div>

      <BottomNav activeTab="settings" />
    </div>
  );
}
