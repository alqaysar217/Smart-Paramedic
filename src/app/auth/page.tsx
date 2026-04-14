"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Mail, Lock, Zap, Loader2 } from "lucide-react";
import { useAuth, useUser, initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn } from "@/firebase";

export default function AuthPage() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push("/dashboard");
    }
  }, [user, isUserLoading, router]);

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
      <Loader2 className="w-6 h-6 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white px-6 flex flex-col justify-center py-10 max-w-md mx-auto font-cairo" dir="rtl">
      <div className="flex flex-col items-center mb-10">
        <div className="w-14 h-14 bg-primary rounded-[10px] flex items-center justify-center shadow-xl shadow-primary/20 mb-4 transition-transform active:scale-95">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-xl font-black text-slate-900 mb-1">المسعف الذكي</h1>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">منصة الإنقاذ الأولى في حضرموت</p>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-11 p-1 bg-slate-50 rounded-[10px] border border-slate-100">
          <TabsTrigger value="login" className="text-[11px] font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">تسجيل الدخول</TabsTrigger>
          <TabsTrigger value="signup" className="text-[11px] font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">إنشاء حساب</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-right">
              <Label className="text-[10px] font-bold text-slate-500 mr-1">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-9 pr-4 h-12 rounded-[10px] bg-slate-50 border-none text-[12px] text-right shadow-sm focus-visible:ring-primary" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="space-y-1.5 text-right">
              <Label className="text-[10px] font-bold text-slate-500 mr-1">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <Input 
                  type="password" 
                  className="pl-9 pr-4 h-12 rounded-[10px] bg-slate-50 border-none text-[12px] text-right shadow-sm focus-visible:ring-primary" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full h-12 text-xs font-bold bg-primary rounded-[10px] shadow-lg shadow-primary/20 mt-2 active-scale" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "دخول آمن للمنصة"}
            </Button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
            <div className="relative flex justify-center text-[9px] uppercase font-bold text-slate-300"><span className="bg-white px-2">أو عبر الوصول السريع</span></div>
          </div>

          <Button 
            variant="outline" 
            onClick={handleGuestLogin}
            className="w-full h-12 text-[10px] font-bold border-slate-100 rounded-[10px] text-slate-500 gap-2 active-scale bg-white hover:bg-slate-50"
            disabled={isLoading}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            دخول تجريبي (كضيف)
          </Button>
        </TabsContent>

        <TabsContent value="signup" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-1.5 text-right">
              <Label className="text-[10px] font-bold text-slate-500 mr-1">البريد الإلكتروني</Label>
              <Input 
                type="email" 
                className="h-12 rounded-[10px] bg-slate-50 border-none text-[12px] text-right shadow-sm" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-1.5 text-right">
              <Label className="text-[10px] font-bold text-slate-500 mr-1">كلمة المرور</Label>
              <Input 
                type="password" 
                className="h-12 rounded-[10px] bg-slate-50 border-none text-[12px] text-right shadow-sm" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <Button type="submit" className="w-full h-12 text-xs font-bold bg-primary rounded-[10px] shadow-lg shadow-primary/20 mt-2 active-scale" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "إنشاء حساب جديد"}
            </Button>
          </form>
          <p className="text-[9px] text-center text-slate-400 font-bold leading-relaxed px-4">بإنشاء حساب، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بالمسعف الذكي.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
