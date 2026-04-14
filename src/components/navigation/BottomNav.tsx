"use client";

import { Home, Settings, User, Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
    <nav className="fixed bottom-4 left-4 right-4 max-w-[calc(100%-2rem)] mx-auto bg-white/95 backdrop-blur-md border border-slate-100 flex justify-around items-center h-14 z-40 shadow-lg rounded-[10px]">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            "flex-1 flex flex-col items-center justify-center gap-0.5 transition-all active-scale",
            activeTab === item.id ? "text-primary" : "text-slate-400"
          )}
        >
          <div className={cn(
            "p-1.5 rounded-lg transition-all",
            activeTab === item.id ? "bg-primary/5" : "bg-transparent"
          )}>
            <item.icon className={cn("w-4 h-4", activeTab === item.id && "stroke-[2.5px]")} />
          </div>
          <span className={cn(
            "text-[8px] font-bold transition-all",
            activeTab === item.id ? "opacity-100" : "opacity-60"
          )}>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}