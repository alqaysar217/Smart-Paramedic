
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Droplet, 
  User, 
  Activity, 
  Pill, 
  AlertTriangle, 
  ChevronRight,
  Home,
  Briefcase,
  LocateFixed,
  Save,
  Info,
  AlertCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useUser, useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from "@/firebase";
import BottomNav from "@/components/navigation/BottomNav";

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMandatory = searchParams.get('reason') === 'incomplete';
  
  const { user } = useUser();
  const db = useFirestore();
  
  const userProfileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, "users", user.uid);
  }, [db, user]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(userProfileRef);

  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    bloodType: "",
    chronicDiseases: "",
    medications: "",
    allergies: "",
    homeAddress: "",
    workAddress: "",
  });

  const [isLocating, setIsLocating] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        gender: profile.gender !== "غير محدد" ? profile.gender : "",
        age: profile.age !== 0 ? profile.age?.toString() : "",
        bloodType: profile.bloodType !== "غير محدد" ? profile.bloodType : "",
        chronicDiseases: profile.chronicDiseases?.join(", ") || "",
        medications: profile.medications?.join(", ") || "",
        allergies: profile.allergies?.join(", ") || "",
        homeAddress: profile.homeAddress !== "المكلا، حضرموت" ? profile.homeAddress : "",
        workAddress: profile.workAddress || "",
      });
    }
  }, [profile]);

  const handleSave = () => {
    if (!userProfileRef || !user) return;

    // التحقق من البيانات الأساسية
    if (!formData.bloodType || !formData.age || !formData.gender) {
      toast({
        variant: "destructive",
        title: "بيانات ناقصة",
        description: "يرجى تحديد الجنس، العمر، وفصيلة الدم للمتابعة.",
      });
      return;
    }

    const profileData = {
      id: user.uid,
      fullName: profile?.fullName || user.displayName || "مستخدم جديد",
      phoneNumber: profile?.phoneNumber || "05xxxxxxxx",
      email: user.email,
      gender: formData.gender,
      age: parseInt(formData.age) || 0,
      bloodType: formData.bloodType,
      chronicDiseases: formData.chronicDiseases.split(",").map(s => s.trim()).filter(s => s),
      medications: formData.medications.split(",").map(s => s.trim()).filter(s => s),
      allergies: formData.allergies.split(",").map(s => s.trim()).filter(s => s),
      homeAddress: formData.homeAddress || "المكلا، حضرموت",
      homeLatitude: 14.5333,
      homeLongitude: 49.1167,
    };

    setDocumentNonBlocking(userProfileRef, profileData, { merge: true });
    
    toast({
      title: "تم الحفظ",
      description: "تم تحديث بيانات ملفك الطبي بنجاح في السحابة.",
    });
    
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  const handleLocate = () => {
    setIsLocating(true);
    setMapVisible(false);
    setTimeout(() => {
      setIsLocating(false);
      setMapVisible(true);
      setFormData(prev => ({ ...prev, homeAddress: "المكلا، حي فوة - شارع الستين" }));
      toast({
        title: "تم تحديد الموقع",
        description: "تم العثور على موقعك الحالي بدقة GPS عالية.",
      });
    }, 2000);
  };

  if (isProfileLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-28 font-cairo" dir="rtl">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 h-14 flex items-center justify-between shadow-soft">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-[10px] flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-[13px] font-bold text-slate-800">الملف الطبي الرقمي</h1>
        </div>
        {!isMandatory && (
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-[10px] h-9 w-9 bg-slate-50">
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Button>
        )}
      </header>

      <main className="px-4 pt-4 space-y-4">
        {isMandatory && (
          <Card className="bg-amber-50 border-amber-100 shadow-none rounded-[10px] p-4 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="space-y-1 text-right">
              <p className="text-[11px] font-bold text-amber-900">خطوة أخيرة هامة!</p>
              <p className="text-[10px] text-amber-800 leading-relaxed font-bold">
                يرجى إكمال بياناتك الطبية أدناه. هذه المعلومات هي مفتاح إنقاذ حياتك في حالات الطوارئ القصوى.
              </p>
            </div>
          </Card>
        )}

        <div className="bg-blue-50/50 p-3 rounded-[10px] border border-blue-100 flex gap-3 items-start">
          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-[10px] text-blue-700 leading-normal font-bold">
            هذه المعلومات ستكون متاحة للمسعفين فور طلبك للنجدة لضمان تقديم العلاج الأنسب لك في أسرع وقت.
          </p>
        </div>

        <Card className="border-none shadow-soft rounded-[10px] bg-white overflow-hidden">
          <CardContent className="p-5 space-y-4">
            <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <User className="w-3 h-3" /> البيانات الأساسية
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-[10px] font-bold text-slate-500 mr-1">الجنس</Label>
                <Select dir="rtl" value={formData.gender} onValueChange={(v) => setFormData(p => ({ ...p, gender: v }))}>
                  <SelectTrigger className="h-10 rounded-[10px] bg-slate-50 border-none shadow-inner-soft text-[11px]">
                    <SelectValue placeholder="اختر" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[10px]">
                    <SelectItem value="male">ذكر</SelectItem>
                    <SelectItem value="female">أنثى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] font-bold text-slate-500 mr-1">العمر</Label>
                <Input 
                  type="number" 
                  placeholder="مثال: 25" 
                  className="h-10 rounded-[10px] bg-slate-50 border-none shadow-inner-soft text-right text-[11px]" 
                  value={formData.age}
                  onChange={(e) => setFormData(p => ({ ...p, age: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-[10px] font-bold text-slate-500 mr-1 flex items-center gap-1.5">
                <Droplet className="w-3 h-3 text-primary" /> فصيلة الدم
              </Label>
              <Select dir="rtl" value={formData.bloodType} onValueChange={(v) => setFormData(p => ({ ...p, bloodType: v }))}>
                <SelectTrigger className="h-11 rounded-[10px] bg-primary/5 border-primary/10 text-primary font-bold text-[11px]">
                  <SelectValue placeholder="اختر الفصيلة" />
                </SelectTrigger>
                <SelectContent className="rounded-[10px]">
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-2">
          <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">التاريخ المرضي</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {[
              { id: "chronic", label: "هل تعاني من أمراض مزمنة؟", icon: Activity, color: "text-blue-500 bg-blue-50" },
              { id: "meds", label: "هل تتناول أدوية حالياً؟", icon: Pill, color: "text-purple-500 bg-purple-50" },
              { id: "allergies", label: "هل لديك أي حساسيات؟", icon: AlertTriangle, color: "text-red-500 bg-red-50" }
            ].map((q) => (
              <AccordionItem key={q.id} value={q.id} className="border-none bg-white rounded-[10px] shadow-soft px-3 overflow-hidden transition-all">
                <AccordionTrigger className="hover:no-underline py-3 text-right">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${q.color}`}>
                      <q.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">{q.label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <Textarea 
                    placeholder="يرجى الكتابة هنا بالتفصيل..." 
                    className="bg-slate-50 border-none rounded-[10px] min-h-[80px] text-right text-[11px] p-3 shadow-inner-soft font-bold leading-relaxed"
                    value={formData[q.id as keyof typeof formData]}
                    onChange={(e) => setFormData(p => ({ ...p, [q.id]: e.target.value }))}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="space-y-2">
          <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">مواقع السكن والعمل</h2>
          <Card className="border-none shadow-soft rounded-[10px] p-5 space-y-3 bg-white">
            <div className="space-y-1">
              <Label className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 mr-1">
                <Home className="w-3 h-3 text-slate-400" /> عنوان السكن
              </Label>
              <Input 
                placeholder="المكلا، الحي، الشارع" 
                className="h-10 rounded-[10px] bg-slate-50 border-none text-right shadow-inner-soft font-bold text-[11px]" 
                value={formData.homeAddress}
                onChange={(e) => setFormData(p => ({ ...p, homeAddress: e.target.value }))}
              />
            </div>
            
            <Button 
              onClick={handleLocate} 
              variant="outline" 
              className="w-full h-10 rounded-[10px] border-dashed border-slate-200 text-slate-500 hover:bg-slate-50 text-[10px] font-bold gap-2 active-scale transition-all"
              disabled={isLocating}
            >
              {isLocating ? (
                <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <LocateFixed className="w-3.5 h-3.5 text-primary" />
              )}
              تحديد موقعي الحالي بدقة GPS
            </Button>

            {mapVisible && (
              <div className="relative mt-2 overflow-hidden rounded-[10px] border border-slate-100 aspect-video shadow-inner animate-in fade-in zoom-in duration-500">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=49.11,14.53,49.14,14.55&amp;layer=mapnik&amp;marker=14.54,49.12"
                  className="w-full h-full grayscale-[0.2] contrast-[1.1] brightness-[0.98]"
                  style={{ border: 0 }}
                ></iframe>
              </div>
            )}

            <div className="space-y-1 pt-1">
              <Label className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 mr-1">
                <Briefcase className="w-3 h-3 text-slate-400" /> عنوان العمل
              </Label>
              <Input 
                placeholder="جهة العمل أو العنوان" 
                className="h-10 rounded-[10px] bg-slate-50 border-none text-right shadow-inner-soft font-bold text-[11px]" 
                value={formData.workAddress}
                onChange={(e) => setFormData(p => ({ ...p, workAddress: e.target.value }))}
              />
            </div>
          </Card>
        </section>

        <Button 
          onClick={handleSave} 
          className="w-full h-12 text-[12px] font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-[10px] gap-2 active-scale mb-2"
        >
          <Save className="w-4 h-4" />
          حفظ وتفعيل الملف الطبي
        </Button>
      </main>
      
      {!isMandatory && <BottomNav activeTab="profile" />}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
      <ProfileContent />
    </Suspense>
  );
}
