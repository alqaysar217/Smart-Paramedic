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
  Compass
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function TrackingPage() {
  const router = useRouter();

  const mapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=49.10,14.52,49.15,14.56&layer=mapnik&marker=14.54,49.12";

  return (
    <div className="relative h-[100dvh] w-full bg-slate-50 font-cairo overflow-hidden" dir="rtl">
      <div className="absolute inset-0 z-0">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          src={mapUrl}
          className="w-full h-full grayscale-[0.1]"
          style={{ border: 0 }}
        ></iframe>
      </div>

      <div className="absolute top-4 left-4 right-4 z-30">
        <div className="p-2.5 bg-white/90 backdrop-blur-md border border-white/40 shadow-lg rounded-[10px] flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')} className="rounded-lg bg-slate-50 h-9 w-9">
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </Button>
          <div className="flex-1 text-right">
            <h1 className="font-bold text-[11px] text-slate-800 leading-none">تتبع المسعف المباشر</h1>
            <p className="text-[8px] text-primary font-bold mt-1">مستشفى ابن سينا - الوحدة 42</p>
          </div>
          <Button size="icon" className="h-9 w-9 bg-primary text-white rounded-lg shadow-md active-scale">
            <Phone className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="px-4 relative z-40 translate-y-6">
          <Card className="border-none shadow-xl rounded-[10px] bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-[10px] overflow-hidden border border-slate-50 shadow-sm relative">
                  <Image src="https://picsum.photos/seed/dr-khaled/200/200" alt="Medic" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-accent text-white p-0.5 rounded-lg border-2 border-white">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-[12px] text-slate-800">د. خالد العمودي</h3>
                <p className="text-[9px] text-slate-400">جراحة وطوارئ - المكلا</p>
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-primary/5 rounded-[10px] min-w-[50px] border border-primary/10">
                <span className="text-lg font-bold text-primary leading-none">4</span>
                <span className="text-[7px] text-primary font-bold uppercase mt-1">دقائق</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-white p-6 pt-10 rounded-t-[20px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] space-y-4">
          <div className="w-8 h-1 bg-slate-100 rounded-full mx-auto mb-2"></div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 text-right">
              <p className="text-[8px] text-slate-400 font-bold uppercase">الموقع المستهدف</p>
              <p className="text-[11px] font-bold text-slate-800">حي فوة، شارع الستين</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 h-11 rounded-[10px] font-bold border-slate-100 text-slate-400 text-[10px]">
              إلغاء
            </Button>
            <Button className="flex-[2] h-11 rounded-[10px] font-bold bg-slate-900 text-white shadow-lg gap-2 text-[10px]">
              <MessageCircle className="w-3.5 h-3.5" />
              مراسلة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}