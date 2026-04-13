
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
    <div className="relative h-screen w-full bg-slate-50 flex flex-col font-cairo overflow-hidden" dir="rtl">
      {/* الخريطة الحقيقية ملء الشاشة تماماً */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight={0} 
          marginWidth={0} 
          src="https://www.openstreetmap.org/export/embed.html?bbox=49.11,14.53,49.14,14.55&amp;layer=mapnik&amp;marker=14.542,49.125"
          className="w-full h-full grayscale-[0.1] contrast-[1.1] brightness-[0.95]"
          style={{ border: 0, height: '100%', width: '100%' }}
        ></iframe>
        {/* طبقة ناعمة فوق الخريطة لتحسين القراءة */}
        <div className="absolute inset-0 pointer-events-none bg-primary/5"></div>
      </div>

      {/* الرأس (Header Overlay) */}
      <div className="absolute top-6 left-4 right-4 z-30">
        <div className="p-3 bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl rounded-[2rem] flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-2xl bg-slate-50 h-10 w-10 active-scale">
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </Button>
          <div className="flex-1 text-right">
            <h1 className="font-black text-xs text-slate-800">تتبع المسعف المباشر</h1>
            <p className="text-[9px] text-accent font-black flex items-center gap-1.5 justify-end">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
              مستشفى ابن سينا - الوحدة 42
            </p>
          </div>
          <Button size="icon" className="h-10 w-10 bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-lg shadow-primary/20 active-scale">
            <Phone className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* أدوات الخريطة الجانبية */}
      <div className="absolute top-28 left-6 flex flex-col gap-3 z-20">
        <button className="w-10 h-10 bg-white shadow-xl rounded-2xl flex items-center justify-center text-slate-500 active-scale border border-white/20">
          <Compass className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 bg-white shadow-xl rounded-2xl flex items-center justify-center text-slate-500 active-scale border border-white/20">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* مؤشر الإسعاف الحي في منتصف الخريطة */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        <div className="relative">
          <div className="absolute -inset-12 bg-primary/20 rounded-full animate-ping opacity-40"></div>
          <div className="w-14 h-14 bg-white rounded-3xl shadow-2xl flex items-center justify-center border-[4px] border-primary relative z-10 rotate-12">
            <Activity className="w-7 h-7 text-primary" />
          </div>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[9px] font-black shadow-2xl whitespace-nowrap">
            السرعة: 85 كم/س
          </div>
        </div>
      </div>

      {/* الجزء السفلي (Bottom Overlay) */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="px-5 relative z-40 translate-y-8">
          <Card className="border-none shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-[2.5rem] bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-50 shadow-inner">
                  <Image src="https://picsum.photos/seed/medic-portrait/200/200" alt="Medic" width={64} height={64} className="object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-accent text-white p-1.5 rounded-lg shadow-md border-2 border-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-black text-[15px] text-slate-800">د. خالد العمودي</h3>
                <p className="text-[10px] text-slate-400 font-bold">جراحة وطوارئ - مستشفى المكلا</p>
                <div className="flex items-center gap-1 mt-1 justify-end">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>)}
                  <span className="text-[9px] text-slate-400 mr-2 font-black">4.9 / 5.0</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-primary/5 rounded-2xl min-w-[70px] border border-primary/10">
                <span className="text-2xl font-black text-primary leading-none">4</span>
                <span className="text-[9px] text-primary font-black uppercase mt-1">دقائق</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-white p-8 pt-16 rounded-t-[3.5rem] shadow-[0_-15px_50px_rgba(0,0,0,0.05)] space-y-6">
          <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto opacity-50"></div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1.5 mt-1 shrink-0">
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center ring-[6px] ring-primary/10">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div className="w-0.5 h-12 bg-gradient-to-b from-primary/20 to-slate-50"></div>
                <div className="w-4 h-4 rounded-full bg-slate-200 border-[3px] border-white shadow-sm"></div>
              </div>
              <div className="flex-1 space-y-1 text-right">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">الموقع المستهدف</p>
                <div className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                  <p className="text-[12px] font-black text-slate-700">المكلا، حي فوة، شارع الستين</p>
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
