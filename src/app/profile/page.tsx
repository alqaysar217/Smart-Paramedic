"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Droplet, User, Calendar, MapPin, Activity, Pill, AlertTriangle, ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleSave = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6 rotate-180" />
        </Button>
        <h1 className="font-headline text-xl font-bold">الملف الطبي</h1>
      </div>

      <div className="p-6 space-y-6">
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="bg-primary p-6 text-white flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">معلومات المستخدم</h2>
                <p className="text-white/80">ساعدنا لنعرف من تكون في حالات الطوارئ</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الجنس</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">ذكر</SelectItem>
                      <SelectItem value="female">أنثى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>العمر</Label>
                  <Input type="number" placeholder="25" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-primary" />
                  فصيلة الدم
                </Label>
                <Select>
                  <SelectTrigger className="border-primary/20 bg-primary/5">
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
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          <Card className="shadow-sm border-none bg-white">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <Label className="text-base font-bold mb-1 block">الأمراض المزمنة</Label>
                <Textarea placeholder="مثلاً: سكري، ضغط..." className="mt-2 bg-gray-50 border-none" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-none bg-white">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Pill className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <Label className="text-base font-bold mb-1 block">الأدوية الحالية</Label>
                <Textarea placeholder="قائمة بالأدوية التي تتناولها بانتظام" className="mt-2 bg-gray-50 border-none" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-none bg-white">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <Label className="text-base font-bold mb-1 block">الحساسية</Label>
                <Textarea placeholder="حساسية من أدوية أو أطعمة معينة" className="mt-2 bg-gray-50 border-none" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-none bg-white">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <Label className="text-base font-bold mb-1 block">موقع السكن</Label>
                <Input placeholder="المدينة، الحي، الشارع" className="mt-2 bg-gray-50 border-none" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Button onClick={handleSave} className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg mt-4">
          حفظ الملف والمتابعة
        </Button>
      </div>
    </div>
  );
}