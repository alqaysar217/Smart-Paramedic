
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Button 
} from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Badge 
} from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  ChevronLeft,
  Trash2,
  Eye,
  History
} from "lucide-react";
import { useAuth, useUser, signOutUser } from "@/firebase";

const MOCK_REPORTS = [
  {
    id: "REP-9921",
    reporterName: "فاطمة أحمد باوزير",
    type: "إغماء مفاجئ",
    category: "حرجة جداً",
    status: "EnRoute",
    time: "منذ 4 دقائق",
    location: "المكلا - حي فوة - المساكن",
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

const AMBULANCE_UNITS = [
  { id: "AMB-01", status: "نشطة", location: "خور المكلا", crew: "د. خالد / م. محمد", battery: "95%" },
  { id: "AMB-02", status: "في مهمة", location: "الديس", crew: "د. سالم / م. فهد", battery: "80%" },
  { id: "AMB-03", status: "متاحة", location: "مستشفى ابن سينا", crew: "د. هاني / م. أحمد", battery: "100%" },
];

export default function ResponderDashboard() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [activeTab, setActiveTab] = useState<'reports' | 'map' | 'units' | 'history'>('reports');
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
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-cairo" dir="rtl">
      {/* Header - Full Width */}
      <header className="bg-white border-b border-slate-100 p-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-[12px] flex items-center justify-center text-white shadow-xl shadow-primary/20">
            <Hospital className="w-6 h-6" />
          </div>
          <div className="text-right">
            <h1 className="font-bold text-[16px] text-slate-800 leading-tight">مركز السيطرة والعمليات الموحد</h1>
            <p className="text-[10px] text-slate-400 font-black mt-1 uppercase tracking-[0.2em]">حضرموت - إدارة الأزمات والطوارئ</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-[10px] border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[11px] font-bold text-green-700">اتصال النظام مستقر</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-left">
                <p className="text-[11px] font-bold text-slate-800">مشرف العمليات</p>
                <p className="text-[9px] text-slate-400 font-bold">النوبة المسائية</p>
             </div>
             <div className="w-11 h-11 rounded-[12px] overflow-hidden border-2 border-slate-100 relative shadow-sm">
                <Image src="https://picsum.photos/seed/admin-hq/200/200" alt="Admin" fill className="object-cover" />
             </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Desktop Focused */}
        <aside className="w-64 bg-white border-l border-slate-100 flex flex-col p-4 gap-2 z-40">
          <div className="space-y-1.5">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 px-3">التحكم الميداني</p>
            {[
              { id: 'reports', label: 'البلاغات النشطة', icon: LayoutDashboard },
              { id: 'map', label: 'خرائط السيطرة', icon: MapIcon },
              { id: 'units', label: 'إدارة الأسطول', icon: Truck },
              { id: 'history', label: 'أرشيف البلاغات', icon: History }
            ].map((item) => (
              <Button 
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"} 
                className={`w-full justify-start gap-3 h-12 rounded-[12px] text-[12px] font-bold transition-all ${activeTab === item.id ? 'bg-slate-900 shadow-xl text-white translate-x-1' : 'text-slate-500 hover:bg-slate-50'}`}
                onClick={() => setActiveTab(item.id as any)}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-auto pt-6 border-t border-slate-50">
            <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-3 h-12 rounded-[12px] text-rose-500 text-[12px] font-bold hover:bg-rose-50 hover:text-rose-600 transition-colors">
              <LogOut className="w-5 h-5" />
              <span>تسجيل الخروج</span>
            </Button>
          </div>
        </aside>

        {/* Main Content Area - Laptop Optimized */}
        <main className="flex-1 overflow-auto bg-slate-50/30 p-8">
          <div className="w-full space-y-8">
            
            {/* Reports Tab - Registry/Table Style */}
            {activeTab === 'reports' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-[20px] font-bold text-slate-900">قائمة البلاغات الحية</h2>
                    <p className="text-[12px] text-slate-400 font-bold">متابعة كافة الطلبات الواردة من الميدان في حضرموت</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-white p-3 rounded-[12px] border border-slate-100 flex items-center gap-4 shadow-sm">
                      <div className="text-center px-4 border-l border-slate-50">
                        <p className="text-[9px] text-slate-300 font-black uppercase">إجمالي الطلبات</p>
                        <p className="text-[18px] font-black text-slate-800">{MOCK_REPORTS.length}</p>
                      </div>
                      <div className="text-center px-4">
                        <p className="text-[9px] text-rose-300 font-black uppercase">حالات حرجة</p>
                        <p className="text-[18px] font-black text-rose-600">3</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Card className="border-none shadow-soft bg-white rounded-[15px] overflow-hidden">
                  <Table className="font-cairo">
                    <TableHeader className="bg-slate-50/50">
                      <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="text-right text-[11px] font-black uppercase text-slate-400 w-[120px]">رقم البلاغ</TableHead>
                        <TableHead className="text-right text-[11px] font-black uppercase text-slate-400">المستخدم</TableHead>
                        <TableHead className="text-right text-[11px] font-black uppercase text-slate-400">نوع الحالة</TableHead>
                        <TableHead className="text-right text-[11px] font-black uppercase text-slate-400">الموقع</TableHead>
                        <TableHead className="text-right text-[11px] font-black uppercase text-slate-400">الحالة</TableHead>
                        <TableHead className="text-center text-[11px] font-black uppercase text-slate-400 w-[180px]">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {MOCK_REPORTS.map((report) => (
                        <TableRow key={report.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <TableCell className="font-bold text-[12px] text-slate-600">{report.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-[10px] overflow-hidden border border-slate-100 relative">
                                <Image src={`https://picsum.photos/seed/${report.id}/100/100`} alt="Avatar" fill className="object-cover" />
                              </div>
                              <div>
                                <p className="text-[12px] font-bold text-slate-800">{report.reporterName}</p>
                                <p className="text-[9px] text-slate-400 font-bold">{report.medicalProfile.phone}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <span className="text-[12px] font-bold text-slate-700">{report.type}</span>
                              <Badge className={`${report.category === 'حرجة جداً' ? 'bg-rose-500' : 'bg-orange-500'} text-white border-none text-[8px] font-bold h-5 w-fit`}>{report.category}</Badge>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span className="text-[11px] font-bold text-slate-500 truncate">{report.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-[9px] font-bold h-6 ${report.status === 'Pending' ? 'text-orange-500 border-orange-100 bg-orange-50/50' : 'text-green-500 border-green-100 bg-green-50/50'}`}>
                              {report.status === 'Pending' ? 'في الانتظار' : 'جاري التنفيذ'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button onClick={() => setSelectedReport(report)} size="sm" variant="ghost" className="h-9 px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-[10px] gap-2 text-[10px] font-bold active-scale">
                                    <Eye className="w-3.5 h-3.5" /> عرض الطبي
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md rounded-[15px] font-cairo" dir="rtl">
                                  <DialogHeader>
                                    <DialogTitle className="text-right text-md font-bold flex items-center gap-2 border-b pb-4">
                                      <ShieldCheck className="w-5 h-5 text-primary" />
                                      الملف الطبي الرقمي الموحد
                                    </DialogTitle>
                                  </DialogHeader>
                                  {selectedReport && (
                                    <div className="space-y-6 pt-4">
                                      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-[12px] border border-slate-100">
                                        <div className="w-16 h-16 bg-white rounded-full border-2 border-primary/20 overflow-hidden relative shadow-sm">
                                          <Image src={`https://picsum.photos/seed/${selectedReport.id}/200/200`} alt="Avatar" fill className="object-cover" />
                                        </div>
                                        <div className="text-right">
                                          <h4 className="font-bold text-[15px] text-slate-900">{selectedReport.reporterName}</h4>
                                          <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1 mt-1">
                                            <Phone className="w-3.5 h-3.5" /> {selectedReport.medicalProfile.phone}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-[12px] border border-slate-100">
                                          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">البيانات الحيوية</p>
                                          <p className="text-[12px] font-bold text-slate-800">{selectedReport.medicalProfile.age} سنة - {selectedReport.medicalProfile.gender}</p>
                                        </div>
                                        <div className="bg-rose-50 p-4 rounded-[12px] border border-rose-100">
                                          <p className="text-[10px] text-rose-400 font-bold uppercase mb-1">فصيلة الدم</p>
                                          <p className="text-[14px] font-black text-rose-700 flex items-center gap-1.5">
                                            <Droplet className="w-4 h-4" /> {selectedReport.medicalProfile.bloodType}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="space-y-4">
                                        <h5 className="text-[11px] font-black text-slate-400 uppercase flex items-center gap-2 px-1">
                                          <Activity className="w-4 h-4 text-blue-500" /> الحالة الصحية والسريرية
                                        </h5>
                                        <div className="bg-white border border-slate-100 rounded-[12px] p-5 space-y-4 shadow-sm">
                                          <div className="flex items-start gap-4">
                                            <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
                                            <div className="text-right">
                                              <p className="text-[11px] font-black text-slate-800">الأمراض المزمنة:</p>
                                              <div className="flex flex-wrap gap-2 mt-2">
                                                {selectedReport.medicalProfile.chronicDiseases.map((d: any) => (
                                                  <Badge key={d} className="bg-blue-50 text-blue-600 border-none text-[9px] font-bold">{d}</Badge>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-4">
                                            <Pill className="w-5 h-5 text-purple-500 shrink-0" />
                                            <div className="text-right">
                                              <p className="text-[11px] font-black text-slate-800">الأدوية النشطة:</p>
                                              <p className="text-[11px] text-slate-500 font-bold mt-1 leading-relaxed">{selectedReport.medicalProfile.medications.join("، ")}</p>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-4">
                                            <X className="w-5 h-5 text-rose-500 shrink-0" />
                                            <div className="text-right">
                                              <p className="text-[11px] font-black text-rose-600">سجل الحساسية:</p>
                                              <p className="text-[11px] text-slate-500 font-bold mt-1">{selectedReport.medicalProfile.allergies.join("، ")}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="pt-4 flex gap-3">
                                        <Button className="flex-1 h-12 bg-primary text-white font-bold rounded-[12px] gap-2 active-scale text-[12px] shadow-lg shadow-primary/20">
                                          <Navigation className="w-4.5 h-4.5" />
                                          توجيه نجدة
                                        </Button>
                                        <Button variant="outline" className="h-12 w-12 rounded-[12px] border-slate-100 flex items-center justify-center active-scale">
                                           <Phone className="w-5 h-5 text-slate-400" />
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button size="sm" variant="ghost" className="h-9 w-9 p-0 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-[10px] active-scale">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Map Tab - Desktop Optimized */}
            {activeTab === 'map' && (
              <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-180px)] flex flex-col">
                <div className="flex items-center justify-between px-1">
                   <div className="space-y-1">
                     <h2 className="text-[20px] font-bold text-slate-900">خرائط السيطرة اللحظية</h2>
                     <p className="text-[12px] text-slate-400 font-bold">توزيع الوحدات ونقاط الحوادث النشطة في نطاق المكلا</p>
                   </div>
                   <div className="flex gap-2">
                      <Badge className="bg-green-500 text-white border-none text-[10px] px-3 py-1 font-bold rounded-[8px]">الوحدات النشطة: 12</Badge>
                      <Badge className="bg-rose-500 text-white border-none text-[10px] px-3 py-1 font-bold rounded-[8px]">بلاغات طارئة: 3</Badge>
                   </div>
                </div>
                
                <Card className="flex-1 overflow-hidden border-none shadow-soft relative rounded-[20px] bg-slate-900 border border-slate-200">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    src="https://www.openstreetmap.org/export/embed.html?bbox=49.05,14.50,49.20,14.60&amp;layer=mapnik"
                    className="grayscale-[0.1] contrast-[1.1] brightness-[1.05]"
                  ></iframe>
                  
                  {/* Map Markers Simulation */}
                  <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-rose-500 rounded-full animate-ping border-4 border-white shadow-2xl"></div>
                  <div className="absolute top-1/4 right-1/3 w-5 h-5 bg-primary rounded-full animate-pulse border-4 border-white shadow-2xl"></div>
                  
                  <div className="absolute top-6 left-6 flex flex-col gap-3">
                    {[Maximize2, Layers, Search].map((Icon, idx) => (
                      <button key={idx} className="w-11 h-11 bg-white/95 backdrop-blur-md shadow-xl rounded-[12px] flex items-center justify-center text-slate-600 hover:text-primary transition-colors active-scale border border-slate-100">
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>

                  {/* Redesigned Floating Stats Box */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-5 rounded-[15px] shadow-2xl border border-slate-200 w-80 space-y-4 animate-in slide-in-from-bottom-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Activity className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="font-bold text-[12px] text-slate-800">إحصائيات التغطية الجغرافية</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500">منطقة المكلا المركزية:</span>
                        <Badge className="bg-green-100 text-green-600 border-none text-[9px]">تغطية كاملة</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500">متوسط زمن الاستجابة:</span>
                        <span className="text-[14px] font-black text-primary">5.2 دقيقة</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-slate-400">كفاءة الأسطول</span>
                          <span className="text-slate-800">92%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[92%] transition-all duration-1000"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Units Tab - Improved */}
            {activeTab === 'units' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="space-y-1 px-1">
                  <h2 className="text-[20px] font-bold text-slate-900">إدارة أسطول الإسعاف</h2>
                  <p className="text-[12px] text-slate-400 font-bold">متابعة جاهزية ومواقع وحدات النجدة المتحركة</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {AMBULANCE_UNITS.map((unit) => (
                    <Card key={unit.id} className="border-none shadow-soft bg-white rounded-[15px] p-6 space-y-5 hover:shadow-xl transition-all border border-slate-50 group">
                      <div className="flex justify-between items-start">
                        <div className="p-3.5 bg-slate-50 rounded-[15px] border border-slate-100 group-hover:bg-primary/5 transition-colors">
                          <Truck className="w-6 h-6 text-slate-600 group-hover:text-primary" />
                        </div>
                        <Badge className={`${unit.status === 'نشطة' ? 'bg-green-500' : unit.status === 'في مهمة' ? 'bg-orange-500' : 'bg-blue-500'} text-white border-none text-[9px] font-bold px-3 py-1`}>
                          {unit.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-[15px] font-bold text-slate-800">الوحدة الذكية {unit.id}</h4>
                        <p className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-primary" /> {unit.location}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-50 space-y-3">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-slate-400">الطاقم الميداني:</span>
                          <span className="text-slate-700">{unit.crew}</span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="text-slate-400">مستوى الطاقة/الجاهزية:</span>
                            <span className="text-green-600">{unit.battery}</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: unit.battery }}></div>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full h-10 rounded-[12px] text-[11px] font-bold border-slate-100 text-slate-500 hover:bg-slate-50 active-scale">إدارة وتفاصيل الوحدة</Button>
                    </Card>
                  ))}
                  
                  {/* Add Unit Card */}
                  <button className="border-2 border-dashed border-slate-200 rounded-[15px] p-6 flex flex-col items-center justify-center gap-3 hover:bg-slate-50 transition-all text-slate-400 hover:text-primary hover:border-primary/50 group">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10">
                      <Plus className="w-6 h-6" />
                    </div>
                    <span className="text-[12px] font-bold">إضافة وحدة جديدة</span>
                  </button>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-6 animate-in fade-in duration-500 py-12 flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <History className="w-10 h-10 text-slate-300" />
                 </div>
                 <h2 className="text-lg font-bold text-slate-800">أرشيف البلاغات</h2>
                 <p className="text-[12px] text-slate-400 max-w-xs leading-relaxed font-bold">سيتم عرض كافة البلاغات التي تم إغلاقها أو معالجتها هنا للتوثيق والتدقيق الطبي.</p>
                 <Button className="mt-6 bg-slate-900 text-white rounded-[12px] px-8 h-11 text-[11px] font-bold">تحميل التقارير السابقة</Button>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

function Plus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
