
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { collection } from "firebase/firestore";
import { 
  CheckCircle2, 
  MapPin, 
  Send, 
  AlertTriangle, 
  ChevronRight,
  PhoneCall,
  Activity,
  ShieldCheck
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser, useFirestore, addDocumentNonBlocking } from "@/firebase";

export default function ReportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const db = useFirestore();
  const incidentType = searchParams.get('type') || 'general';

  const [status, setStatus] = useState<'locating' | 'sending' | 'success'>('locating');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Locating
    const timer1 = setTimeout(() => {
      setStatus('sending');
      setProgress(40);
      
      // Phase 2: Sending data to Firestore
      if (db && user) {
        const incidentsCol = collection(db, "emergencyIncidents");
        addDocumentNonBlocking(incidentsCol, {
          userId: user.uid,
          incidentType: incidentType,
          status: 'reported',
          reportedLatitude: 14.5333, // Simulation
          reportedLongitude: 49.1167,
          reportedAt: new Date().toISOString(),
          description: "بلاغ طارئ مرسل من التطبيق"
        });
      }
    }, 1500);

    const timer2 = setTimeout(() => {
      setProgress(85);
    }, 3000);

    const timer3 = setTimeout(() => {
      setStatus('success');
      setProgress(100);
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [db, user, incidentType]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-cairo" dir="rtl">
      {status !== 'success' && (
        <div className="p-6 flex items-center gap-4 border-b border-gray-50">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl">
            <ChevronRight className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-bold">إرسال بلاغ طارئ (حضرموت)</h1>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-10">
        {status !== 'success' ? (
          <div className="w-full space-y-10">
            <div className="relative">
              <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center mx-auto relative z-10">
                {status === 'locating' ? (
                  <MapPin className="w-12 h-12 text-primary animate-bounce" />
                ) : (
                  <Send className="w-12 h-12 text-primary animate-pulse" />
                )}
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-dashed border-primary/20 rounded-full animate-spin-slow"></div>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-black text-gray-900">
                {status === 'locating' ? "جاري تحديد موقعك في المكلا..." : "جاري إرسال بياناتك لمستشفى ابن سينا..."}
              </h1>
              <div className="flex items-center justify-center gap-2 text-primary bg-primary/5 py-2 px-4 rounded-full w-fit mx-auto">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm font-bold">يتم إرفاق ملفك الطبي تلقائياً</span>
              </div>
            </div>

            <div className="space-y-4 w-full max-w-xs mx-auto">
              <Progress value={progress} className="h-3 bg-gray-100 rounded-full" />
              <div className="flex justify-between text-sm font-bold text-gray-400 px-1">
                <span>{progress}%</span>
                <span>{status === 'locating' ? 'تحديد الموقع' : 'توصيل البلاغ'}</span>
              </div>
            </div>

            <Card className="bg-orange-50 border-none shadow-none p-5 rounded-3xl text-right">
              <div className="flex gap-4">
                <div className="p-2 bg-orange-100 rounded-xl shrink-0 h-fit">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-orange-800">تعليمات فورية:</p>
                  <p className="text-sm text-orange-700 leading-relaxed">
                    ابقَ في مكانك، حاول التنفس بعمق. مسعفو حضرموت في طريقهم إليك.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="w-full space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center mx-auto relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping opacity-20"></div>
              <CheckCircle2 className="w-16 h-16 text-accent relative z-10" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-accent">تم استلام بلاغك!</h1>
              <p className="text-gray-500 font-bold">سيارة الإسعاف من مستشفى ابن سينا بدأت التحرك</p>
            </div>

            <Card className="bg-gray-50 border-none shadow-sm rounded-[2rem] overflow-hidden">
              <div className="bg-accent/10 p-4 border-b border-accent/10 flex items-center justify-between">
                <span className="font-bold text-accent flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  حالة البلاغ: نشط
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase">ID: #H-8821</span>
              </div>
              <CardContent className="p-6 text-right space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-500 font-bold">المسافة المقدرة:</span>
                  <span className="font-black text-lg">2.4 كم</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold">وقت الوصول المتوقع:</span>
                  <div className="flex items-center gap-2 text-primary font-black text-2xl">
                    <span>6</span>
                    <span className="text-sm">دقائق</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 w-full">
              <Button 
                onClick={() => router.push("/track")} 
                className="w-full h-16 bg-primary hover:bg-primary/90 text-xl font-black rounded-2xl shadow-xl shadow-primary/20 gap-3"
              >
                <MapPin className="w-6 h-6" />
                تتبع سيارة الإسعاف
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/instructions")} 
                  className="h-16 border-gray-100 text-lg font-bold rounded-2xl gap-2 shadow-sm"
                >
                  <Activity className="w-5 h-5" />
                  إرشادات
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 border-accent/20 text-accent hover:bg-accent/5 text-lg font-bold rounded-2xl gap-2 shadow-sm"
                >
                  <PhoneCall className="w-5 h-5" />
                  اتصال
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
