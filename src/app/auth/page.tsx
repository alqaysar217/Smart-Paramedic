
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Mail, Lock, Fingerprint, ScanFace, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth, useUser, initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn } from "@/firebase";

export default function AuthPage() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading, userError } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (user && !isUserLoading) {
      toast({
        title: "تم تسجيل الدخول",
        description: `مرحباً بك في نظام المسعف الذكي`,
      });
      router.push("/dashboard");
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (userError) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "خطأ في الدخول",
        description: "يرجى التأكد من البريد وكلمة المرور.",
      });
    }
  }, [userError]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    initiateEmailSignIn(auth, email, password);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    initiateEmailSignUp(auth, email, password);
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    initiateAnonymousSignIn(auth);
  };

  if (isUserLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white px-6 flex flex-col justify-center py-12">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-4 rotate-3">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-1">المسعف الذكي</h1>
        <p className="text-slate-400 text-xs font-medium">الأمان والإنقاذ في حضرموت</p>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-12 p-1 bg-slate-50 rounded-xl border border-slate-100">
          <TabsTrigger value="login" className="text-xs font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">تسجيل الدخول</TabsTrigger>
          <TabsTrigger value="signup" className="text-xs font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">إنشاء حساب</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-right">
              <Label className="text-[11px] font-bold text-slate-500 mr-1">البريد الإلكتروني</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10 pr-4 h-12 rounded-xl bg-slate-50 border-none shadow-inner-soft text-right" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="space-y-1.5 text-right">
              <Label className="text-[11px] font-bold text-slate-500 mr-1">كلمة المرور</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <Input 
                  type="password" 
                  className="pl-10 pr-4 h-12 rounded-xl bg-slate-50 border-none shadow-inner-soft text-right" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full h-13 text-sm font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-xl active-scale" disabled={isLoading}>
              {isLoading ? "جاري التحقق..." : "دخول آمن"}
            </Button>
          </form>

          <Button 
            variant="outline" 
            onClick={handleGuestLogin}
            className="w-full h-13 text-xs font-bold border-slate-100 rounded-xl text-slate-500 gap-2 active-scale"
            disabled={isLoading}
          >
            <Zap className="w-4 h-4" />
            دخول تجريبي سريع
          </Button>

          <div className="relative flex items-center justify-center py-2">
            <span className="bg-white px-3 text-[10px] text-slate-300 font-bold uppercase tracking-wider relative z-10">أو عبر التقنيات الحيوية</span>
            <div className="absolute w-full h-px bg-slate-100"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-16 rounded-2xl border-slate-100 bg-slate-50/50 flex flex-col gap-1 active-scale">
              <Fingerprint className="w-5 h-5 text-slate-400" />
              <span className="text-[10px] font-bold">بصمة الإصبع</span>
            </Button>
            <Button variant="outline" className="h-16 rounded-2xl border-slate-100 bg-slate-50/50 flex flex-col gap-1 active-scale">
              <ScanFace className="w-5 h-5 text-slate-400" />
              <span className="text-[10px] font-bold">بصمة الوجه</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="signup" className="space-y-4">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-1.5 text-right">
              <Label className="text-[11px] font-bold text-slate-500 mr-1">الاسم الكامل</Label>
              <Input 
                placeholder="منى باحسين" 
                className="h-12 rounded-xl bg-slate-50 border-none text-right shadow-inner-soft" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-1.5 text-right">
              <Label className="text-[11px] font-bold text-slate-500 mr-1">البريد الإلكتروني</Label>
              <Input 
                type="email" 
                className="h-12 rounded-xl bg-slate-50 border-none text-right shadow-inner-soft" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-1.5 text-right">
              <Label className="text-[11px] font-bold text-slate-500 mr-1">كلمة المرور</Label>
              <Input 
                type="password" 
                className="h-12 rounded-xl bg-slate-50 border-none text-right shadow-inner-soft" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <Button type="submit" className="w-full h-13 text-sm font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-xl active-scale mt-4" disabled={isLoading}>
              {isLoading ? "جاري الإنشاء..." : "إنشاء حساب حقيقي"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
