
"use client";

import { useEffect, useState, Suspense } from "react";
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
  ShieldCheck,
  Clock,
  Navigation
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser, useFirestore, addDocumentNonBlocking } from "@/firebase";

function ReportContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const db = useFirestore();
  const incidentType = searchParams.get('type') || 'general';

  const [status, setStatus] = useState<'locating' | 'sending' | 'success'>('locating');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Locating simulation
    const timer1 = setTimeout(() => {
      setStatus('sending');
      setProgress(40);
      
      if (db && user) {
        const reportsCol = collection(db, "emergency_reports");
        addDocumentNonBlocking(reportsCol, {
          reporterId: user.uid,
          reportTime: new Date().toISOString(),
          incidentLatitude: 14.5333,
          incidentLongitude: 49.1167,
          incidentAddress: "المكلا، حي فوة - شارع الستين",
          incidentType: incidentType,
          status: 'Pending',
          receivingAgencyId: 'agency-ibn-sina',
        });
      }
    }, 1500);

    const timer2 = setTimeout(() => {
      setProgress(75);
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
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-cairo" dir="rtl">
      {status !== 'success' && (
        <header className="sticky top-0 z-50 bg-white border-b border-slate-100 px-4 h-14 flex items-center gap-3 shadow-soft">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-[10px] bg-slate-50 h-9 w-9 active-scale">
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </Button>
          <h1 className="text-[13px] font-bold text-slate-800">إرسال بلاغ نجدة</h1>
        </header>
      )}

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {status !== 'success' ? (
          <div className="w-full max-w-xs space-y-8 animate-in fade-in duration-500">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20"></div>
              <div className="relative z-10 w-full h-full bg-white border border-slate-100 rounded-[20px] shadow-soft flex items-center justify-center">
                {status === 'locating' ? (
                  <MapPin className="w-8 h-8 text-primary animate-bounce" />
                ) : (
                  <Send className="w-8 h-8 text-primary animate-pulse" />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-md font-bold text-slate-900 leading-tight">
                {status === 'locating' ? "جاري تحديد موقعك..." : "جاري إبلاغ العمليات..."}
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
                <ShieldCheck className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-bold text-primary uppercase">تشفير البيانات الطبي مفعل</span>
              </div>
            </div>

            <div className="space-y-3">
              <Progress value={progress} className="h-1.5 bg-slate-100 rounded-full overflow-hidden" />
              <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                <span>{progress}% اكتمل</span>
                <span>{status === 'locating' ? 'GPS تتبع' : 'اتصال سحابي'}</span>
              </div>
            </div>

            <Card className="border-none bg-orange-50/50 shadow-inner-soft rounded-[10px] p-4 text-right">
              <div className="flex gap-3">
                <div className="p-2 bg-orange-100 rounded-lg h-fit">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-orange-800">تعليمات فورية:</p>
                  <p className="text-[10px] text-orange-700/80 leading-relaxed font-bold">
                    حافظ على هدوئك، المساعدة في الطريق إليك عبر أقرب وحدة إسعاف.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-6 animate-in fade-in zoom-in duration-700 px-2">
            <div className="w-20 h-20 bg-accent/10 rounded-[20px] flex items-center justify-center mx-auto relative border border-accent/20 shadow-soft">
              <div className="absolute inset-0 bg-accent/20 rounded-[20px] animate-ping opacity-20"></div>
              <CheckCircle2 className="w-10 h-10 text-accent relative z-10" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">تم استلام البلاغ!</h2>
              <p className="text-[11px] text-slate-400 font-bold">بدأت الوحدة التحرك من مستشفى ابن سينا</p>
            </div>

            <Card className="border-none shadow-soft rounded-[10px] bg-white overflow-hidden text-right border border-slate-50">
              <div className="bg-slate-50 p-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-slate-600">البلاغ نشط</span>
                </div>
                <span className="text-[9px] font-bold text-slate-300">ID: #H-8821</span>
              </div>
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] text-slate-500 font-bold">المسافة:</span>
                  </div>
                  <span className="text-[13px] font-bold text-slate-800">2.4 كم</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] text-slate-500 font-bold">وصول مقدر:</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-primary">6</span>
                    <span className="text-[9px] font-bold text-primary opacity-70">دقائق</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3 w-full">
              <Button 
                onClick={() => router.push("/track")} 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-[13px] font-bold rounded-[10px] shadow-lg shadow-primary/20 gap-2 active-scale"
              >
                <MapPin className="w-4 h-4" />
                تتبع المسعف فوراً
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/instructions")} 
                  className="h-11 rounded-[10px] border-slate-100 text-[11px] font-bold gap-2 text-slate-600 bg-white active-scale"
                >
                  <Activity className="w-3.5 h-3.5" />
                  إرشادات
                </Button>
                <Button 
                  variant="outline" 
                  className="h-11 rounded-[10px] border-accent/20 text-accent hover:bg-accent/5 text-[11px] font-bold gap-2 active-scale bg-accent/5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  اتصال
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
}
