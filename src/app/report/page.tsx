"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, MapPin, Send, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function ReportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'locating' | 'sending' | 'success'>('locating');
  const [progress, setProgress] = useState(0);
  const type = searchParams.get('type') || 'general';

  useEffect(() => {
    // Simulate steps
    const timer1 = setTimeout(() => {
      setStatus('sending');
      setProgress(40);
    }, 1500);

    const timer2 = setTimeout(() => {
      setProgress(80);
    }, 2500);

    const timer3 = setTimeout(() => {
      setStatus('success');
      setProgress(100);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
      {status !== 'success' ? (
        <div className="space-y-8 w-full">
          <div className="relative">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              {status === 'locating' ? (
                <MapPin className="w-10 h-10 text-primary animate-bounce" />
              ) : (
                <Send className="w-10 h-10 text-primary animate-pulse" />
              )}
            </div>
            <Loader2 className="w-32 h-32 text-primary/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold font-headline">
              {status === 'locating' ? "جاري تحديد موقعك..." : "جاري إرسال البلاغ..."}
            </h1>
            <p className="text-gray-500">سيتم إرسال بياناتك الطبية مع البلاغ تلقائياً لضمان سرعة الاستجابة</p>
          </div>

          <div className="space-y-2">
            <Progress value={progress} className="h-2 bg-gray-100" />
            <div className="flex justify-between text-xs font-bold text-gray-400">
              <span>{progress}%</span>
              <span>جاري المعالجة</span>
            </div>
          </div>

          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3 text-right">
            <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0" />
            <p className="text-sm text-orange-700 font-medium leading-relaxed">
              ابق في مكانك وحاول التنفس بهدوء. سيتم توصيلك بأقرب سيارة إسعاف فوراً.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-accent" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-headline text-accent">تم إرسال البلاغ بنجاح!</h1>
            <p className="text-gray-600">سيارة الإسعاف في طريقها إليك الآن</p>
          </div>

          <Card className="bg-gray-50 border-none shadow-sm p-6 text-right w-full">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold">الحالة:</span>
              <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">نشطة</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">المسافة:</span>
                <span className="font-bold">2.4 كم</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">الوقت المتوقع:</span>
                <span className="font-bold text-primary">6 دقائق</span>
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-3 w-full">
            <Button onClick={() => router.push("/track")} className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-bold rounded-2xl">
              تتبع سيارة الإسعاف
            </Button>
            <Button variant="outline" onClick={() => router.push("/instructions")} className="w-full h-14 border-gray-200 text-lg font-bold rounded-2xl">
              تعليمات الإسعافات الأولية
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`rounded-2xl p-4 ${className}`}>{children}</div>;
}