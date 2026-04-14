
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldCheck, Mail, Lock, Zap, Loader2, User, Phone } from "lucide-react";
import { 
  useAuth, 
  useUser, 
  useFirestore,
  initiateEmailSignIn, 
  initiateEmailSignUp, 
  initiateAnonymousSignIn,
  setDocumentNonBlocking
} from "@/firebase";
import { doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const router = useRouter();
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push("/dashboard");
    }
  }, [user, isUserLoading, router]);

  const getErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return "هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول بدلاً من ذلك.";
      case 'auth/invalid-email':
        return "البريد الإلكتروني الذي أدخلته غير صالح.";
      case 'auth/weak-password':
        return "كلمة المرور ضعيفة جداً. يرجى اختيار كلمة مرور أقوى.";
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return "خطأ في البريد الإلكتروني أو كلمة المرور.";
      default:
        return "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقاً.";
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    initiateEmailSignIn(auth, email, password)
      .catch((error: any) => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "فشل تسجيل الدخول",
          description: getErrorMessage(error.code),
        });
      });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "تنبيه",
        description: "يرجى الموافقة على شروط وسياسة التطبيق للمتابعة.",
      });
      return;
    }

    setIsLoading(true);
    initiateEmailSignUp(auth, email, password)
      .then((userCredential) => {
        const newUser = userCredential.user;
        // Create initial profile in Firestore
        const userRef = doc(db, "users", newUser.uid);
        setDocumentNonBlocking(userRef, {
          id: newUser.uid,
          fullName: fullName,
          phoneNumber: phoneNumber,
          email: email,
          bloodType: "غير محدد",
          gender: "غير محدد",
          age: 0,
          homeAddress: "المكلا، حضرموت",
          homeLatitude: 14.5333,
          homeLongitude: 49.1167,
          createdAt: new Date().toISOString(),
        }, { merge: true });
      })
      .catch((error: any) => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "فشل إنشاء الحساب",
          description: getErrorMessage(error.code),
        });
      });
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    initiateAnonymousSignIn(auth)
      .catch((error: any) => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "فشل الدخول التجريبي",
          description: "تعذر تسجيل الدخول كضيف حالياً.",
        });
      });
  };

  if (isUserLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-5 h-5 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white px-6 flex flex-col justify-center py-10 max-w-md mx-auto font-cairo" dir="rtl">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-primary rounded-[10px] flex items-center justify-center shadow-lg shadow-primary/20 mb-3 active-scale">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-lg font-bold text-slate-900 mb-0.5">المسعف الذكي</h1>
        <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">منصة الإنقاذ الطارئ - حضرموت</p>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 h-10 p-1 bg-slate-50 rounded-[10px] border border-slate-100">
          <TabsTrigger value="login" className="text-[10px] font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">تسجيل الدخول</TabsTrigger>
          <TabsTrigger value="signup" className="text-[10px] font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">إنشاء حساب</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div className="space-y-1 text-right">
              <Label className="text-[10px] font-bold text-slate-500 mr-1">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-9 pr-4 h-10 rounded-[10px] bg-slate-50 border-none text-[11px] text-right shadow-sm focus-visible:ring-primary" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="space-y-1 text-right">
              <Label className="text-[10px] font-bold text-slate-500 mr-1">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                <Input 
                  type="password" 
                  className="pl-9 pr-4 h-10 rounded-[10px] bg-slate-50 border-none text-[11px] text-right shadow-sm focus-visible:ring-primary" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full h-10 text-[11px] font-bold bg-primary rounded-[10px] shadow-md shadow-primary/10 mt-1 active-scale" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "دخول آمن للمنصة"}
            </Button>
          </form>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-50"></span></div>
            <div className="relative flex justify-center text-[8px] uppercase font-bold text-slate-300"><span className="bg-white px-2">أو</span></div>
          </div>

          <Button 
            variant="outline" 
            onClick={handleGuestLogin}
            className="w-full h-10 text-[10px] font-bold border-slate-100 rounded-[10px] text-slate-500 gap-2 active-scale bg-white hover:bg-slate-50"
            disabled={isLoading}
          >
            <Zap className="w-3 h-3 text-amber-500" />
            دخول تجريبي سريع
          </Button>
        </TabsContent>

        <TabsContent value="signup" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div className="space-y-1 text-right">
              <Label className="text-[10px] font-bold text-slate-500 mr-1">الاسم الكامل</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                <Input 
                  placeholder="محمد أحمد العمودي" 
                  className="pl-9 pr-4 h-10 rounded-[10px] bg-slate-50 border-none text-[11px] text-right shadow-sm focus-visible:ring-primary" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="space-y-1 text-right">
              <Label className="text-[10px] font-bold text-slate-500 mr-1">رقم الهاتف</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                <Input 
                  type="tel"
                  placeholder="05xxxxxxx" 
                  className="pl-9 pr-4 h-10 rounded-[10px] bg-slate-50 border-none text-[11px] text-right shadow-sm focus-visible:ring-primary" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="space-y-1 text-right">
              <Label className="text-[10px] font-bold text-slate-500 mr-1">البريد الإلكتروني</Label>
              <Input 
                type="email" 
                placeholder="name@example.com"
                className="h-10 rounded-[10px] bg-slate-50 border-none text-[11px] text-right shadow-sm focus-visible:ring-primary" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-1 text-right">
              <Label className="text-[10px] font-bold text-slate-500 mr-1">كلمة المرور</Label>
              <Input 
                type="password" 
                className="h-10 rounded-[10px] bg-slate-50 border-none text-[11px] text-right shadow-sm focus-visible:ring-primary" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <div className="flex items-start space-x-2 space-x-reverse py-1">
              <Checkbox 
                id="terms" 
                checked={acceptTerms} 
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-0.5 border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label 
                htmlFor="terms" 
                className="text-[9px] font-bold text-slate-500 leading-relaxed cursor-pointer"
              >
                أوافق على شروط الخدمة وسياسة الخصوصية الخاصة بالمسعف الذكي ومعايير التعامل الطبي الطارئ في حضرموت.
              </label>
            </div>

            <Button type="submit" className="w-full h-10 text-[11px] font-bold bg-primary rounded-[10px] shadow-md shadow-primary/10 mt-1 active-scale" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "إنشاء حساب جديد"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
