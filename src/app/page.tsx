
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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white p-6 text-center max-w-md mx-auto border-x border-gray-50 shadow-sm">
      {/* الصورة النابضة في الأعلى */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping scale-150 opacity-20"></div>
        <div className="relative w-40 h-40 animate-pulse">
          {logo && (
            <Image
              src={logo.imageUrl}
              alt="المسعف الذكي"
              width={160}
              height={160}
              className="rounded-full shadow-2xl border-4 border-primary/10"
              data-ai-hint={logo.imageHint}
            />
          )}
        </div>
      </div>

      {/* اسم التطبيق والفقرة */}
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="font-headline text-5xl font-black text-primary tracking-tight">
          المسعف الذكي
        </h1>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        <p className="text-xl text-gray-600 font-bold max-w-xs mx-auto">
          نحن هنا لإنقاذ الأرواح في كل لحظة
        </p>
      </div>
      
      {/* مؤشر التحميل السفلي */}
      <div className="absolute bottom-16 flex gap-2 items-center">
        <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 rounded-full bg-primary animate-bounce"></div>
      </div>
    </div>
  );
}
