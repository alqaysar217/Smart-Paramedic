
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
  Map as MapIcon, 
  MapPin,
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
  X,
  Navigation,
  History,
  LayoutDashboard,
  LogOut,
  PanelRightClose,
  PanelRight,
  Eye,
  Trash2,
  AlertCircle,
  ShieldCheck
} from "lucide-react";
import { useAuth, useUser, signOutUser } from "@/firebase";
import { cn } from "@/lib/utils";

const ACTIVE_REPORTS = [
  { id: "REP-001", reporterName: "عصبان ةنسيب", type: "إغماء مفاجئ", location: "المكلا - فوة - المساكن", medicalProfile: { age: 21, gender: "أنثى", bloodType: "O+", chronicDiseases: ["هبوط سكر"], medications: ["فيتامينات"], allergies: ["البنسلين"], phone: "0533112233" } },
  { id: "REP-002", reporterName: "منى باحسين", type: "أزمة تنفسية", location: "المكلا - الديس - شارع الغويزي", medicalProfile: { age: 20, gender: "أنثى", bloodType: "A-", chronicDiseases: ["الربو"], medications: ["فنتولين"], allergies: ["الغبار"], phone: "0544223344" } },
  { id: "REP-003", reporterName: "نجد مسيعان", type: "نزيف حاد", location: "المكلا - روكب", medicalProfile: { age: 22, gender: "أنثى", bloodType: "B+", chronicDiseases: ["لا يوجد"], medications: ["لا يوجد"], allergies: ["لا يوجد"], phone: "0555334455" } },
  { id: "REP-004", reporterName: "نور العمودي", type: "تشنجات", location: "المكلا - بويش", medicalProfile: { age: 19, gender: "أنثى", bloodType: "AB+", chronicDiseases: ["صرع"], medications: ["إيبانوتين"], allergies: ["لا يوجد"], phone: "0566445566" } },
  { id: "REP-005", reporterName: "رغد بلعفير", type: "حادث سير", location: "المكلا - شارع الستين", medicalProfile: { age: 23, gender: "أنثى", bloodType: "O-", chronicDiseases: ["لا يوجد"], medications: ["لا يوجد"], allergies: ["لا يوجد"], phone: "0577556677" } },
  { id: "REP-006", reporterName: "خلود بن ثابت", type: "ألم في الصدر", location: "المكلا - الشرج", medicalProfile: { age: 21, gender: "أنثى", bloodType: "A+", chronicDiseases: ["اشتباه صمام"], medications: ["أسبرين"], allergies: ["لا يوجد"], phone: "0588667788" } },
  { id: "REP-007", reporterName: "عائشة مرعي", type: "هبوط حاد", location: "المكلا - جول مسحة", medicalProfile: { age: 22, gender: "أنثى", bloodType: "O+", chronicDiseases: ["لا يوجد"], medications: ["لا يوجد"], allergies: ["مأكولات بحرية"], phone: "0599778899" } },
  { id: "REP-008", reporterName: "نور باعباد", type: "كسر مضاعف", location: "المكلا - امبيخة", medicalProfile: { age: 20, gender: "أنثى", bloodType: "B-", chronicDiseases: ["لا يوجد"], medications: ["لا يوجد"], allergies: ["براسيتامول"], phone: "0500112233" } },
  { id: "REP-009", reporterName: "منية باكرمان", type: "صدمة حرارية", location: "المكلا - بروم", medicalProfile: { age: 19, gender: "أنثى", bloodType: "AB-", chronicDiseases: ["لا يوجد"], medications: ["لا يوجد"], allergies: ["لا يوجد"], phone: "0511223344" } },
  { id: "REP-010", reporterName: "هديل المنهالي", type: "تسمم غذائي", location: "المكلا - غيل باوزير", medicalProfile: { age: 22, gender: "أنثى", bloodType: "A-", chronicDiseases: ["لا يوجد"], medications: ["لا يوجد"], allergies: ["لاكتوز"], phone: "0522334455" } },
  { id: "REP-011", reporterName: "ماريا الحيقي", type: "اختناق", location: "المكلا - الديس", medicalProfile: { age: 21, gender: "أنثى", bloodType: "O+", chronicDiseases: ["لا يوجد"], medications: ["لا يوجد"], allergies: ["لا يوجد"], phone: "0533445566" } },
];

const ARCHIVED_REPORTS = [
  { id: "HIST-001", reporterName: "أمل بن عيفان", type: "حالة إغماء", date: "2024/05/10", location: "المكلا - فوة" },
  { id: "HIST-002", reporterName: "سارة العمودي", type: "جرح سطحي", date: "2024/05/09", location: "المكلا - الشرج" },
  { id: "HIST-003", reporterName: "فاطمة باوزير", type: "اشتباه كسر", date: "2024/05/08", location: "المكلا - روكب" },
  { id: "HIST-004", reporterName: "مريم الصباري", type: "صعوبة تنفس", date: "2024/05/07", location: "المكلا - بويش" },
];

const AMBULANCE_UNITS = [
  { id: "AMB-01", status: "نشطة", location: "خور المكلا", crew: "د. خالد / م. محمد", battery: "95%" },
  { id: "AMB-02", status: "في مهمة", location: "الديس", crew: "د. سالم / م. فهد", battery: "80%" },
  { id: "AMB-03", status: "متاحة", location: "مستشفى ابن سينا", crew: "د. هاني / م. أحمد", battery: "100%" },
  { id: "AMB-04", status: "نشطة", location: "فوة الطويلة", crew: "د. أحمد / م. علي", battery: "88%" },
];

export default function ResponderDashboard() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [activeTab, setActiveTab] = useState<'reports' | 'map' | 'units' | 'history'>('reports');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
      {/* Header */}
      <header className="bg-white border-b border-slate-100 p-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-[10px] flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Hospital className="w-5 h-5" />
          </div>
          <div className="text-right hidden sm:block">
            <h1 className="font-bold text-[15px] text-slate-800 leading-tight">مركز السيطرة والعمليات الموحد</h1>
            <p className="text-[9px] text-slate-400 font-black mt-1 uppercase tracking-[0.2em]">حضرموت - إدارة الأزمات والطوارئ</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2 bg-green-50 px-4 py-2 rounded-[10px] border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-700">اتصال النظام مستقر</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-left hidden md:block">
                <p className="text-[11px] font-bold text-slate-800">مشرف العمليات</p>
                <p className="text-[9px] text-slate-400 font-bold">النوبة المسائية</p>
             </div>
             <div className="w-10 h-10 rounded-[10px] overflow-hidden border-2 border-slate-100 relative shadow-sm">
                <Image src="https://picsum.photos/seed/admin1/200/200" alt="Admin" fill className="object-cover" />
             </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-white border-l border-slate-100 flex flex-col p-4 gap-2 z-40 transition-all duration-300",
            isSidebarCollapsed ? "w-20" : "w-64"
          )}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="self-end mb-4 text-slate-400 hover:text-primary transition-colors"
          >
            {isSidebarCollapsed ? <PanelRight className="w-5 h-5" /> : <PanelRightClose className="w-5 h-5" />}
          </Button>

          <div className="space-y-1.5 flex-1">
            {[
              { id: 'reports', label: 'البلاغات النشطة', icon: LayoutDashboard },
              { id: 'map', label: 'خرائط السيطرة', icon: MapIcon },
              { id: 'units', label: 'إدارة الأسطول', icon: Truck },
              { id: 'history', label: 'أرشيف البلاغات', icon: History }
            ].map((item) => (
              <Button 
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"} 
                className={cn(
                  "w-full justify-start gap-3 h-12 rounded-[12px] text-[12px] font-bold transition-all",
                  activeTab === item.id ? 'bg-slate-900 shadow-xl text-white translate-x-1' : 'text-slate-500 hover:bg-slate-50',
                  isSidebarCollapsed && "justify-center px-0"
                )}
                onClick={() => setActiveTab(item.id as any)}
                title={item.label}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>
          
          <div className="pt-6 border-t border-slate-50">
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className={cn(
                "w-full justify-start gap-3 h-12 rounded-[12px] text-rose-500 text-[12px] font-bold hover:bg-rose-50 hover:text-rose-600 transition-colors",
                isSidebarCollapsed && "justify-center px-0"
              )}
            >
              <LogOut className="w-5 h-5" />
              {!isSidebarCollapsed && <span>تسجيل الخروج</span>}
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-slate-50/30 p-8">
          <div className="w-full max-w-[1400px] mx-auto space-y-8">
            
            {activeTab === 'reports' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-[22px] font-bold text-slate-900">سجل البلاغات الحية</h2>
                    <p className="text-[12px] text-slate-400 font-bold">متابعة كافة طلبات النجدة الواردة لحظياً</p>
                  </div>
                  <div className="bg-white p-3 rounded-[12px] border border-slate-100 flex items-center gap-6 shadow-sm">
                      <div className="text-center px-4 border-l border-slate-50">
                        <p className="text-[9px] text-slate-300 font-black uppercase">إجمالي الطلبات</p>
                        <p className="text-[20px] font-black text-slate-800">{ACTIVE_REPORTS.length}</p>
                      </div>
                      <div className="text-center px-4">
                        <p className="text-[9px] text-rose-400 font-black uppercase">حالات حرجة</p>
                        <p className="text-[20px] font-black text-rose-600">6</p>
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
                        <TableHead className="text-center text-[11px] font-black uppercase text-slate-400 w-[100px]">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ACTIVE_REPORTS.map((report) => (
                        <TableRow key={report.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <TableCell className="font-bold text-[12px] text-slate-600">{report.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-[10px] overflow-hidden border border-slate-100 relative shadow-sm">
                                <Image src={`https://picsum.photos/seed/${report.id}/100/100`} alt="Avatar" fill className="object-cover" />
                              </div>
                              <p className="text-[13px] font-bold text-slate-800">{report.reporterName}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-[12px] font-bold text-slate-700">{report.type}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span className="text-[11px] font-bold text-slate-500 truncate max-w-[180px]">{report.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button onClick={() => setSelectedReport(report)} size="icon" variant="ghost" className="h-8 w-8 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg">
                                    <Eye className="w-4 h-4" />
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
                                          <p className="text-[10px] text-rose-400 font-black uppercase mb-1">فصيلة الدم</p>
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
                                              <p className="text-[11px] text-slate-500 font-bold mt-1">{selectedReport.medicalProfile.medications.join("، ")}</p>
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
                                        <Button className="flex-1 h-12 bg-primary text-white font-bold rounded-[12px] gap-2 active-scale text-[12px]">
                                          <Navigation className="w-4 h-4" /> توجيه نجدة
                                        </Button>
                                        <Button variant="outline" className="h-12 w-12 rounded-[12px] border-slate-100 flex items-center justify-center active-scale">
                                           <Phone className="w-5 h-5 text-slate-400" />
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button size="icon" variant="ghost" className="h-8 w-8 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-lg">
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

            {activeTab === 'map' && (
               <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-180px)] flex flex-col">
                  <div className="flex items-center justify-between px-1">
                    <h2 className="text-[22px] font-bold text-slate-900">خرائط السيطرة اللحظية</h2>
                    <Badge className="bg-green-500 text-white border-none text-[10px] px-3 py-1 font-bold">الوحدات النشطة: 12</Badge>
                  </div>
                  <Card className="flex-1 overflow-hidden border-none shadow-soft relative rounded-[20px] bg-slate-900 border border-slate-200">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      src="https://www.openstreetmap.org/export/embed.html?bbox=49.00,14.48,49.25,14.62&amp;layer=mapnik"
                      className="grayscale-[0.1] contrast-[1.1]"
                    ></iframe>
                    <div className="absolute top-6 left-6 flex flex-col gap-3">
                      {[Maximize2, Layers, Search].map((Icon, idx) => (
                        <button key={idx} className="w-12 h-12 bg-white/95 backdrop-blur-md shadow-xl rounded-[15px] flex items-center justify-center text-slate-600 hover:text-primary transition-all active-scale border border-slate-100">
                          <Icon className="w-5 h-5" />
                        </button>
                      ))}
                    </div>
                  </Card>
               </div>
            )}

            {activeTab === 'units' && (
               <div className="grid grid-cols-4 gap-6 animate-in fade-in duration-500">
                 {AMBULANCE_UNITS.map((unit) => (
                   <Card key={unit.id} className="border-none shadow-soft bg-white rounded-[20px] p-6 space-y-5 border border-slate-50">
                     <div className="flex justify-between items-start">
                        <div className="p-4 bg-slate-50 rounded-[15px] border border-slate-100">
                          <Truck className="w-7 h-7 text-slate-600" />
                        </div>
                        <Badge className="bg-green-500 text-white border-none text-[9px] font-bold">{unit.status}</Badge>
                     </div>
                     <div>
                        <h4 className="text-[16px] font-bold text-slate-800">الوحدة {unit.id}</h4>
                        <p className="text-[11px] text-slate-400 font-bold flex items-center gap-2 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-primary" /> {unit.location}
                        </p>
                     </div>
                     <div className="pt-4 border-t border-slate-50">
                        <p className="text-[10px] text-slate-400 font-bold mb-2">الجاهزية:</p>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-[95%]"></div>
                        </div>
                     </div>
                   </Card>
                 ))}
               </div>
            )}

            {activeTab === 'history' && (
               <div className="space-y-4 animate-in fade-in duration-500">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[22px] font-bold text-slate-900">أرشيف البلاغات المؤرشفة</h2>
                    <Badge variant="outline" className="text-slate-400 border-slate-200">إجمالي الأرشيف: {ARCHIVED_REPORTS.length}</Badge>
                  </div>
                  <Card className="border-none shadow-soft bg-white rounded-[15px] overflow-hidden">
                    <Table className="font-cairo">
                        <TableHeader className="bg-slate-50/50">
                          <TableRow className="border-slate-100">
                            <TableHead className="text-right text-[11px] font-black text-slate-400">رقم البلاغ</TableHead>
                            <TableHead className="text-right text-[11px] font-black text-slate-400">المستخدم</TableHead>
                            <TableHead className="text-right text-[11px] font-black text-slate-400">نوع الحالة</TableHead>
                            <TableHead className="text-right text-[11px] font-black text-slate-400">التاريخ</TableHead>
                            <TableHead className="text-center text-[11px] font-black text-slate-400">التفاصيل</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ARCHIVED_REPORTS.map((report) => (
                            <TableRow key={report.id} className="border-slate-50">
                              <TableCell className="font-bold text-slate-600">{report.id}</TableCell>
                              <TableCell className="font-bold text-[12px]">{report.reporterName}</TableCell>
                              <TableCell className="text-[12px] text-slate-500">{report.type}</TableCell>
                              <TableCell className="text-[11px] text-slate-400">{report.date}</TableCell>
                              <TableCell className="text-center">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                    </Table>
                  </Card>
               </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
