
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Phone, 
  MapPin, 
  MessageCircle,
  AlertCircle,
  ShieldCheck,
  Compass,
  Maximize2,
  Car
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TrackingPage() {
  const router = useRouter();

  // إحداثيات المكلا (موقع البلاغ) - دبوس واحد واضح
  const mapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=49.11,14.53,49.14,14.55&layer=mapnik&marker=14.54,49.12";

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
      </div>

      {/* الرأس (Floating Header) */}
      <div className="absolute top-5 left-4 right-4 z-30">
        <div className="p-2.5 bg-white/90 backdrop-blur-md border border-white/40 shadow-xl rounded-2xl flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl bg-slate-50 h-9 w-9 active-scale">
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </Button>
          <div className="flex-1 text-right">
            <h1 className="font-black text-[11px] text-slate-800 leading-none">موقع الاستجابة الطارئة</h1>
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
              </div>
              <div className="flex-1 space-y-1 text-right">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">موقع البلاغ المثبت</p>
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
              إلغاء الطلب
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
