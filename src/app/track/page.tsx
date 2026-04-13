
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Phone, 
  Info, 
  MapPin, 
  Clock, 
  Navigation, 
  MessageCircle,
  AlertCircle,
  User,
  Activity,
  ShieldCheck
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";

export default function TrackingPage() {
  const router = useRouter();
  const trackImg = PlaceHolderImages.find(i => i.id === "ambulance-tracking");

  return (
    <div className="min-h-screen bg-white flex flex-col font-cairo overflow-hidden" dir="rtl">
      {/* Header Overlay */}
      <div className="p-4 flex items-center gap-4 bg-white/90 backdrop-blur-md absolute top-0 left-0 right-0 z-30 border-b border-gray-100/50 shadow-sm mx-4 mt-4 rounded-3xl">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-2xl bg-gray-50">
          <ChevronRight className="w-6 h-6" />
        </Button>
        <div className="flex-1 text-right">
          <h1 className="font-black text-sm">تتبع المسعف</h1>
          <p className="text-[10px] text-accent font-black flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
            سيارة إسعاف طراز 2024 - رقم 42
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="icon" className="bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-lg shadow-primary/20">
            <Phone className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1 relative min-h-[50vh]">
        {trackImg && (
          <Image
            src={trackImg.imageUrl}
            alt="Tracking map"
            fill
            className="object-cover"
            data-ai-hint={trackImg.imageHint}
          />
        )}
        
        {/* Ambulance Pulse Icon on Map */}
        <div className="absolute top-[40%] left-[30%]">
          <div className="relative">
            <div className="absolute -inset-8 bg-primary/20 rounded-full animate-ping opacity-40"></div>
            <div className="w-12 h-12 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-2 border-primary relative z-10">
              <Activity className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        {/* User Marker */}
        <div className="absolute bottom-[30%] right-[40%]">
          <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-xl"></div>
        </div>
      </div>

      {/* Driver Info Floating Card */}
      <div className="px-6 relative z-20 -mb-6">
        <Card className="border-none shadow-2xl rounded-[2rem] bg-white p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-50 shadow-inner">
                <Image src="https://picsum.photos/seed/medic/200/200" alt="Medic" width={64} height={64} className="object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-accent text-white p-1 rounded-lg shadow-md border-2 border-white">
                <ShieldCheck className="w-3 h-3" />
              </div>
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-black text-lg">د. عبد الله الماجد</h3>
              <p className="text-xs text-gray-500 font-bold">مسعف أول - خبرة 10 سنوات</p>
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full"></div>)}
                <span className="text-[10px] text-gray-400 mr-2">4.9 تقييم</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-primary/5 rounded-2xl min-w-[70px]">
              <span className="text-2xl font-black text-primary leading-none">4</span>
              <span className="text-[10px] text-primary font-bold">دقائق</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Details Card */}
      <div className="bg-white p-8 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] relative z-10 space-y-6">
        <div className="w-16 h-1.5 bg-gray-100 rounded-full mx-auto mb-2"></div>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-1 mt-1 shrink-0">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center ring-4 ring-primary/10">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="w-0.5 h-16 bg-gradient-to-b from-primary/30 to-gray-100"></div>
              <div className="w-5 h-5 rounded-full bg-gray-200 border-4 border-white shadow-sm"></div>
            </div>
            <div className="flex-1 space-y-5 text-right">
              <div className="space-y-1">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">نقطة الالتقاء</p>
                <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
                  <p className="text-sm font-black text-gray-800">حي الملقا، شارع 42، مبنى 5</p>
                  <Navigation className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">المستشفى المستهدف</p>
                <div className="p-4 bg-primary/5 rounded-2xl flex items-center justify-between border border-primary/10">
                  <p className="text-sm font-black text-primary">مستشفى الملك فيصل التخصصي</p>
                  <Activity className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button variant="outline" className="flex-1 h-16 rounded-2xl font-black border-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all gap-2">
            <AlertCircle className="w-5 h-5" />
            إلغاء
          </Button>
          <Button className="flex-2 h-16 rounded-2xl font-black bg-accent hover:bg-accent/90 text-white shadow-xl shadow-accent/20 gap-2 px-8">
            <MessageCircle className="w-5 h-5" />
            تحدث مع المسعف
          </Button>
        </div>
      </div>
    </div>
  );
}
