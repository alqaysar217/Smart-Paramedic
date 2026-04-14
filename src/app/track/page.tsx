
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
  Info,
  Car
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TrackingPage() {
  const router = useRouter();

  // إحداثيات المكلا التقريبية (مستشفى البرج إلى حي فوة)
  const mapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=49.0881,14.5125,49.1555,14.5612&layer=mapnik&marker=14.545,49.125";

  return (
    <div className="relative h-screen w-full bg-slate-50 flex flex-col font-cairo overflow-hidden" dir="rtl">
      {/* الخريطة الحقيقية ملء الشاشة */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight={0} 
          marginWidth={0} 
          src={mapUrl}
          className="w-full h-full grayscale-[0.1] contrast-[1.1] brightness-[0.98]"
          style={{ border: 0 }}
        ></iframe>
        
        {/* طبقة المسار (Route) الواقعي - يتبع ساحل المكلا تقريباً */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path 
            d="M 320 280 C 280 350, 220 450, 180 520 S 120 650, 100 700" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="6" 
            strokeLinecap="round"
            filter="url(#glow)"
            className="animate-pulse"
          />
          <path 
            d="M 320 280 C 280 350, 220 450, 180 520 S 120 650, 100 700" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeDasharray="8, 12"
            strokeLinecap="round"
          />
        </svg>

        {/* مؤشر موقع سيارة الإسعاف (موقع مستشفى البرج الفعلي على الخريطة) */}
        <div className="absolute top-[28%] right-[32%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="relative flex flex-col items-center">
            <div className="absolute -inset-6 bg-primary/20 rounded-full animate-ping opacity-40"></div>
            <div className="w-10 h-10 bg-white rounded-xl shadow-xl flex items-center justify-center border-2 border-primary relative z-10 transform rotate-[-15deg]">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <div className="mt-1.5 bg-slate-900 px-2 py-0.5 rounded-full text-[7px] font-black text-white shadow-lg whitespace-nowrap">
              وحدة مستشفى البرج
            </div>
          </div>
        </div>

        {/* مؤشر موقعك الحالي (حي فوة - شارع الستين) */}
        <div className="absolute bottom-[28%] left-[22%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="relative flex flex-col items-center">
            <div className="absolute -inset-8 bg-blue-500/20 rounded-full animate-pulse opacity-30 scale-150"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full shadow-lg border-2 border-white relative z-10 ring-4 ring-blue-600/10"></div>
            <div className="mt-2 bg-white/95 backdrop-blur-sm border border-slate-100 text-slate-800 px-2 py-0.5 rounded-full text-[7px] font-black shadow-md whitespace-nowrap">
              موقعك الحالي
            </div>
          </div>
        </div>
      </div>

      {/* الرأس (Floating Header) */}
      <div className="absolute top-5 left-4 right-4 z-30">
        <div className="p-2.5 bg-white/90 backdrop-blur-md border border-white/40 shadow-xl rounded-2xl flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl bg-slate-50 h-9 w-9 active-scale">
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </Button>
          <div className="flex-1 text-right">
            <h1 className="font-black text-[11px] text-slate-800 leading-none">تتبع المسار المباشر</h1>
            <p className="text-[8px] text-accent font-black flex items-center gap-1 justify-end mt-1">
              <span className="w-1 h-1 bg-accent rounded-full animate-pulse"></span>
              مستشفى البرج - وحدة الطوارئ
            </p>
          </div>
          <div className="h-8 w-px bg-slate-100 mx-1"></div>
          <Button size="icon" className="h-9 w-9 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 active-scale">
            <Phone className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* أدوات الخريطة الذكية */}
      <div className="absolute top-24 left-4 flex flex-col gap-2 z-20">
        <button className="w-9 h-9 bg-white/95 shadow-lg rounded-xl flex items-center justify-center text-slate-500 active-scale border border-white/20">
          <Compass className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 bg-white/95 shadow-lg rounded-xl flex items-center justify-center text-slate-500 active-scale border border-white/20">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* الجزء السفلي (Bottom Control Panel) */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* بطاقة المسعف الطافية */}
        <div className="px-5 relative z-40 translate-y-6">
          <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-[2rem] bg-white p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-50 shadow-sm">
                  <Image src="https://picsum.photos/seed/dr-khaled/200/200" alt="Medic" width={56} height={56} className="object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-accent text-white p-1 rounded-md shadow-md border-2 border-white">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-black text-xs text-slate-800">د. خالد العمودي</h3>
                <p className="text-[9px] text-slate-400 font-bold">وحدة العناية المركزة - المكلا</p>
                <div className="flex items-center gap-0.5 mt-1 justify-end">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>)}
                  <span className="text-[8px] text-slate-400 mr-1.5 font-black">4.9 تقييم</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-primary/5 rounded-xl min-w-[60px] border border-primary/10">
                <span className="text-xl font-black text-primary leading-none tracking-tighter">5</span>
                <span className="text-[8px] text-primary font-black uppercase mt-0.5">دقائق</span>
              </div>
            </div>
          </Card>
        </div>

        {/* لوحة التحكم والبيانات */}
        <div className="bg-white p-6 pt-12 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.04)] space-y-5">
          <div className="w-10 h-1 bg-slate-100 rounded-full mx-auto"></div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center gap-1 mt-1 shrink-0">
                <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/10"></div>
                <div className="w-0.5 h-10 bg-gradient-to-b from-primary/20 to-slate-50"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200 border-2 border-white shadow-sm"></div>
              </div>
              <div className="flex-1 space-y-1 text-right">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">نقطة الالتقاء</p>
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                  <p className="text-[11px] font-black text-slate-700">المكلا، حي فوة، شارع الستين</p>
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 h-13 rounded-2xl font-black border-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all gap-2 text-[10px] active-scale">
              <AlertCircle className="w-3.5 h-3.5" />
              إلغاء
            </Button>
            <Button className="flex-[2] h-13 rounded-2xl font-black bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10 gap-2 text-[10px] active-scale">
              <MessageCircle className="w-3.5 h-3.5" />
              تواصل مع الوحدة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
