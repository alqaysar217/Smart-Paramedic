
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Calendar, 
  MapPin, 
  Activity, 
  Pill, 
  AlertTriangle, 
  ArrowRight,
  Home,
  Briefcase,
  LocateFixed,
  Save,
  CheckCircle2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useUser, useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from "@/firebase";

export default function ProfilePage() {
  const router = useRouter();
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

  useEffect(() => {
    if (profile) {
      setFormData({
        gender: profile.gender || "",
        age: profile.age?.toString() || "",
        bloodType: profile.bloodType || "",
        chronicDiseases: profile.chronicDiseases?.join(", ") || "",
        medications: profile.medications?.join(", ") || "",
        allergies: profile.allergies?.join(", ") || "",
        homeAddress: profile.homeAddress || "",
        workAddress: profile.workAddress || "",
      });
    }
  }, [profile]);

  const handleSave = () => {
    if (!userProfileRef || !user) return;

    const profileData = {
      id: user.uid,
      fullName: user.displayName || "منى باحسين",
      phoneNumber: profile?.phoneNumber || "05xxxxxxxx",
      email: user.email,
      gender: formData.gender,
      age: parseInt(formData.age) || 0,
      bloodType: formData.bloodType,
      chronicDiseases: formData.chronicDiseases.split(",").map(s => s.trim()).filter(s => s),
      medications: formData.medications.split(",").map(s => s.trim()).filter(s => s),
      allergies: formData.allergies.split(",").map(s => s.trim()).filter(s => s),
      homeAddress: formData.homeAddress,
      homeLatitude: 14.5333,
      homeLongitude: 49.1167,
    };

    setDocumentNonBlocking(userProfileRef, profileData, { merge: true });
    
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم تحديث بيانات ملفك الطبي بنجاح في قاعدة البيانات.",
    });
    
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  const handleLocate = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setFormData(prev => ({ ...prev, homeAddress: "المكلا، حي فوة - شارع الستين" }));
      toast({
        title: "تم تحديد الموقع",
        description: "تم التعرف على إحداثيات موقعك الحالي بدقة.",
      });
    }, 2000);
  };

  if (isProfileLoading) return <div className="p-8 text-center">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-cairo" dir="rtl">
      <div className="bg-white p-6 sticky top-0 z-30 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-xl">
            <User className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold">ملفي الطبي</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
          <ArrowRight className="w-6 h-6" />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              المعلومات الأساسية
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  الجنس
                </Label>
                <Select value={formData.gender} onValueChange={(v) => setFormData(p => ({ ...p, gender: v }))}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="اختر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">ذكر</SelectItem>
                    <SelectItem value="female">أنثى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  العمر
                </Label>
                <Input 
                  type="number" 
                  placeholder="مثال: 25" 
                  className="h-12 rounded-xl text-right" 
                  value={formData.age}
                  onChange={(e) => setFormData(p => ({ ...p, age: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2 text-right">
              <Label className="flex items-center gap-2 text-gray-600">
                <Droplet className="w-4 h-4 text-primary" />
                فصيلة الدم
              </Label>
              <Select value={formData.bloodType} onValueChange={(v) => setFormData(p => ({ ...p, bloodType: v }))}>
                <SelectTrigger className="h-12 rounded-xl border-primary/20 bg-primary/5">
                  <SelectValue placeholder="اختر فصيلة الدم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-bold px-2">التاريخ الطبي (أسئلة هامة)</h2>
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="chronic" className="border-none bg-white rounded-2xl shadow-sm px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-right">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-bold text-gray-700">هل تعاني من أمراض مزمنة؟</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <Textarea 
                  placeholder="يرجى كتابة أي أمراض تعاني منها (مثل السكري، الضغط، الربو...)" 
                  className="bg-gray-50 border-none rounded-xl min-h-[100px] text-right"
                  value={formData.chronicDiseases}
                  onChange={(e) => setFormData(p => ({ ...p, chronicDiseases: e.target.value }))}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="meds" className="border-none bg-white rounded-2xl shadow-sm px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-right">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Pill className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-bold text-gray-700">ما هي الأدوية التي تتناولها حالياً؟</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <Textarea 
                  placeholder="اذكر الأدوية وجرعاتها إذا أمكن..." 
                  className="bg-gray-50 border-none rounded-xl min-h-[100px] text-right"
                  value={formData.medications}
                  onChange={(e) => setFormData(p => ({ ...p, medications: e.target.value }))}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="allergies" className="border-none bg-white rounded-2xl shadow-sm px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-right">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-bold text-gray-700">هل لديك حساسية من أدوية أو أطعمة؟</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <Textarea 
                  placeholder="مثال: حساسية البنسلين، حساسية الفول..." 
                  className="bg-gray-50 border-none rounded-xl min-h-[100px] text-right"
                  value={formData.allergies}
                  onChange={(e) => setFormData(p => ({ ...p, allergies: e.target.value }))}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold px-2">مواقع العناوين</h2>
          <Card className="border-none shadow-sm rounded-3xl p-6 space-y-5 bg-white">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 font-bold">
                <Home className="w-4 h-4 text-green-600" />
                عنوان السكن
              </Label>
              <Input 
                placeholder="المدينة، الحي، اسم الشارع" 
                className="h-12 rounded-xl text-right bg-gray-50 border-none" 
                value={formData.homeAddress}
                onChange={(e) => setFormData(p => ({ ...p, homeAddress: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 font-bold">
                <Briefcase className="w-4 h-4 text-orange-600" />
                عنوان العمل
              </Label>
              <Input 
                placeholder="مكان العمل أو جهة الوظيفة" 
                className="h-12 rounded-xl text-right bg-gray-50 border-none" 
                value={formData.workAddress}
                onChange={(e) => setFormData(p => ({ ...p, workAddress: e.target.value }))}
              />
            </div>

            <div className="pt-2">
              <Button 
                onClick={handleLocate} 
                variant="outline" 
                className="w-full h-14 rounded-2xl border-dashed border-primary/40 text-primary hover:bg-primary/5 gap-3"
                disabled={isLocating}
              >
                {isLocating ? (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                    جاري تحديد الموقع...
                  </div>
                ) : (
                  <>
                    <LocateFixed className="w-5 h-5" />
                    تحديد موقعي الحالي على الخريطة
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        <Button 
          onClick={handleSave} 
          className="w-full h-16 text-xl font-black bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 rounded-2xl gap-3 mt-6"
        >
          <Save className="w-6 h-6" />
          حفظ كافة البيانات
        </Button>
      </div>
    </div>
  );
}
