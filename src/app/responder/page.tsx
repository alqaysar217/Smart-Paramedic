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
  Phone
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ResponderDashboard() {
  const [activeTab, setActiveTab] = useState<'reports' | 'map' | 'units'>('reports');
  const mapImg = PlaceHolderImages.find(i => i.id === "map-placeholder");

  const reports = [
    { id: "#8821", name: "محمد أحمد", type: "حادث مروري", status: "نشط", time: "3 دقائق", blood: "O+", phone: "05xxxxxx" },
    { id: "#8820", name: "سارة خالد", type: "إغماء مفاجئ", status: "بانتظار الرد", time: "8 دقائق", blood: "A-", phone: "05xxxxxx" },
    { id: "#8819", name: "خالد سعيد", type: "حريق مبنى", status: "نشط", time: "12 دقيقة", blood: "B+", phone: "05xxxxxx" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:max-w-none">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <h1 className="font-headline font-bold text-xl hidden sm:block">لوحة تحكم المستشفى - المسعف الذكي</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-500" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold">2</span>
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
            <Image src="https://picsum.photos/seed/admin/100/100" alt="Admin" width={40} height={40} />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-20 sm:w-64 bg-white border-l border-gray-200 flex flex-col p-4 gap-2">
          <Button 
            variant={activeTab === 'reports' ? "default" : "ghost"} 
            className={`justify-start gap-3 h-12 rounded-xl ${activeTab === 'reports' ? 'bg-primary' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <AlertCircle className="w-5 h-5" />
            <span className="hidden sm:inline">البلاغات النشطة</span>
          </Button>
          <Button 
            variant={activeTab === 'map' ? "default" : "ghost"} 
            className={`justify-start gap-3 h-12 rounded-xl ${activeTab === 'map' ? 'bg-primary' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <MapIcon className="w-5 h-5" />
            <span className="hidden sm:inline">خريطة الحالات</span>
          </Button>
          <Button 
            variant={activeTab === 'units' ? "default" : "ghost"} 
            className={`justify-start gap-3 h-12 rounded-xl ${activeTab === 'units' ? 'bg-primary' : ''}`}
            onClick={() => setActiveTab('units')}
          >
            <Users className="w-5 h-5" />
            <span className="hidden sm:inline">إدارة الفرق</span>
          </Button>
          <div className="mt-auto">
            <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl text-gray-400">
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">الإعدادات</span>
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold">بلاغات نشطة</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold">حالات مكتملة</p>
                    <p className="text-2xl font-bold">148</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold">سيارات نشطة</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {activeTab === 'reports' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-headline">البلاغات الواردة</h2>
                <div className="grid grid-cols-1 gap-4">
                  {reports.map((report) => (
                    <Card key={report.id} className="overflow-hidden border-none shadow-md bg-white hover:ring-2 ring-primary/20 transition-all">
                      <CardContent className="p-0">
                        <div className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-bold">{report.name}</h3>
                              <Badge variant="outline" className="font-bold text-gray-400">{report.id}</Badge>
                              <Badge className={report.status === "نشط" ? "bg-accent" : "bg-orange-500"}>{report.status}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500">
                              <span className="flex items-center gap-1"><AlertCircle className="w-4 h-4 text-primary" /> {report.type}</span>
                              <span className="flex items-center gap-1"><Droplet className="w-4 h-4 text-primary" /> فصيلة: {report.blood}</span>
                              <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {report.phone}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button className="flex-1 sm:flex-none h-12 bg-accent hover:bg-accent/90 gap-2">
                              <Check className="w-5 h-5" /> قبول
                            </Button>
                            <Button variant="outline" className="flex-1 sm:flex-none h-12 border-red-100 text-red-600 hover:bg-red-50 gap-2">
                              <X className="w-5 h-5" /> رفض
                            </Button>
                            <Button variant="ghost" className="flex-1 sm:flex-none h-12 bg-gray-50 rounded-xl">
                              <Navigation className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'map' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-headline">خريطة البلاغات المباشرة</h2>
                <Card className="overflow-hidden border-none shadow-xl aspect-video relative">
                  {mapImg && (
                    <Image
                      src={mapImg.imageUrl}
                      alt="Live Tracking Map"
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 w-64 space-y-3">
                    <h4 className="font-bold border-b border-gray-100 pb-2">أسطورة الخريطة</h4>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-3 h-3 bg-primary rounded-full animate-ping"></div>
                      <span>بلاغ حادث نشط</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>سيارة إسعاف (متاح)</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span>سيارة إسعاف (مشغول)</span>
                    </div>
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