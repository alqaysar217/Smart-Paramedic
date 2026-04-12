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
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  if (!isVisible) return null;

  const logo = PlaceHolderImages.find((img) => img.id === "medical-app-logo");

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative w-32 h-32 mb-6 animate-bounce">
        <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-25"></div>
        {logo && (
          <Image
            src={logo.imageUrl}
            alt="المسعف الذكي"
            width={128}
            height={128}
            className="rounded-full shadow-2xl relative z-10"
            data-ai-hint={logo.imageHint}
          />
        )}
      </div>
      <h1 className="font-headline text-4xl font-bold text-primary tracking-tight">
        المسعف الذكي
      </h1>
      <p className="mt-2 text-gray-500 font-medium">نحن هنا لإنقاذ الأرواح</p>
      
      <div className="absolute bottom-10 flex gap-1 items-center">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75"></div>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
      </div>
    </div>
  );
}