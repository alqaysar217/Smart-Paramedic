
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Phone, 
  MapPin, 
  Navigation, 
  MessageCircle,
  AlertCircle,
  Activity,
  ShieldCheck,
  Compass,
  Maximize2,
  Layers,
  Info
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TrackingPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-full bg-white flex flex-col font-cairo overflow-hidden relative" dir="rtl">
      {/* الخريطة كخلفية كاملة للشاشة */}
      <div className="absolute inset-0 z-0">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight={0} 
          marginWidth={0} 
          src="https://www.openstreetmap.org/export/embed.html?bbox=49.11,14.53,49.14,14.55&amp;layer=mapnik&amp;marker=14.542,49.125"
          className="grayscale-[0.1] contrast-[1.1] w-full h-full"
        ></iframe>
        <div className="absolute inset-0 pointer-events-none bg-primary/5"></div>
      </div>

      {/* Header Overlay - يطفو فوق الخريطة */}
      <div className="p-3 flex items-center gap-4 bg-white/95 backdrop-blur-md absolute top-6 left-4 right-4 z-30 border border-white/20 shadow-xl rounded-[2rem]">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-2xl bg-slate-50 h-10 w-10">
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </Button>
        <div className="flex-1 text-right">
          <h1 className="font-black text-xs text-slate-800">تتبع المسعف المباشر</h1>
          <p className="text-[9px] text-accent font-black flex items-center gap-1.5 justify-end">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
            مستشفى ابن سينا - الوحدة 42
          </p>
        </div>
        <Button size="icon" className="h-10 w-10 bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-lg shadow-primary/20">
          <Phone className="w-4 h-4" />
        </Button>
      </div>

      {/* Map UI Elements - أدوات الخريطة */}
      <div className="absolute top-28 left-6 flex flex-col gap-3 z-20">
        <button className="w-10 h-10 bg-white/95 backdrop-blur shadow-xl rounded-2xl flex items-center justify-center text-slate-500 active-scale border border-white/20">
          <Compass className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 bg-white/95 backdrop-blur shadow-xl rounded-2xl flex items-center justify-center text-slate-500 active-scale border border-white/20">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Live Ambulance Marker - مؤشر الإسعاف الحي */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        <div className="relative">
          <div className="absolute -inset-10 bg-primary/20 rounded-full animate-ping opacity-40"></div>
          <div className="w-12 h-12 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-[3px] border-primary relative z-10 rotate-12">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1 rounded-full text-[8px] font-black shadow-xl whitespace-nowrap">
            سرعة الإسعاف: 85 كم/س
          </div>
        </div>
      </div>

      {/* الجزء السفلي: البطاقة العائمة ومعلومات الرحلة */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* Floating Driver Info Card */}
        <div className="px-5 mb-[-30px] relative z-40">
          <Card className="border-none shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-[2.5rem] bg-white p-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-50 shadow-inner">
                  <Image src="https://picsum.photos/seed/medic-portrait/200/200" alt="Medic" width={56} height={56} className="object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-accent text-white p-1 rounded-lg shadow-md border-2 border-white">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-black text-[15px] text-slate-800">د. خالد سعيد العمودي</h3>
                <p className="text-[10px] text-slate-400 font-bold">جراحة وطوارئ - مستشفى المكلا</p>
                <div className="flex items-center gap-1 mt-1 justify-end">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>)}
                  <span className="text-[9px] text-slate-400 mr-2 font-black">4.9 / 5.0</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-primary/5 rounded-2xl min-w-[65px] border border-primary/5">
                <span className="text-xl font-black text-primary leading-none">4</span>
                <span className="text-[9px] text-primary font-black uppercase mt-1">دقائق</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation Details Bottom Sheet */}
        <div className="bg-white p-8 pt-14 rounded-t-[3.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.04)] space-y-6">
          <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-2 opacity-50"></div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1.5 mt-1 shrink-0">
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center ring-[6px] ring-primary/10">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div className="w-0.5 h-10 bg-gradient-to-b from-primary/20 to-slate-50"></div>
                <div className="w-4 h-4 rounded-full bg-slate-200 border-[3px] border-white shadow-sm"></div>
              </div>
              <div className="flex-1 space-y-1 text-right">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">الموقع المستهدف</p>
                <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                  <p className="text-xs font-black text-slate-700">المكلا، حي فوة، شارع الستين</p>
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-14 rounded-2xl font-black border-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all gap-2 text-xs active-scale">
              <AlertCircle className="w-4 h-4" />
              إلغاء الطلب
            </Button>
            <Button className="flex-[1.5] h-14 rounded-2xl font-black bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10 gap-2 px-8 text-xs active-scale">
              <MessageCircle className="w-4 h-4" />
              مراسلة الطبيب
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
