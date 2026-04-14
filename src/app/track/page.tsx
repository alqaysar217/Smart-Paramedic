
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
  Navigation,
  Clock,
  Zap
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function TrackingPage() {
  const router = useRouter();

  const mapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=49.10,14.52,49.15,14.56&layer=mapnik&marker=14.54,49.12";

  return (
    <div className="relative h-[100dvh] w-full bg-slate-50 font-cairo overflow-hidden" dir="rtl">
      {/* Background Map - Full Screen */}
      <div className="absolute inset-0 z-0">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          src={mapUrl}
          className="w-full h-full grayscale-[0.1] contrast-[1.1]"
          style={{ border: 0 }}
        ></iframe>
      </div>

      {/* Floating Header */}
      <div className="absolute top-4 left-4 right-4 z-30">
        <div className="p-2.5 bg-white/95 backdrop-blur-md border border-white/20 shadow-lg rounded-[10px] flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')} className="rounded-[10px] bg-slate-50 h-9 w-9 active-scale border border-slate-100">
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </Button>
          <div className="flex-1 text-right">
            <h1 className="font-bold text-[12px] text-slate-800 leading-none">تتبع النجدة</h1>
            <p className="text-[8px] text-primary font-bold mt-1 uppercase tracking-tighter">وحدة ابن سينا - AMB-42</p>
          </div>
          <Button size="icon" className="h-9 w-9 bg-primary text-white rounded-[10px] shadow-md active-scale">
            <Phone className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Center Distance Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping scale-[2]"></div>
          <div className="bg-primary/90 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/20">
             <Zap className="w-3 h-3 text-white fill-white" />
             <span className="text-white text-[10px] font-bold whitespace-nowrap">المسافة: 800 متر</span>
          </div>
        </div>
      </div>

      {/* Bottom Information Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="px-4 relative z-40 translate-y-6">
          <Card className="border-none shadow-2xl rounded-[10px] bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-[10px] overflow-hidden border border-slate-100 shadow-sm relative">
                  <Image src="https://picsum.photos/seed/dr-khaled/200/200" alt="Medic" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-accent text-white p-0.5 rounded-md border-2 border-white shadow-sm">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-[12px] text-slate-800">د. خالد العمودي</h3>
                <p className="text-[9px] text-slate-400 font-bold">مسعف ميداني - المكلا</p>
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-primary/5 rounded-[10px] min-w-[55px] border border-primary/10">
                <span className="text-[16px] font-black text-primary leading-none">4</span>
                <span className="text-[7px] text-primary font-bold uppercase mt-1">دقائق</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-white p-6 pt-10 rounded-t-[20px] shadow-[0_-10px_30px_rgba(0,0,0,0.1)] space-y-5">
          <div className="w-10 h-1 bg-slate-100 rounded-full mx-auto mb-2"></div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-[10px] border border-slate-100">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <Navigation className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="flex-1 text-right">
                <p className="text-[8px] text-slate-400 font-bold uppercase">السرعة</p>
                <p className="text-[11px] font-bold text-slate-700">65 كم/س</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-[10px] border border-slate-100">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="flex-1 text-right">
                <p className="text-[8px] text-slate-400 font-bold uppercase">الوجهة</p>
                <p className="text-[10px] font-bold text-slate-700 truncate">شارع الستين</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-11 rounded-[10px] font-bold border-slate-100 text-slate-500 text-[11px] active-scale shadow-sm bg-white">
              إلغاء الطلب
            </Button>
            <Button className="flex-[2] h-11 rounded-[10px] font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xl gap-2 text-[11px] active-scale">
              <MessageCircle className="w-4 h-4" />
              مراسلة المسعف
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
