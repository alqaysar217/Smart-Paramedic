
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
    { id: 'profile', label: 'ملفي الطبي', icon: User, href: '/profile' },
    { id: 'settings', label: 'الإعدادات', icon: Settings, href: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center h-22 pb-6 pt-3 px-6 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.02)] rounded-t-[2.5rem]">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            "flex flex-col items-center gap-1.5 transition-all relative group px-4",
            activeTab === item.id ? "text-primary scale-110" : "text-gray-400 hover:text-gray-600"
          )}
        >
          <div className={cn(
            "p-2 rounded-2xl transition-all",
            activeTab === item.id ? "bg-primary/10 shadow-sm" : "bg-transparent"
          )}>
            <item.icon className={cn("w-6 h-6 transition-all", activeTab === item.id && "fill-primary/20 stroke-[2.5px]")} />
          </div>
          <span className={cn(
            "text-[10px] font-black transition-all",
            activeTab === item.id ? "opacity-100" : "opacity-70"
          )}>{item.label}</span>
          {activeTab === item.id && (
            <span className="absolute -top-1 w-1 h-1 bg-primary rounded-full"></span>
          )}
        </Link>
      ))}
    </nav>
  );
}
