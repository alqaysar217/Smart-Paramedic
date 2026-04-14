"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Mail, Lock, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth, useUser, initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn } from "@/firebase";

export default function AuthPage() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading, userError } = useUser();
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
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white px-6 flex flex-col justify-center py-10 max-w-md mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-primary rounded-[10px] flex items-center justify-center shadow-lg shadow-primary/20 mb-3">
          <ShieldCheck className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-1">المسعف الذكي</h1>
        <p className="text-slate-400 text-[10px] font-bold">الأمان والإنقاذ في حضرموت</p>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 h-10 p-1 bg-slate-50 rounded-[10px] border border-slate-100">
          <TabsTrigger value="login" className="text-[11px] font-bold rounded-lg">تسجيل الدخول</TabsTrigger>
          <TabsTrigger value="signup" className="text-[11px] font-bold rounded-lg">إنشاء حساب</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-3">
            <div className="space-y-1.5 text-right">
              <Label className="text-[10px] font-bold text-slate-500 mr-1">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-9 pr-4 h-11 rounded-[10px] bg-slate-50 border-none text-[12px] text-right" 
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
                  className="pl-9 pr-4 h-11 rounded-[10px] bg-slate-50 border-none text-[12px] text-right" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full h-11 text-xs font-bold bg-primary rounded-[10px] shadow-md mt-2" disabled={isLoading}>
              {isLoading ? "جاري التحقق..." : "دخول آمن"}
            </Button>
          </form>

          <Button 
            variant="outline" 
            onClick={handleGuestLogin}
            className="w-full h-11 text-[10px] font-bold border-slate-100 rounded-[10px] text-slate-500 gap-2 active-scale"
            disabled={isLoading}
          >
            <Zap className="w-3.5 h-3.5" />
            دخول تجريبي سريع
          </Button>
        </TabsContent>

        <TabsContent value="signup" className="space-y-3">
          <form onSubmit={handleSignUp} className="space-y-3">
            <div className="space-y-1.5 text-right">
              <Label className="text-[10px] font-bold text-slate-500 mr-1">البريد الإلكتروني</Label>
              <Input 
                type="email" 
                className="h-11 rounded-[10px] bg-slate-50 border-none text-[12px] text-right" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-1.5 text-right">
              <Label className="text-[10px] font-bold text-slate-500 mr-1">كلمة المرور</Label>
              <Input 
                type="password" 
                className="h-11 rounded-[10px] bg-slate-50 border-none text-[12px] text-right" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <Button type="submit" className="w-full h-11 text-xs font-bold bg-primary rounded-[10px] shadow-md mt-2" disabled={isLoading}>
              {isLoading ? "جاري الإنشاء..." : "إنشاء حساب"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}