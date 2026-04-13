
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
  Search
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
      <header className="bg-white border-b border-slate-100 p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Hospital className="w-5 h-5" />
          </div>
          <div className="hidden sm:block text-right">
            <h1 className="font-black text-sm text-slate-800 leading-none">مركز العمليات الموحد</h1>
            <p className="text-[9px] text-slate-400 font-black mt-1 uppercase tracking-widest">Ibn Sina Hospital - Mukalla</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer group">
            <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5 text-slate-500" />
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-black border-2 border-white">
              {realReports?.length || 0}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
            <Image src="https://picsum.photos/seed/admin-user/200/200" alt="Admin" width={40} height={40} className="object-cover" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Modern Sidebar */}
        <aside className="w-20 sm:w-64 bg-white border-l border-slate-100 flex flex-col p-4 gap-2 z-40">
          <div className="space-y-1.5">
            <Button 
              variant={activeTab === 'reports' ? "default" : "ghost"} 
              className={`w-full justify-start gap-3 h-12 rounded-xl text-xs font-black ${activeTab === 'reports' ? 'bg-slate-900' : 'text-slate-500'}`}
              onClick={() => setActiveTab('reports')}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">البلاغات النشطة</span>
            </Button>
            <Button 
              variant={activeTab === 'map' ? "default" : "ghost"} 
              className={`w-full justify-start gap-3 h-12 rounded-xl text-xs font-black ${activeTab === 'map' ? 'bg-slate-900' : 'text-slate-500'}`}
              onClick={() => setActiveTab('map')}
            >
              <MapIcon className="w-4 h-4" />
              <span className="hidden sm:inline">خريطة السيطرة</span>
            </Button>
            <Button 
              variant={activeTab === 'units' ? "default" : "ghost"} 
              className={`w-full justify-start gap-3 h-12 rounded-xl text-xs font-black ${activeTab === 'units' ? 'bg-slate-900' : 'text-slate-500'}`}
              onClick={() => setActiveTab('units')}
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">وحدات الإسعاف</span>
            </Button>
          </div>
          
          <div className="mt-auto space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl text-slate-400 text-xs font-black">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">الإعدادات</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl text-rose-400 text-xs font-black">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </Button>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-6 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {activeTab === 'map' ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                    <div className="w-1 h-5 bg-primary rounded-full"></div>
                    خريطة السيطرة والتحكم (المكلا)
                  </h2>
                  <Badge variant="outline" className="bg-white border-slate-200 text-slate-500 font-black h-8 px-4 rounded-xl">24 سيارة إسعاف متصلة</Badge>
                </div>

                <Card className="overflow-hidden border-none shadow-2xl aspect-[16/9] relative rounded-[3rem] bg-slate-900 group">
                  {/* Real Interactive Map using OpenStreetMap */}
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://www.openstreetmap.org/export/embed.html?bbox=49.05,14.50,49.20,14.60&amp;layer=mapnik"
                    className="grayscale-[0.3] contrast-[1.2]"
                  ></iframe>
                  
                  {/* Real-time Map Overlays */}
                  <div className="absolute top-8 left-8 flex flex-col gap-3">
                    <button className="w-12 h-12 bg-white shadow-2xl rounded-2xl flex items-center justify-center text-slate-600 active-scale">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 bg-white shadow-2xl rounded-2xl flex items-center justify-center text-slate-600 active-scale">
                      <Layers className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 bg-white shadow-2xl rounded-2xl flex items-center justify-center text-slate-600 active-scale">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Dynamic Incident Markers Overlay */}
                  {realReports?.map((report, idx) => (
                    <div 
                      key={report.id} 
                      className="absolute group cursor-pointer" 
                      style={{ top: `${20 + (idx * 8)}%`, left: `${30 + (idx * 12)}%` }}
                    >
                      <div className="absolute -inset-6 bg-primary/20 rounded-full animate-ping"></div>
                      <div className="w-8 h-8 bg-primary rounded-full border-[3px] border-white shadow-2xl relative z-10 flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  ))}

                  {/* Map Status Overlay */}
                  <div className="absolute bottom-10 right-10 bg-white/95 backdrop-blur-md p-6 rounded-[2.5rem] shadow-2xl border border-white/40 w-72 space-y-4">
                    <h4 className="font-black text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      حالة الاتصال بالخرائط
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-slate-500">تغطية GPS:</span>
                        <span className="text-green-600">ممتازة (98%)</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full h-10 rounded-xl text-[10px] font-black border-slate-100">تحميل بيانات المنطقة</Button>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <Card className="border-none shadow-sm rounded-3xl p-6 bg-white flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase">نشط الآن</p>
                      <p className="text-xl font-black text-slate-800">{realReports?.length || 0}</p>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  {isReportsLoading ? (
                    <div className="p-20 text-center font-black text-slate-300">جاري الاتصال بالسحابة...</div>
                  ) : realReports?.map((report) => (
                    <Card key={report.id} className="overflow-hidden border-none shadow-sm bg-white hover:ring-2 ring-primary/10 transition-all rounded-[2rem]">
                      <CardContent className="p-0">
                        <div className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                          <div className="flex-1 space-y-3 text-right">
                            <h3 className="text-[13px] font-black text-slate-800">بلاغ طارئ #{report.id.slice(-4)}</h3>
                            <p className="text-[9px] text-slate-400 font-black uppercase">{new Date(report.reportTime).toLocaleString('ar-SA')}</p>
                          </div>
                          <div className="flex gap-4 items-center">
                            <Badge className="bg-primary/5 text-primary border-none font-black h-7 px-3 rounded-lg">{report.incidentType}</Badge>
                            <Badge className="bg-slate-100 text-slate-600 border-none font-black h-7 px-3 rounded-lg">{report.incidentAddress}</Badge>
                          </div>
                          <Button className="h-11 px-6 bg-slate-900 text-[11px] font-black rounded-xl">عرض التفاصيل</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
