"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Info, MapPin, Clock } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function TrackingPage() {
  const router = useRouter();
  const trackImg = PlaceHolderImages.find(i => i.id === "ambulance-tracking");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6 rotate-180" />
        </Button>
        <div className="flex-1">
          <h1 className="font-headline font-bold">تتبع الحالة</h1>
          <p className="text-xs text-accent font-bold">تم القبول - سيارة رقم 42</p>
        </div>
        <Button variant="ghost" size="icon" className="bg-primary/10 text-primary rounded-xl">
          <Phone className="w-5 h-5" />
        </Button>
      </div>

      {/* Map Section */}
      <div className="flex-1 relative">
        {trackImg && (
          <Image
            src={trackImg.imageUrl}
            alt="Tracking map"
            fill
            className="object-cover"
            data-ai-hint={trackImg.imageHint}
          />
        )}
        
        {/* Mock Driver Overlay */}
        <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur shadow-lg rounded-2xl p-4 border border-white/20 flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
            <Image src="https://picsum.photos/seed/driver/100/100" alt="Driver" width={48} height={48} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">أحمد الشمري</h3>
            <p className="text-xs text-gray-500">سائق مسعف - خبير</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-primary font-bold">
              <Clock className="w-3 h-3" />
              <span className="text-sm">4 د</span>
            </div>
            <p className="text-[10px] text-gray-400">الوقت المتبقي</p>
          </div>
        </div>
      </div>

      {/* Status Detail Card */}
      <div className="bg-white p-6 rounded-t-3xl shadow-2xl border-t border-gray-100 -mt-8 relative z-10 space-y-6">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-2"></div>
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-headline">وجهة الوصول</h2>
          <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">معرّف البلاغ: #8821</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-1 mt-1">
              <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20"></div>
              <div className="w-0.5 h-12 bg-gray-100"></div>
              <div className="w-4 h-4 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-xs text-gray-400 font-bold mb-1">موقعك الحالي</p>
                <p className="text-sm font-medium">حي النزهة، شارع الأمير سلطان</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-xs text-gray-400 font-bold mb-1">الجهة المستلمة</p>
                <p className="text-sm font-bold text-primary">مستشفى الملك فيصل التخصصي</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 h-14 rounded-2xl font-bold border-gray-200">
            إلغاء الطلب
          </Button>
          <Button className="flex-1 h-14 rounded-2xl font-bold bg-accent hover:bg-accent/90">
            مشاركة الموقع
          </Button>
        </div>
      </div>
    </div>
  );
}