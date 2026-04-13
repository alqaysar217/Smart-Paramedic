
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlayCircle, 
  ClipboardList, 
  Flame, 
  Activity, 
  Zap, 
  Droplets, 
  AlertCircle, 
  ChevronRight,
  Skull,
  Wind,
  Brain,
  UserMinus,
  Volume2,
  Share2
} from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";

// قاعدة بيانات الإسعافات الأولية الفورية
const FIRST_AID_DATA = {
  bleeding: {
    title: "إسعاف حالات النزيف الحاد",
    steps: [
      "ارتدِ قفازات طبية إن وجدت لحماية نفسك.",
      "اضغط مباشرة على الجرح بقطعة قماش نظيفة أو شاش.",
      "ارفع العضو المصاب أعلى من مستوى القلب إن أمكن.",
      "إذا لم يتوقف النزيف، لا ترفع الشاش القديم بل ضع فوقه طبقة أخرى.",
      "ثبّت الضمادة جيداً وانتظر وصول فريق الإسعاف."
    ],
    disclaimer: "هذه التعليمات لغرض الإسعاف الأولي السريع ولا تغني عن التدخل الطبي المتخصص."
  },
  choking: {
    title: "إسعاف حالات الاختناق (غصة الطعام)",
    steps: [
      "قف خلف الشخص المصاب ولف ذراعيك حول خصره.",
      "أغلق قبضة يدك وضعها فوق سرة الشخص مباشرة.",
      "أمسك قبضتك بيدك الأخرى واضغط بقوة للداخل وللأعلى (مناورة هيمليك).",
      "كرر الضغطات حتى يخرج الجسم الغريب أو يفقد الشخص وعيه.",
      "إذا فقد الشخص وعيه، ابدأ فوراً في الإنعاش القلبي الرئوي (CPR)."
    ],
    disclaimer: "تأكد من طلب الإسعاف فوراً إذا لم تنجح المحاولة الأولى."
  },
  poisoning: {
    title: "إسعاف حالات التسمم",
    steps: [
      "حاول معرفة المادة التي ابتلعها المصاب وكميتها.",
      "لا تحاول إجبار المصاب على التقيؤ ما لم يطلب منك الطبيب ذلك.",
      "إذا كانت المادة حارقة، لا تعطِ المصاب أي سوائل.",
      "احتفظ بعبوة المادة السامة لتسليمها لفريق الإسعاف.",
      "اتصل فوراً بمركز السموم أو الإسعاف (191)."
    ],
    disclaimer: "التسمم حالة حرجة تتطلب تدخلاً طبياً عاجلاً جداً."
  },
  burns: {
    title: "إسعاف حالات الحروق",
    steps: [
      "ضع المنطقة المصابة تحت ماء جاري فاتر لمدة 10-20 دقيقة.",
      "لا تستخدم الثلج مباشرة على الحرق لأنه قد يتلف الأنسجة.",
      "قم بإزالة الخواتم أو الملابس الضيقة من المنطقة قبل تورمها.",
      "غطِّ الحرق بضمادة معقمة غير لاصقة أو غلاف بلاستيكي نظيف.",
      "لا تضع معجون الأسنان أو الزيوت على الحرق."
    ],
    disclaimer: "الحروق الكبيرة أو حروق الوجه تتطلب نقلاً فورياً للمستشفى."
  },
  fractures: {
    title: "إسعاف حالات الكسور",
    steps: [
      "لا تحاول تحريك العضو المكسور أو إعادته لوضعه الطبيعي.",
      "ثبّت العضو المصاب باستخدام جبيرة مؤقتة (كرتون أو خشب مبطن).",
      "ضع كيس ثلج ملفوف بقطعة قماش لتقليل التورم والألم.",
      "إذا كان هناك جرح مفتوح، غطّه بشاش معقم دون الضغط على العظم.",
      "راقب علامات الصدمة على المصاب (شحوب، سرعة تنفس)."
    ],
    disclaimer: "تحريك المصاب بكسر في الظهر أو الرقبة خطر جداً ويجب تركه للمختصين."
  },
  electric_shock: {
    title: "إسعاف الصعق الكهربائي",
    steps: [
      "افصل مصدر الكهرباء فوراً أو ابعد المصاب باستخدام أداة غير موصلة (خشب).",
      "لا تلمس المصاب بيدك المجردة وهو لا يزال متصلاً بالكهرباء.",
      "بمجرد تأمين الموقع، افحص التنفس والنبض.",
      "إذا كان التنفس متوقفاً، ابدأ الإنعاش القلبي الرئوي فوراً.",
      "غطِّ أماكن الحروق الناتجة عن الكهرباء بشاش نظيف."
    ],
    disclaimer: "الصعق الكهربائي قد يؤثر على ضربات القلب حتى لو بدا الشخص سليماً."
  },
  seizures: {
    title: "إسعاف حالات التشنجات والصرع",
    steps: [
      "ضع المصاب على الأرض وبعيداً عن الأجسام الصلبة أو الحادة.",
      "ضع شيئاً ناعماً تحت رأسه (مثل وسادة أو ملابس مطوية).",
      "لا تحاول وضع أي شيء في فم المصاب أو تثبيت حركته بقوة.",
      "بعد انتهاء التشنج، ضع المصاب على جنبه (وضعية الإفاقة).",
      "ابقَ مع المصاب حتى يستعيد وعيه بالكامل."
    ],
    disclaimer: "اطلب الإسعاف إذا استمر التشنج لأكثر من 5 دقائق."
  },
  fainting: {
    title: "إسعاف حالات الإغماء",
    steps: [
      "اجعل المصاب يستلقي على ظهره وارفع قدميه (30 سم) عن الأرض.",
      "قم بفك الملابس الضيقة حول الرقبة والخصر لسهولة التنفس.",
      "تأكد من وجود تهوية جيدة في المكان.",
      "امسح وجه المصاب بماء بارد قليلاً.",
      "إذا لم يستعد وعيه خلال دقيقة، ضعه في وضعية الإفاقة واتصل بالإسعاف."
    ],
    disclaimer: "الإغماء المتكرر قد يكون مؤشراً لمشاكل صحية باطنية."
  }
};

export default function InstructionsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const emergencyTypes = [
    { id: "bleeding", label: "النزيف", icon: Droplets, color: "bg-rose-50 text-rose-500" },
    { id: "choking", label: "الاختناق", icon: Wind, color: "bg-blue-50 text-blue-500" },
    { id: "poisoning", label: "التسمم", icon: Skull, color: "bg-orange-50 text-orange-500" },
    { id: "burns", label: "الحروق", icon: Flame, color: "bg-red-50 text-red-500" },
    { id: "fractures", label: "الكسور", icon: Activity, color: "bg-slate-50 text-slate-500" },
    { id: "electric_shock", label: "صعق كهربائي", icon: Zap, color: "bg-yellow-50 text-yellow-500" },
    { id: "seizures", label: "التشنجات", icon: Brain, color: "bg-purple-50 text-purple-500" },
    { id: "fainting", label: "الإغماء", icon: UserMinus, color: "bg-cyan-50 text-cyan-500" },
  ];

  const currentData = selectedId ? FIRST_AID_DATA[selectedId as keyof typeof FIRST_AID_DATA] : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-28 font-cairo" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-5 h-16 flex items-center justify-between shadow-soft">
        <h1 className="text-sm font-black text-slate-800">دليل الإسعاف الفوري</h1>
        <ClipboardList className="text-primary w-5 h-5" />
      </header>

      <main className="px-5 pt-6">
        {!selectedId ? (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl shadow-soft border border-slate-50">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">اختر نوع الحالة</h2>
              <p className="text-[11px] text-slate-500 font-bold leading-relaxed">دليل استرشادي سريع للتعامل مع الحالات الطارئة في حضرموت.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {emergencyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedId(type.id)}
                  className="bg-white p-4 rounded-3xl border border-slate-100 shadow-soft flex flex-col items-center text-center transition-all hover:border-primary/20 active:scale-95 group"
                >
                  <div className={`p-3 rounded-2xl mb-2 transition-transform group-hover:scale-110 ${type.color}`}>
                    <type.icon className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-slate-700 text-[11px]">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-400">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedId(null)} 
              className="gap-2 text-slate-400 font-bold p-0 h-auto hover:bg-transparent text-[11px]"
            >
              <ChevronRight className="w-4 h-4" />
              العودة للقائمة الرئيسية
            </Button>

            <Card className="border-none shadow-soft rounded-[2rem] overflow-hidden bg-white">
              <CardHeader className="bg-primary p-6 text-white text-right">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-70">إرشادات طبية</p>
                <CardTitle className="text-lg font-black mt-1">{currentData?.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  {currentData?.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 font-black text-xs border border-slate-100">
                        {idx + 1}
                      </div>
                      <p className="text-[12px] text-slate-600 leading-relaxed font-bold pt-1">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-orange-800 uppercase tracking-tighter">تنبيه هام</p>
                    <p className="text-[10px] text-orange-700/80 leading-relaxed font-medium">
                      {currentData?.disclaimer}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-3">
              <Button className="w-full h-14 bg-accent hover:bg-accent/90 text-white text-sm font-black rounded-2xl shadow-lg shadow-accent/20 gap-2 active-scale">
                <Volume2 className="w-4 h-4" />
                تشغيل المساعد الصوتي
              </Button>
              <Button variant="outline" className="w-full h-12 rounded-2xl border-slate-100 text-slate-400 font-bold text-[11px] gap-2 active-scale">
                <Share2 className="w-4 h-4" />
                مشاركة هذه الإرشادات
              </Button>
            </div>
          </div>
        )}
      </main>

      <BottomNav activeTab="instructions" />
    </div>
  );
}
