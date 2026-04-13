
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Droplet,
  Phone,
  LayoutDashboard,
  LogOut,
  Hospital,
  Activity,
  Heart,
  Clock,
  ShieldCheck,
  User
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ResponderDashboard() {
  const [activeTab, setActiveTab] = useState<'reports' | 'map' | 'units'>('reports');
  const mapImg = PlaceHolderImages.find(i => i.id === "map-placeholder");

  const reports = [
    { id: "#8821", name: "نجد مسيعان", type: "حادث مروري", status: "نشط", time: "منذ 3 دقائق", blood: "O+", phone: "05xxxxxx", location: "المكلا - فوة" },
    { id: "#8820", name: "عصبان نسيب", type: "إغماء مفاجئ", status: "بانتظار الرد", time: "منذ 8 دقائق", blood: "A-", phone: "05xxxxxx", location: "سيئون - السوق" },
    { id: "#8819", name: "رغد بلعفير", type: "حريق مبنى", status: "نشط", time: "منذ 12 دقيقة", blood: "B+", phone: "05xxxxxx", location: "الشحر - الميناء" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-cairo" dir="rtl">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Hospital className="w-7 h-7" />
          </div>
          <div className="hidden sm:block text-right">
            <h1 className="font-black text-xl text-gray-900 leading-none">لوحة تحكم الطوارئ</h1>
            <p className="text-xs text-gray-500 font-bold mt-1">مستشفى ابن سينا التعليمي – المكلا</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-end hidden md:block text-right">
            <span className="text-sm font-bold">د. أحمد بن عمر باعباد</span>
            <span className="text-[10px] text-accent font-black">مدير النوبة (طوارئ) - متاح</span>
          </div>
          <div className="relative cursor-pointer">
            <div className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell className="w-6 h-6 text-gray-500" />
            </div>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white">2</span>
          </div>
          <div className="w-12 h-12 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
            <Image src="https://picsum.photos/seed/admin/200/200" alt="Admin" width={48} height={48} className="object-cover" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-24 sm:w-72 bg-white border-l border-gray-200 flex flex-col p-6 gap-3 z-30 shadow-sm">
          <div className="mb-6 px-2">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-4">القائمة الرئيسية</p>
            <div className="space-y-2">
              <Button 
                variant={activeTab === 'reports' ? "default" : "ghost"} 
                className={`w-full justify-start gap-4 h-14 rounded-2xl ${activeTab === 'reports' ? 'bg-primary shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-primary/5 hover:text-primary'}`}
                onClick={() => setActiveTab('reports')}
              >
                <LayoutDashboard className="w-6 h-6" />
                <span className="hidden sm:inline font-black">البلاغات النشطة</span>
              </Button>
              <Button 
                variant={activeTab === 'map' ? "default" : "ghost"} 
                className={`w-full justify-start gap-4 h-14 rounded-2xl ${activeTab === 'map' ? 'bg-primary shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-primary/5 hover:text-primary'}`}
                onClick={() => setActiveTab('map')}
              >
                <MapIcon className="w-6 h-6" />
                <span className="hidden sm:inline font-black">خريطة الحالات</span>
              </Button>
              <Button 
                variant={activeTab === 'units' ? "default" : "ghost"} 
                className={`w-full justify-start gap-4 h-14 rounded-2xl ${activeTab === 'units' ? 'bg-primary shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-primary/5 hover:text-primary'}`}
                onClick={() => setActiveTab('units')}
              >
                <Users className="w-6 h-6" />
                <span className="hidden sm:inline font-black">إدارة الفرق</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-auto space-y-2 px-2">
            <Button variant="ghost" className="w-full justify-start gap-4 h-14 rounded-2xl text-gray-400 hover:text-red-600 hover:bg-red-50">
              <Settings className="w-6 h-6" />
              <span className="hidden sm:inline font-black">الإعدادات</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-4 h-14 rounded-2xl text-gray-400 hover:text-red-600 hover:bg-red-50">
              <LogOut className="w-6 h-6" />
              <span className="hidden sm:inline font-black">خروج</span>
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 sm:p-10">
          <div className="max-w-7xl mx-auto space-y-10">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white group hover:shadow-xl transition-all">
                <CardContent className="p-8 flex items-center gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-black">بلاغات نشطة</p>
                    <p className="text-3xl font-black text-gray-900">12</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white group hover:shadow-xl transition-all">
                <CardContent className="p-8 flex items-center gap-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-black">حالات مكتملة</p>
                    <p className="text-3xl font-black text-gray-900">148</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white group hover:shadow-xl transition-all">
                <CardContent className="p-8 flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <Navigation className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-black">سيارات نشطة</p>
                    <p className="text-3xl font-black text-gray-900">8</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white group hover:shadow-xl transition-all">
                <CardContent className="p-8 flex items-center gap-6">
                  <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-black">متوسط الاستجابة</p>
                    <p className="text-3xl font-black text-gray-900">7.2 <span className="text-sm font-bold">د</span></p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {activeTab === 'reports' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                    <Activity className="w-8 h-8 text-primary" />
                    البلاغات الواردة (حضرموت)
                  </h2>
                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl font-bold bg-white h-12">تصفية</Button>
                    <Button variant="outline" className="rounded-xl font-bold bg-white h-12 text-primary border-primary/20">تحديث تلقائي</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {reports.map((report) => (
                    <Card key={report.id} className="overflow-hidden border-none shadow-sm bg-white hover:ring-2 ring-primary/20 transition-all rounded-[2rem]">
                      <CardContent className="p-0">
                        <div className="p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                          <div className="flex-1 space-y-4 text-right">
                            <div className="flex items-center gap-4 justify-start">
                              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                                <User className="w-7 h-7" />
                              </div>
                              <div>
                                <h3 className="text-xl font-black text-gray-900">{report.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="font-bold text-gray-400 rounded-lg">{report.id}</Badge>
                                  <Badge className={report.status === "نشط" ? "bg-accent rounded-lg" : "bg-orange-500 rounded-lg"}>{report.status}</Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-500 justify-start">
                              <span className="flex items-center gap-2 p-2 bg-red-50 rounded-xl text-primary"><AlertCircle className="w-4 h-4" /> {report.type}</span>
                              <span className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl"><Droplet className="w-4 h-4 text-primary" /> فصيلة: {report.blood}</span>
                              <span className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl"><Navigation className="w-4 h-4 text-blue-500" /> {report.location}</span>
                              <span className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl"><Phone className="w-4 h-4 text-green-500" /> {report.phone}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <p className="text-xs font-black text-gray-400 mb-2 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {report.time}
                            </p>
                            <div className="flex items-center gap-3 w-full lg:w-auto">
                              <Button className="flex-1 lg:flex-none h-14 bg-accent hover:bg-accent/90 gap-3 px-8 rounded-2xl shadow-lg shadow-accent/10">
                                <Check className="w-5 h-5" /> قبول وتوجيه
                              </Button>
                              <Button variant="outline" className="flex-1 lg:flex-none h-14 border-red-100 text-red-600 hover:bg-red-50 gap-3 px-8 rounded-2xl">
                                <X className="w-5 h-5" /> رفض
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'map' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                  <MapIcon className="w-8 h-8 text-primary" />
                  خريطة البلاغات الحية (المكلا)
                </h2>
                <Card className="overflow-hidden border-none shadow-2xl aspect-video relative rounded-[3rem]">
                  {mapImg && (
                    <Image
                      src={mapImg.imageUrl}
                      alt="Live Tracking Map"
                      fill
                      className="object-cover"
                    />
                  )}
                  {/* Map Overlay Markers */}
                  <div className="absolute top-1/3 left-1/4 group cursor-pointer">
                    <div className="absolute -inset-4 bg-primary/30 rounded-full animate-ping"></div>
                    <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-xl relative z-10"></div>
                  </div>
                  
                  <div className="absolute bottom-10 right-10 bg-white/95 backdrop-blur p-6 rounded-[2rem] shadow-2xl border border-white/20 w-80 space-y-4">
                    <h4 className="font-black text-lg border-b border-gray-100 pb-3 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      توضيح الخريطة
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm font-bold">
                        <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-sm"></div>
                        <span className="text-gray-700">بلاغ حادث نشط</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold">
                        <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
                        <span className="text-gray-700">سيارة إسعاف (متاح)</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold">
                        <div className="w-4 h-4 bg-gray-400 rounded-full shadow-sm"></div>
                        <span className="text-gray-700">سيارة إسعاف (مشغول)</span>
                      </div>
                    </div>
                    <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20 rounded-xl font-black h-12">
                      إظهار كافة الوحدات
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
