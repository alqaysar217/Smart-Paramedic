"use client";

import { Home, ClipboardList, Info, Settings, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: 'home' | 'profile' | 'instructions' | 'settings';
}

export default function BottomNav({ activeTab }: BottomNavProps) {
  const items = [
    { id: 'home', label: 'الرئيسية', icon: Home, href: '/dashboard' },
    { id: 'instructions', label: 'إرشادات', icon: ClipboardList, href: '/instructions' },
    { id: 'profile', label: 'الملف الطبي', icon: User, href: '/profile' },
    { id: 'settings', label: 'الإعدادات', icon: Settings, href: '#' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center h-20 px-6 z-40">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            activeTab === item.id ? "text-primary scale-110" : "text-gray-400 hover:text-gray-600"
          )}
        >
          <item.icon className={cn("w-6 h-6", activeTab === item.id && "fill-primary/10")} />
          <span className="text-[10px] font-bold">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}