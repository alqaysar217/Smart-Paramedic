"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ShieldCheck, User, Phone, Mail, Lock } from "lucide-react";

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

  return (
    <div className="p-6 flex flex-col justify-center min-h-screen bg-white">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <h1 className="font-headline text-2xl font-bold text-gray-900">مرحباً بك في المسعف الذكي</h1>
        <p className="text-gray-500 mt-2">قم بإنشاء حسابك لتتمكن من الوصول لخدماتنا في حالات الطوارئ</p>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
          <TabsTrigger value="login" className="text-base">دخول</TabsTrigger>
          <TabsTrigger value="signup" className="text-base">إنشاء حساب</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                <Input id="email" type="email" placeholder="example@mail.com" className="pr-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                <Input id="password" type="password" className="pr-10" required />
              </div>
            </div>
            <Button type="submit" className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "جاري الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <div className="relative">
                <User className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                <Input id="name" placeholder="محمد أحمد" className="pr-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <div className="relative">
                <Phone className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                <Input id="phone" type="tel" placeholder="05xxxxxxxx" className="pr-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                <Input id="reg-email" type="email" placeholder="example@mail.com" className="pr-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                <Input id="reg-password" type="password" className="pr-10" required />
              </div>
            </div>
            <Button type="submit" className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "جاري الإنشاء..." : "تسجيل حساب جديد"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}