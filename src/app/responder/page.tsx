
"use client";

import { useState } from "react";
import Image from "next/image";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Map as MapIcon, 
  Users, 
  Settings, 
  AlertCircle,
  Check,
  X,
  Navigation,
  Clock,
  ShieldCheck,
  User,
  LayoutDashboard,
  LogOut,
  Hospital,
  Activity,
  Maximize2,
  Layers,
  Search,
  Truck
} from "lucide-react";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";

export default function ResponderDashboard() {
  const [activeTab, setActiveTab] = useState<'reports' | 'map' | 'units'>('reports');
  const db = useFirestore();

  const reportsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "emergency_reports"), orderBy("reportTime", "desc"), limit(20));
  }, [db]);

  const { data: realReports, isLoading: isReportsLoading } = useCollection(reportsQuery);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-cairo" dir="rtl">
      {/* Premium Admin Header */}
      <header className="bg-white border-b border-slate-100 p-4 flex justify-between items-center sticky top-0 z-50 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-[10px] flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Hospital className="w-5 h-5" />
          </div>
          <div className="text-right">
            <h1 className="font-bold text-[13px] text-slate-800 leading-none">مركز القيادة الموحد</h1>
            <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-widest">مستشفى ابن سينا - المكلا</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer group">
            <div className="p-2.5 bg-slate-50 rounded-[10px] group-hover:bg-slate-100 transition-colors border border-slate-100">
              <Bell className="w-4 h-4 text-slate-500" />
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-bold border-2 border-white">
              {realReports?.length || 0}
            </span>
          </div>
          <div className="w-10 h-10 rounded-[10px] overflow-hidden border border-slate-100 shadow-sm relative">
            <Image src="https://picsum.photos/seed/admin-user/200/200" alt="Admin" fill className="object-cover" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Modern Sidebar */}
        <aside className="w-16 sm:w-64 bg-white border-l border-slate-100 flex flex-col p-3 gap-2 z-40">
          <div className="space-y-1">
            {[
              { id: 'reports', label: 'البلاغات النشطة', icon: LayoutDashboard },
              { id: 'map', label: 'خريطة السيطرة', icon: MapIcon },
              { id: 'units', label: 'وحدات الإسعاف', icon: Truck }
            ].map((item) => (
              <Button 
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"} 
                className={`w-full justify-start gap-3 h-11 rounded-[10px] text-[11px] font-bold ${activeTab === item.id ? 'bg-slate-900 shadow-lg' : 'text-slate-500'}`}
                onClick={() => setActiveTab(item.id as any)}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-auto space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 rounded-[10px] text-slate-400 text-[11px] font-bold">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">الإعدادات</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 rounded-[10px] text-rose-400 text-[11px] font-bold">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">خروج</span>
            </Button>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-50/50">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
               <div>
                 <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                   <div className="w-1 h-4 bg-primary rounded-full"></div>
                   {activeTab === 'reports' ? 'متابعة البلاغات الحية' : activeTab === 'map' ? 'خريطة المكلا الحية' : 'توزيع الوحدات'}
                 </h2>
                 <p className="text-[10px] text-slate-400 font-bold mt-0.5">تحديث تلقائي من السحابة كل 5 ثوانٍ</p>
               </div>
               <div className="flex items-center gap-2">
                 <Badge variant="outline" className="bg-white border-slate-200 text-slate-500 font-bold h-8 px-3 rounded-[10px] text-[9px]">
                   <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-2"></span>
                   24 سيارة نشطة
                 </Badge>
               </div>
            </div>

            {activeTab === 'map' ? (
              <Card className="overflow-hidden border-none shadow-soft aspect-[16/9] relative rounded-[10px] bg-slate-900">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=49.05,14.50,49.20,14.60&amp;layer=mapnik"
                  className="grayscale-[0.2] contrast-[1.1]"
                ></iframe>
                
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {/* Map Tools */}
                  {[Maximize2, Layers, Search].map((Icon, idx) => (
                    <button key={idx} className="w-9 h-9 bg-white/95 backdrop-blur shadow-lg rounded-[10px] flex items-center justify-center text-slate-600 active-scale border border-white/20">
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>

                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-[10px] shadow-xl border border-white/20 w-64 space-y-3">
                  <h4 className="font-bold text-[11px] border-b border-slate-100 pb-2 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    تغطية حضرموت
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[9px] font-bold">
                      <span className="text-slate-500">دقة الـ GPS:</span>
                      <span className="text-green-600">عالية جداً</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] font-bold">
                      <span className="text-slate-500">زمن الاستجابة:</span>
                      <span className="text-primary">4.2 دقيقة</span>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {isReportsLoading ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-3 opacity-30">
                    <Activity className="w-8 h-8 animate-pulse text-primary" />
                    <p className="text-[11px] font-bold">جاري مزامنة البلاغات...</p>
                  </div>
                ) : realReports?.map((report) => (
                  <Card key={report.id} className="overflow-hidden border-none shadow-soft bg-white hover:ring-2 ring-primary/5 transition-all rounded-[10px]">
                    <div className="flex flex-col sm:flex-row items-center p-4 gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-[10px] flex items-center justify-center shrink-0 border border-slate-100">
                        <AlertCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 text-right space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[12px] font-bold text-slate-800">بلاغ طوارئ #{report.id.slice(-4)}</h3>
                          <Badge className="bg-primary/5 text-primary border-none font-bold text-[8px] h-5 rounded-md">{report.incidentType}</Badge>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          {report.incidentAddress}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 px-6 border-x border-slate-50">
                        <div className="text-center">
                          <p className="text-[8px] text-slate-300 font-bold uppercase">الوقت</p>
                          <p className="text-[10px] font-bold text-slate-600">{new Date(report.reportTime).toLocaleTimeString('ar-SA')}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[8px] text-slate-300 font-bold uppercase">الحالة</p>
                          <Badge variant="outline" className="text-[8px] font-bold border-accent/20 text-accent h-5">قيد التنفيذ</Badge>
                        </div>
                      </div>
                      <Button className="h-10 px-6 bg-slate-900 hover:bg-slate-800 text-[11px] font-bold rounded-[10px] active-scale">عرض التفاصيل</Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
