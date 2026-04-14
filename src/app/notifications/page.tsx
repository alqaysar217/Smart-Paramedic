"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronRight, 
  Bell, 
  ShieldAlert, 
  XCircle, 
  Navigation, 
  CloudRain, 
  CheckCircle2, 
  Info,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NotificationType = 'all' | 'sos' | 'system' | 'weather' | 'cancelled';

export default function NotificationsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<NotificationType>('all');

  const notifications = [
    { 
      id: 1, 
      type: 'sos', 
      title: "سيارة الإسعاف قريبة جداً", 
      desc: "الوحدة AMB-022 تبعد 500 متر عن موقعك الآن في شارع الستين.", 
      time: "منذ دقيقتين", 
      icon: Navigation, 
      color: "bg-blue-50 text-blue-500" 
    },
    { 
      id: 2, 
      type: 'system', 
      title: "تم تحديث الملف الطبي", 
      desc: "تمت مزامنة بيانات فصيلة الدم (O+) بنجاح.", 
      time: "منذ ساعة", 
      icon: CheckCircle2, 
      color: "bg-green-50 text-green-500" 
    },
    { 
      id: 3, 
      type: 'weather', 
      title: "تنبيه جوي: أمطار ساحلية", 
      desc: "يرجى توخي الحذر عند القيادة في طريق المكلا - فوه.", 
      time: "منذ 3 ساعات", 
      icon: CloudRain, 
      color: "bg-orange-50 text-orange-500" 
    },
  ];

  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'sos', label: 'الاستغاثات' },
    { id: 'system', label: 'النظام' },
    { id: 'weather', label: 'الجو' },
  ];

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-cairo" dir="rtl">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 px-4 h-14 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-[10px] bg-slate-50 h-9 w-9 active-scale">
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </Button>
        <div className="flex-1 text-right">
          <h1 className="text-[13px] font-bold text-slate-900 leading-none">مركز التنبيهات</h1>
        </div>
        <Bell className="w-4 h-4 text-slate-300" />
      </header>

      <main className="px-4 pt-4 space-y-4">
        <section className="overflow-x-auto pb-1 scrollbar-hide">
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as NotificationType)}
                className={cn(
                  "px-4 py-2 rounded-[10px] text-[10px] font-bold transition-all shrink-0",
                  activeFilter === filter.id 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-white border border-slate-100 text-slate-500 hover:bg-slate-50"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((n) => (
              <div 
                key={n.id} 
                className="bg-white p-4 rounded-[10px] border border-slate-50 shadow-soft flex gap-3 transition-all group"
              >
                <div className={cn("p-2.5 rounded-lg h-fit group-hover:scale-105 transition-transform", n.color)}>
                  <n.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1 text-right">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[12px] font-bold text-slate-800 leading-none">{n.title}</h3>
                    <div className="flex items-center gap-1 text-[8px] text-slate-300">
                      <Clock className="w-2.5 h-2.5" />
                      {n.time}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium leading-normal">{n.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center opacity-40">
              <Bell className="w-10 h-10 text-slate-200 mb-2" />
              <p className="text-[10px] font-bold">لا توجد تنبيهات حالياً</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}