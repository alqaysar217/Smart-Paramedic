
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function SplashPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      router.push("/auth");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  if (!isVisible) return null;

  const logo = PlaceHolderImages.find((img) => img.id === "medical-app-logo");

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white p-6 text-center max-w-md mx-auto border-x border-gray-50 shadow-sm font-cairo" dir="rtl">
      {/* الصورة النابضة في الأعلى */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping scale-125 opacity-10"></div>
        <div className="relative w-28 h-28 animate-pulse">
          {logo && (
            <Image
              src={logo.imageUrl}
              alt="المسعف الذكي"
              width={112}
              height={112}
              className="rounded-[24px] shadow-xl border-2 border-primary/5"
              data-ai-hint={logo.imageHint}
            />
          )}
        </div>
      </div>

      {/* اسم التطبيق والفقرة */}
      <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-[20px] font-black text-slate-900 tracking-tight leading-none">
          المسعف الذكي
        </h1>
        <div className="h-0.5 w-8 bg-primary mx-auto rounded-full opacity-30"></div>
        <p className="text-[11px] text-slate-400 font-bold max-w-[200px] mx-auto leading-relaxed uppercase tracking-wider">
          نحن هنا لإنقاذ الأرواح في كل لحظة
        </p>
      </div>
      
      {/* مؤشر التحميل السفلي */}
      <div className="absolute bottom-16 flex gap-1.5 items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"></div>
      </div>
      
      <div className="absolute bottom-8">
        <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">Hadhramaut Emergency System</p>
      </div>
    </div>
  );
}
