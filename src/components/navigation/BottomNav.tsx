"use client";

import { Home, Settings, User, Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface BottomNavProps {
  activeTab: 'home' | 'profile' | 'instructions' | 'settings';
}

export default function BottomNav({ activeTab }: BottomNavProps) {
  const items = [
    { id: 'home', label: 'الرئيسية', icon: Home, href: '/dashboard' },
    { id: 'instructions', label: 'إسعافات', icon: Activity, href: '/instructions' },
    { id: 'profile', label: 'الملف الطبي', icon: User, href: '/profile' },
    { id: 'settings', label: 'الإعدادات', icon: Settings, href: '/settings' },
  ];

  return (
    <nav className="fixed bottom-6 left-6 right-6 max-w-md mx-auto bg-white/95 backdrop-blur-md border border-slate-100 flex justify-around items-center h-16 px-2 z-40 shadow-xl rounded-full">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            "flex-1 flex flex-col items-center justify-center gap-0.5 transition-all relative active-scale",
            activeTab === item.id ? "text-primary" : "text-slate-400 hover:text-slate-600"
          )}
        >
          <div className={cn(
            "p-1.5 rounded-full transition-all",
            activeTab === item.id ? "bg-primary/5" : "bg-transparent"
          )}>
            <item.icon className={cn("w-5 h-5", activeTab === item.id && "stroke-[2.5px]")} />
          </div>
          <span className={cn(
            "text-[9px] font-bold transition-all",
            activeTab === item.id ? "opacity-100" : "opacity-60"
          )}>{item.label}</span>
          
          {activeTab === item.id && (
            <span className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"></span>
          )}
        </Link>
      ))}
    </nav>
  );
}