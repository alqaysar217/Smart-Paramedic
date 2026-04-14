
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronRight, 
  Bell, 
  ShieldAlert, 
  Settings, 
  XCircle, 
  Navigation, 
  CloudRain, 
  CheckCircle2, 
  Info,
  Clock,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      desc: "تمت مزامنة بيانات فصيلة الدم (O+) مع السحابة الطبية بنجاح.", 
      time: "منذ ساعة", 
      icon: CheckCircle2, 
      color: "bg-green-50 text-green-500" 
    },
    { 
      id: 3, 
      type: 'weather', 
      title: "تنبيه جوي: أمطار ساحلية", 
      desc: "يرجى توخي الحذر عند القيادة في طريق المكلا - فوه بسبب احتمالية الانزلاق.", 
      time: "منذ 3 ساعات", 
      icon: CloudRain, 
      color: "bg-orange-50 text-orange-500" 
    },
    { 
      id: 4, 
      type: 'sos', 
      title: "استغاثة نشطة: حالة إغماء", 
      desc: "تم استلام طلب النجدة وتوجيهه لأقرب مسعف متاح حالياً.", 
      time: "منذ 10 دقائق", 
      icon: ShieldAlert, 
      color: "bg-red-50 text-red-500" 
    },
    { 
      id: 5, 
      type: 'cancelled', 
      title: "تم إلغاء البلاغ #H-8821", 
      desc: "تم إغلاق ملف البلاغ بناءً على طلب المستخدم أو تحسن الحالة.", 
      time: "منذ يوم", 
      icon: XCircle, 
      color: "bg-slate-50 text-slate-400" 
    },
    { 
      id: 6, 
      type: 'system', 
      title: "نصيحة طبية اليوم", 
      desc: "شرب الماء بكثرة في أجواء حضرموت الحارة يقلل من فرص الإصابة بضربات الشمس.", 
      time: "منذ 5 ساعات", 
      icon: Info, 
      color: "bg-purple-50 text-purple-500" 
    },
  ];

  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'sos', label: 'الاستغاثات' },
    { id: 'system', label: 'النظام' },
    { id: 'weather', label: 'تنبيهات الجو' },
    { id: 'cancelled', label: 'الملغية' },
  ];

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-cairo" dir="rtl">
      {/* Fixed Full Screen Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-5 h-16 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl bg-slate-50 h-10 w-10 active-scale">
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </Button>
        <div className="flex-1 text-right">
          <h1 className="text-sm font-black text-slate-900 leading-none">مركز التنبيهات</h1>
          <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Notification Control</p>
        </div>
        <Bell className="w-5 h-5 text-slate-300" />
      </header>

      <main className="px-5 pt-6 space-y-6">
        {/* Horizontal Filters Section */}
        <section className="space-y-3 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2 min-w-max">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as NotificationType)}
                className={cn(
                  "px-5 py-2.5 rounded-2xl text-[11px] font-black transition-all active-scale",
                  activeFilter === filter.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-white border border-slate-100 text-slate-500 hover:bg-slate-50"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* List of Notifications */}
        <section className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((n) => (
              <div 
                key={n.id} 
                className="bg-white p-5 rounded-[2rem] border border-slate-50 shadow-soft flex gap-4 transition-all hover:bg-slate-50/50 group"
              >
                <div className={cn("p-3.5 rounded-2xl h-fit group-hover:scale-110 transition-transform", n.color)}>
                  <n.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1.5 text-right">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[13px] font-black text-slate-800 leading-none">{n.title}</h3>
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-300 font-bold">
                      <Clock className="w-3 h-3" />
                      {n.time}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{n.desc}</p>
                  
                  {n.type === 'sos' && (
                    <div className="pt-2">
                      <Button className="h-8 text-[9px] font-black bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 border-none">
                        تتبع الآن
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-6 bg-slate-50 rounded-full">
                <Bell className="w-12 h-12 text-slate-200" />
              </div>
              <p className="text-[12px] font-black text-slate-400">لا توجد تنبيهات في هذا القسم حالياً</p>
            </div>
          )}
        </section>
      </main>

      <div className="h-20" /> {/* Spacer */}
    </div>
  );
}
