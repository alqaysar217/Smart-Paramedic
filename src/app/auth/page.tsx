
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ShieldCheck, User, Phone, Mail, Lock, Fingerprint, ScanFace } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/profile");
    }, 1500);
  };

  const handleBiometric = () => {
    setIsLoading(true);
    toast({
      title: "جاري التحقق...",
      description: "يرجى وضع إصبعك على الحساس أو النظر للكاميرا",
    });
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="p-6 flex flex-col justify-center min-h-screen bg-white font-cairo" dir="rtl">
      <div className="text-center mb-10">
        <div className="inline-flex p-4 bg-primary/10 rounded-3xl mb-4 rotate-3 hover:rotate-0 transition-transform">
          <ShieldCheck className="w-12 h-12 text-primary" />
        </div>
        <h1 className="font-headline text-3xl font-black text-gray-900">مرحباً بك مجدداً</h1>
        <p className="text-gray-500 mt-2 font-medium">سجل دخولك للوصول لخدمات الطوارئ</p>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-14 p-1 bg-gray-100 rounded-2xl">
          <TabsTrigger value="login" className="text-lg font-bold rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">دخول</TabsTrigger>
          <TabsTrigger value="signup" className="text-lg font-bold rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">حساب جديد</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-6">
          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right block pr-1 font-bold">البريد الإلكتروني</Label>
              <div className="relative">
                {/* الأيقونات في الجهة اليسرى كما طلب المستخدم (عكس الاتجاه التقليدي للـ RTL) */}
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <Input id="email" type="email" placeholder="example@mail.com" className="pl-10 pr-4 h-12 rounded-xl text-right" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" title="كلمة المرور" className="text-right block pr-1 font-bold">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <Input id="password" type="password" className="pl-10 pr-4 h-12 rounded-xl text-right" required />
              </div>
            </div>
            
            <Button type="submit" className="w-full h-14 text-xl font-black bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-2xl" disabled={isLoading}>
              {isLoading ? "جاري الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>

          {/* ميزة الدخول بالبصمة أو الوجه */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-bold">أو سجل دخولك عبر</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleBiometric}
              className="h-16 rounded-2xl border-gray-100 hover:bg-primary/5 hover:text-primary gap-3 text-lg font-bold"
            >
              <Fingerprint className="w-6 h-6" />
              البصمة
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleBiometric}
              className="h-16 rounded-2xl border-gray-100 hover:bg-primary/5 hover:text-primary gap-3 text-lg font-bold"
            >
              <ScanFace className="w-6 h-6" />
              الوجه
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="signup" className="space-y-6">
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right block pr-1 font-bold">الاسم الكامل</Label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <Input id="name" placeholder="محمد أحمد" className="pl-10 pr-4 h-12 rounded-xl text-right" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-right block pr-1 font-bold">رقم الهاتف</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <Input id="phone" type="tel" placeholder="05xxxxxxxx" className="pl-10 pr-4 h-12 rounded-xl text-right" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email" className="text-right block pr-1 font-bold">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <Input id="reg-email" type="email" placeholder="example@mail.com" className="pl-10 pr-4 h-12 rounded-xl text-right" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password" title="كلمة المرور" className="text-right block pr-1 font-bold">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <Input id="reg-password" type="password" className="pl-10 pr-4 h-12 rounded-xl text-right" required />
              </div>
            </div>
            <Button type="submit" className="w-full h-14 text-xl font-black bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-2xl mt-4" disabled={isLoading}>
              {isLoading ? "جاري المعالجة..." : "إنشاء حساب جديد"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
      
      <p className="mt-8 text-center text-gray-400 text-sm font-medium">
        باستخدامك للتطبيق، أنت توافق على <span className="text-primary underline">شروط الاستخدام</span>
      </p>
    </div>
  );
}
