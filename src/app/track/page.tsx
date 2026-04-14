
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
  Maximize2
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function TrackingPage() {
  const router = useRouter();

  // إحداثيات المكلا (موقع البلاغ) - دبوس واحد واضح وبسيط
  const mapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=49.10,14.52,49.15,14.56&layer=mapnik&marker=14.54,49.12";

  return (
    <div className="relative h-[100dvh] w-full bg-slate-50 font-cairo overflow-hidden" dir="rtl">
      {/* الخريطة الحقيقية ملء الشاشة - خلفية أساسية */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight={0} 
          marginWidth={0} 
          src={mapUrl}
          className="w-full h-full grayscale-[0.1] contrast-[1.1] brightness-[1.0]"
          style={{ border: 0, height: '100%', width: '100%' }}
        ></iframe>
      </div>

      {/* الرأس الطافي (Floating Header) */}
      <div className="absolute top-6 left-4 right-4 z-30">
        <div className="p-3 bg-white/90 backdrop-blur-md border border-white/40 shadow-xl rounded-2xl flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')} className="rounded-xl bg-slate-50 h-10 w-10 active-scale">
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </Button>
          <div className="flex-1 text-right">
            <h1 className="font-black text-xs text-slate-800 leading-none">تتبع المسعف المباشر</h1>
            <p className="text-[9px] text-primary font-black flex items-center gap-1 justify-end mt-1.5">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              مستشفى ابن سينا - الوحدة 42
            </p>
          </div>
          <div className="h-8 w-px bg-slate-100 mx-1"></div>
          <Button size="icon" className="h-10 w-10 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 active-scale">
            <Phone className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* أدوات الخريطة الجانبية */}
      <div className="absolute top-28 left-4 flex flex-col gap-3 z-20">
        <button className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-slate-500 active-scale border border-white/20">
          <Compass className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-slate-500 active-scale border border-white/20">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* اللوحة السفلية (Bottom UI) */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* بطاقة المسعف الطافية */}
        <div className="px-5 relative z-40 translate-y-8">
          <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] bg-white p-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-50 shadow-sm">
                  <Image src="https://picsum.photos/seed/dr-khaled/200/200" alt="Medic" width={64} height={64} className="object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-accent text-white p-1 rounded-lg shadow-md border-2 border-white">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-black text-sm text-slate-800">د. خالد سعيد العمودي</h3>
                <p className="text-[10px] text-slate-400 font-bold">جراحة وطوارئ - مستشفى المكلا</p>
                <div className="flex items-center gap-1 mt-1.5 justify-end">
                  <span className="text-[9px] text-slate-400 mr-2 font-black">4.9 / 5.0</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-primary/5 rounded-2xl min-w-[70px] border border-primary/10">
                <span className="text-2xl font-black text-primary leading-none tracking-tighter">4</span>
                <span className="text-[9px] text-primary font-black uppercase mt-1">دقائق</span>
              </div>
            </div>
          </Card>
        </div>

        {/* لوحة المعلومات السفلية */}
        <div className="bg-white p-8 pt-16 rounded-t-[3.5rem] shadow-[0_-15px_50px_rgba(0,0,0,0.06)] space-y-6">
          <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto"></div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1 text-right">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">الموقع المستهدف</p>
                <p className="text-[13px] font-black text-slate-800">المكلا، حي فوة، شارع الستين</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-15 rounded-2xl font-black border-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all gap-2 text-[11px] active-scale">
              <AlertCircle className="w-4 h-4" />
              إلغاء الطلب
            </Button>
            <Button className="flex-[2] h-15 rounded-2xl font-black bg-slate-900 hover:bg-slate-800 text-white shadow-2xl shadow-slate-900/20 gap-2 text-[11px] active-scale">
              <MessageCircle className="w-4 h-4" />
              مراسلة الطبيب
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
