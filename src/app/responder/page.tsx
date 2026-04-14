
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Bell, 
  Map as MapIcon, 
  MapPin,
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
  Truck,
  Loader2,
  Droplet,
  Pill,
  Phone,
  Calendar,
  ChevronLeft
} from "lucide-react";
import { useFirestore, useCollection, useMemoFirebase, useUser, signOutUser, useAuth } from "@/firebase";

// بيانات بلاغات وهمية احترافية ومفصلة
const MOCK_REPORTS = [
  {
    id: "REP-9921",
    reporterName: "فاطمة أحمد باوزير",
    type: "إغماء مفاجئ",
    category: "حرجة جداً",
    status: "EnRoute",
    time: "منذ 4 دقائق",
    location: "المكلا - حي فوة - المساكن",
    coordinates: [14.5322, 49.1145],
    medicalProfile: {
      age: 22,
      gender: "أنثى",
      bloodType: "O+",
      chronicDiseases: ["فقر الدم الحاد", "هبوط ضغط مزمن"],
      medications: ["مكملات حديد", "فيتامين B12"],
      allergies: ["البنسلين"],
      phone: "0533445566"
    }
  },
  {
    id: "REP-9922",
    reporterName: "مريم علي العمودي",
    type: "أزمة تنفسية",
    category: "متوسطة",
    status: "Pending",
    time: "منذ 10 دقائق",
    location: "المكلا - الديس - شارع الغويزي",
    coordinates: [14.5455, 49.1322],
    medicalProfile: {
      age: 20,
      gender: "أنثى",
      bloodType: "A-",
      chronicDiseases: ["الربو الشعبي"],
      medications: ["بخاخ فنتولين عند اللزوم"],
      allergies: ["الغبار", "بعض الروائح العطرية"],
      phone: "0544556677"
    }
  },
  {
    id: "REP-9923",
    reporterName: "سارة محمد الكثيري",
    type: "حادث سير",
    category: "حرجة",
    status: "Arrived",
    time: "منذ 15 دقيقة",
    location: "المكلا - شارع الستين - قرب الجسر",
    coordinates: [14.5288, 49.1099],
    medicalProfile: {
      age: 21,
      gender: "أنثى",
      bloodType: "B+",
      chronicDiseases: ["لا يوجد"],
      medications: ["لا يوجد"],
      allergies: ["لا يوجد"],
      phone: "0511223344"
    }
  }
];

// بيانات وحدات الإسعاف
const AMBULANCE_UNITS = [
  { id: "AMB-01", status: "نشطة", location: "خور المكلا", crew: "د. خالد / م. محمد", battery: "95%" },
  { id: "AMB-02", status: "في مهمة", location: "الديس", crew: "د. سالم / م. فهد", battery: "80%" },
  { id: "AMB-03", status: "متاحة", location: "مستشفى ابن سينا", crew: "د. هاني / م. أحمد", battery: "100%" },
];

export default function ResponderDashboard() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [activeTab, setActiveTab] = useState<'reports' | 'map' | 'units'>('reports');
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/auth");
    }
  }, [user, isUserLoading, router]);

  const handleLogout = () => {
    signOutUser(auth);
    router.push("/auth");
  };

  if (isUserLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-6 h-6 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-cairo" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 p-4 flex justify-between items-center sticky top-0 z-50 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-[10px] flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Hospital className="w-5 h-5" />
          </div>
          <div className="text-right">
            <h1 className="font-bold text-[13px] text-slate-800 leading-none">مركز السيطرة الموحد</h1>
            <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-widest">إقليم حضرموت - قطاع المكلا</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100 font-bold h-8 px-3 rounded-[10px] text-[9px] hidden sm:flex">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-2"></span>
            النظام متصل
          </Badge>
          <div className="w-10 h-10 rounded-[10px] overflow-hidden border border-slate-100 shadow-sm relative">
            <Image src="https://picsum.photos/seed/admin-user/200/200" alt="Admin" fill className="object-cover" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-16 sm:w-64 bg-white border-l border-slate-100 flex flex-col p-3 gap-2 z-40">
          <div className="space-y-1">
            {[
              { id: 'reports', label: 'البلاغات الميدانية', icon: LayoutDashboard },
              { id: 'map', label: 'خرائط المكلا الحية', icon: MapIcon },
              { id: 'units', label: 'توزيع الوحدات', icon: Truck }
            ].map((item) => (
              <Button 
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"} 
                className={`w-full justify-start gap-3 h-11 rounded-[10px] text-[11px] font-bold ${activeTab === item.id ? 'bg-slate-900 shadow-lg text-white' : 'text-slate-500'}`}
                onClick={() => setActiveTab(item.id as any)}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-auto space-y-1">
            <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-3 h-11 rounded-[10px] text-rose-500 text-[11px] font-bold">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </Button>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-50/50">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2 px-1">
                  <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full"></div>
                    قائمة الحالات النشطة
                  </h2>
                  <Badge className="bg-primary/10 text-primary border-none text-[9px] font-bold">{MOCK_REPORTS.length} بلاغات قيد المعالجة</Badge>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {MOCK_REPORTS.map((report) => (
                    <Card key={report.id} className="border-none shadow-soft bg-white hover:ring-1 ring-primary/20 transition-all rounded-[10px] overflow-hidden">
                      <div className="flex flex-col sm:flex-row items-center p-4 gap-4">
                        <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 border ${report.category === 'حرجة جداً' ? 'bg-rose-50 border-rose-100' : 'bg-orange-50 border-orange-100'}`}>
                          <AlertCircle className={`w-6 h-6 ${report.category === 'حرجة جداً' ? 'text-rose-500 animate-pulse' : 'text-orange-500'}`} />
                        </div>
                        
                        <div className="flex-1 text-right space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-[12px] font-bold text-slate-800">{report.reporterName}</h3>
                            <Badge className="bg-slate-100 text-slate-500 border-none font-bold text-[8px] h-5">{report.type}</Badge>
                            <Badge className={`${report.category === 'حرجة جداً' ? 'bg-rose-500 text-white' : 'bg-orange-500 text-white'} border-none font-bold text-[8px] h-5`}>{report.category}</Badge>
                          </div>
                          <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-primary" />
                            {report.location}
                          </p>
                        </div>

                        <div className="hidden md:flex items-center gap-6 px-6 border-x border-slate-50">
                          <div className="text-center">
                            <p className="text-[8px] text-slate-300 font-bold uppercase">الزمن</p>
                            <p className="text-[10px] font-bold text-slate-600">{report.time}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[8px] text-slate-300 font-bold uppercase">الحالة</p>
                            <Badge variant="outline" className={`text-[8px] font-bold h-5 ${report.status === 'Pending' ? 'text-orange-500 border-orange-100' : 'text-green-500 border-green-100'}`}>
                              {report.status === 'Pending' ? 'قيد الانتظار' : 'في الطريق'}
                            </Badge>
                          </div>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button onClick={() => setSelectedReport(report)} className="h-10 px-6 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-[10px] active-scale">عرض الملف الطبي</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md rounded-[10px] font-cairo" dir="rtl">
                            <DialogHeader>
                              <DialogTitle className="text-right text-md font-bold flex items-center gap-2 border-b pb-3">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                السجل الطبي الرقمي للبلاغ
                              </DialogTitle>
                            </DialogHeader>
                            {selectedReport && (
                              <div className="space-y-6 pt-4">
                                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-[10px]">
                                  <div className="w-14 h-14 bg-white rounded-full border-2 border-primary/20 overflow-hidden relative">
                                    <Image src={`https://picsum.photos/seed/${selectedReport.id}/200/200`} alt="Avatar" fill className="object-cover" />
                                  </div>
                                  <div className="text-right">
                                    <h4 className="font-bold text-[13px] text-slate-900">{selectedReport.reporterName}</h4>
                                    <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                                      <Phone className="w-3 h-3" /> {selectedReport.medicalProfile.phone}
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div className="bg-slate-50 p-3 rounded-[10px] border border-slate-100">
                                    <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">العمر / الجنس</p>
                                    <p className="text-[11px] font-bold text-slate-800">{selectedReport.medicalProfile.age} سنة - {selectedReport.medicalProfile.gender}</p>
                                  </div>
                                  <div className="bg-rose-50 p-3 rounded-[10px] border border-rose-100">
                                    <p className="text-[9px] text-rose-400 font-bold uppercase mb-1">فصيلة الدم</p>
                                    <p className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
                                      <Droplet className="w-3 h-3" /> {selectedReport.medicalProfile.bloodType}
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <h5 className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 px-1">
                                    <Activity className="w-3 h-3 text-blue-500" /> التاريخ المرضي
                                  </h5>
                                  <div className="bg-white border border-slate-100 rounded-[10px] p-4 space-y-3 shadow-sm">
                                    <div className="flex items-start gap-3">
                                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                                      <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-800">الأمراض المزمنة:</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {selectedReport.medicalProfile.chronicDiseases.map((d: any) => (
                                            <Badge key={d} className="bg-blue-50 text-blue-600 border-none text-[8px]">{d}</Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <Pill className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                                      <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-800">الأدوية الحالية:</p>
                                        <p className="text-[10px] text-slate-500 font-bold mt-0.5">{selectedReport.medicalProfile.medications.join("، ")}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <X className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                                      <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-800 text-rose-600">الحساسية:</p>
                                        <p className="text-[10px] text-slate-500 font-bold mt-0.5">{selectedReport.medicalProfile.allergies.join("، ")}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-2">
                                  <Button className="w-full h-11 bg-primary text-white font-bold rounded-[10px] gap-2 active-scale text-[11px]">
                                    <Navigation className="w-4 h-4" />
                                    توجيه أقرب وحدة إسعاف فوراً
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Map Tab */}
            {activeTab === 'map' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                   <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                     <div className="w-1 h-4 bg-primary rounded-full"></div>
                     خريطة السيطرة والانتشار
                   </h2>
                   <div className="flex gap-2">
                      <Badge className="bg-green-500 text-white border-none text-[8px]">وحدات نشطة: 12</Badge>
                      <Badge className="bg-rose-500 text-white border-none text-[8px]">بلاغات حرجة: 3</Badge>
                   </div>
                </div>
                
                <Card className="overflow-hidden border-none shadow-soft aspect-[16/9] relative rounded-[10px] bg-slate-900 border border-slate-200">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    src="https://www.openstreetmap.org/export/embed.html?bbox=49.05,14.50,49.20,14.60&amp;layer=mapnik"
                    className="grayscale-[0.2] contrast-[1.1] brightness-[1.05]"
                  ></iframe>
                  
                  {/* Simulated Map Markers */}
                  <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-rose-500 rounded-full animate-ping border-2 border-white shadow-lg"></div>
                  <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                  <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {[Maximize2, Layers, Search].map((Icon, idx) => (
                      <button key={idx} className="w-9 h-9 bg-white/95 backdrop-blur shadow-lg rounded-[10px] flex items-center justify-center text-slate-600 active-scale border border-slate-100">
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>

                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-[10px] shadow-xl border border-slate-200 w-64 space-y-3">
                    <h4 className="font-bold text-[11px] border-b border-slate-100 pb-2 flex items-center gap-2 text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      إحصائيات التغطية الحالية
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[9px] font-bold">
                        <span className="text-slate-500">منطقة المكلا:</span>
                        <span className="text-green-600">تغطية كاملة</span>
                      </div>
                      <div className="flex items-center justify-between text-[9px] font-bold">
                        <span className="text-slate-500">متوسط زمن الاستجابة:</span>
                        <span className="text-primary">5.5 دقيقة</span>
                      </div>
                      <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[85%]"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Units Tab */}
            {activeTab === 'units' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full"></div>
                    إدارة أسطول الإسعاف
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {AMBULANCE_UNITS.map((unit) => (
                    <Card key={unit.id} className="border-none shadow-soft bg-white rounded-[10px] p-5 space-y-4 hover:shadow-md transition-shadow border border-slate-50">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-slate-50 rounded-[12px] border border-slate-100">
                          <Truck className="w-5 h-5 text-slate-600" />
                        </div>
                        <Badge className={`${unit.status === 'نشطة' ? 'bg-green-500' : unit.status === 'في مهمة' ? 'bg-orange-500' : 'bg-blue-500'} text-white border-none text-[8px] font-bold`}>
                          {unit.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-[13px] font-bold text-slate-800">وحدة {unit.id}</h4>
                        <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {unit.location}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-50 space-y-2">
                        <div className="flex justify-between text-[9px] font-bold">
                          <span className="text-slate-400">الطاقم:</span>
                          <span className="text-slate-700">{unit.crew}</span>
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-bold">
                          <span className="text-slate-400">مستوى الوقود/البطارية:</span>
                          <span className="text-green-600">{unit.battery}</span>
                        </div>
                        <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden mt-1">
                          <div className="h-full bg-green-500" style={{ width: unit.battery }}></div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full h-9 rounded-[10px] text-[10px] font-bold border-slate-100 text-slate-500 active-scale">إدارة الوحدة</Button>
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

