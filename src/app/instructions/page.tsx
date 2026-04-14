
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
  Share2,
  HeartPulse,
  ThermometerSnowflake,
  Stethoscope
} from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";

// قاعدة بيانات الإسعافات الأولية الموسعة والشاملة
const FIRST_AID_DATA = {
  bleeding: {
    title: "الدليل الشامل للتعامل مع النزيف الحاد",
    steps: [
      "تأكد أولاً من سلامة الموقع لك وللمصاب قبل البدء بالإسعاف.",
      "ارتدِ القفازات الطبية فوراً لتجنب انتقال الأمراض عبر الدم.",
      "قم بإزالة الملابس عن الجرح لرؤية مصدر النزيف بوضوح.",
      "طبق ضغطاً مباشراً وقوياً على الجرح باستخدام شاش معقم أو قطعة قماش نظيفة.",
      "إذا تشبع الشاش بالدم، لا تنزعه بل ضع شاشاً جديداً فوقه واستمر في الضغط.",
      "ارفع الطرف المصاب فوق مستوى القلب لتقليل تدفق الدم.",
      "في حال نزيف الأطراف الشديد الذي لا يتوقف بالضغط، قد يتطلب الأمر استخدام 'المرقأة' (Tourniquet) فوق الجرح بـ 5 سم.",
      "ثبّت الضمادة برباط ضاغط دون قطع الدورة الدموية تماماً.",
      "راقب علامات الصدمة: شحوب الوجه، برودة الأطراف، وسرعة النبض.",
      "ابقِ المصاب مستلقياً ودافئاً حتى وصول سيارة الإسعاف."
    ],
    disclaimer: "النزيف الشرياني (دم أحمر فاتح يتدفق بقوة) حالة طارئة جداً تتطلب ضغطاً مستمراً دون انقطاع."
  },
  choking: {
    title: "إسعاف غصة الطعام والاختناق للأطفال والكبار",
    steps: [
      "إذا كان المصاب يسعل بقوة، شجعه على السعال ولا تتدخل.",
      "إذا توقف السعال ولم يستطع التنفس أو الكلام، ابدأ فوراً بمناورة هيمليك.",
      "قف خلف المصاب ولف ذراعيك حول خصره.",
      "اصنع قبضة بيدك وضعها فوق السرة مباشرة (تحت عظمة القص).",
      "أمسك قبضتك باليد الأخرى وادفع بقوة للداخل وللأعلى (حركة حرف J).",
      "كرر الدفعات (5 دفعات) ثم اتبعها بـ 5 ضربات قوية بين لوحي الكتف.",
      "استمر حتى يخرج الجسم الغريب أو يفقد الشخص وعيه.",
      "بالنسبة للرضع: ضع الرضيع على ذراعك ووجهه للأسفل، واضرب 5 ضربات لطيفة على الظهر.",
      "إذا فقد المصاب الوعي، ابدأ فوراً بعملية الإنعاش القلبي الرئوي (CPR).",
      "لا تحاول إدخال إصبعك في الفم إلا إذا كنت ترى الجسم الغريب بوضوح."
    ],
    disclaimer: "مناورة هيمليك قد تسبب إصابات داخلية، لذا يجب فحص المصاب طبياً حتى بعد نجاح الإسعاف."
  },
  poisoning: {
    title: "البروتوكول الطبي لإسعاف حالات التسمم الكيميائي والغذائي",
    steps: [
      "حاول تحديد نوع المادة السامة ووقت تناولها وكميتها.",
      "اتصل فوراً بالإسعاف (191) أو مركز السموم وأخبرهم بنوع المادة.",
      "إذا كان السم مادة كاوية (مثل الفلاش أو الأسيد)، لا تجعل المصاب يتقيأ أبداً.",
      "في حالات المواد الكاوية، يمكن إعطاء القليل من الماء أو الحليب فقط إذا كان المصاب واعياً ويستطيع البلع.",
      "إذا كان السم غازاً (مثل أول أكسيد الكربون)، انقل المصاب للهواء الطلق فوراً.",
      "إذا انسكب السم على الجلد، اغسل المنطقة بماء جاري لمدة 20 دقيقة على الأقل.",
      "إذا وصل السم للعين، اغسلها بماء فاتر برفق من جهة الأنف للخارج.",
      "لا تعطِ 'شراب عرق الذهب' أو الفحم المنشط إلا بأمر طبي مباشر.",
      "حافظ على مجرى التنفس مفتوحاً وضع المصاب على جنبه في حال تقيأ.",
      "خذ عبوة المادة السامة معك إلى المستشفى للتعرف على الترياق المناسب."
    ],
    disclaimer: "تجنب الوصفات المنزلية مثل شرب الزيت أو الملح، فقد تسرع من امتصاص السم."
  },
  burns: {
    title: "إسعاف الحروق (الحرارية، الكيميائية، والكهربائية)",
    steps: [
      "أبعد المصاب عن مصدر الحرق فوراً (نار، بخار، مواد كيميائية).",
      "حروق الدرجة الأولى والثانية: ضع المنطقة تحت ماء جاري فاتر (وليس بارداً جداً) لمدة 20 دقيقة.",
      "لا تستخدم الثلج مباشرة، حيث يسبب صدمة للأنسجة ويؤخر الشفاء.",
      "قم بإزالة الخواتم والساعات والملابس قبل أن تتورم المنطقة، إلا إذا كانت ملتصقة بالحرق.",
      "غطِّ المنطقة بضمادة معقمة غير لاصقة أو غلاف بلاستيكي نظيف (Wrap) دون ضغط.",
      "لا تفتح البثور (الفقاعات) المليئة بالسوائل لتجنب العدوى.",
      "الحروق الكيميائية: اغسل بالماء الجاري لمدة أطول (30-60 دقيقة) لإزالة المادة تماماً.",
      "في الحروق الكبيرة، ارفع الأطراف المصابة فوق مستوى القلب.",
      "راقب التنفس خاصة إذا كان الحرق في الوجه أو الصدر أو نتج عن استنشاق دخان.",
      "لا تضع معجون الأسنان، الزبدة، أو أي مراهم منزلية على الحرق."
    ],
    disclaimer: "حروق الدرجة الثالثة (الجلد المتفحم أو الأبيض) لا تسبب ألماً أحياناً بسبب تلف الأعصاب وهي حالة حرجة جداً."
  },
  fractures: {
    title: "إسعاف الكسور وإصابات العمود الفقري",
    steps: [
      "لا تحاول إطلاقاً إعادة العظم المكسور إلى وضعه الطبيعي.",
      "ثبّت العضو المصاب في الوضعية التي وجدته عليها.",
      "استخدم جبائر مؤقتة (خشب، كرتون مقوى) تثبت المفصل فوق وتحت الكسر.",
      "في حال الكسر المفتوح (بروز العظم)، غطِّ الجرح بشاش معقم دون لمس العظم.",
      "تحقق من وجود نبض وإحساس في الأطراف بعد وضع الجبيرة للتأكد من أنها ليست ضيقة.",
      "طبق كمدات باردة فوق الجبيرة لتقليل التورم.",
      "إصابات الرأس والرقبة: لا تحرك المصاب أبداً إلا في حال خطر انفجار أو حريق.",
      "استخدم يديك لتثبيت رأس المصاب ومنعه من الحركة حتى وصول الإسعاف.",
      "راقب وعي المصاب وتحدث معه باستمرار لمنعه من فقدان الوعي.",
      "في حال وجوب نقل المصاب بكسر عمود فقري، يجب أن يتم ذلك بواسطة 4 أشخاص ككتلة واحدة."
    ],
    disclaimer: "أي حركة خاطئة في كسور الرقبة قد تؤدي إلى شلل رباعي دائم."
  },
  heart_attack: {
    title: "إسعاف النوبات القلبية والسكتة الصدرية",
    steps: [
      "اجعل المصاب يتوقف عن أي مجهود بدني فوراً.",
      "ساعد المصاب على الجلوس في وضعية مريحة (نصف جلسة) مع دعم الظهر.",
      "قم بفك الملابس الضيقة حول الرقبة والخصر.",
      "اسأل المصاب إذا كان يتناول أدوية قلب سابقة (مثل حبوب تحت اللسان).",
      "إذا كان المصاب واعياً وغير حاس لـ 'الأسبرين'، اجعله يمضغ حبة أسبرين (300 ملغ).",
      "طمئن المصاب وحاول تهدئته لتقليل الجهد على عضلة القلب.",
      "إذا فقد المصاب وعيه وتوقف تنفسه، ابدأ الإنعاش القلبي الرئوي (CPR) فوراً.",
      "لا تترك المصاب وحيداً أبداً.",
      "لا تسمح للمصاب بالمشي أو الحركة حتى لو شعر بتحسن مؤقت.",
      "اتصل بالإسعاف فوراً وأخبرهم أنها 'اشتباه نوبة قلبية' ليرسلوا سيارة مجهزة."
    ],
    disclaimer: "أعراض النوبة عند النساء وكبار السن قد تكون 'ضيق تنفس' أو 'ألم في الفك' بدلاً من ألم الصدر الصريح."
  },
  seizures: {
    title: "إسعاف حالات التشنج العصبي والصرع",
    steps: [
      "احسب وقت بداية التشنج بدقة.",
      "أبعد أي أجسام صلبة أو حادة من حول المصاب.",
      "ضع وسادة أو ملابس مطوية تحت رأس المصاب لحمايته من الارتطام.",
      "لا تحاول تقييد حركة المصاب أو منعه من التشنج بالقوة.",
      "لا تضع أي شيء في فم المصاب (لا ملعقة ولا أصبع ولا قماش).",
      "قم بفك الملابس حول العنق برفق.",
      "بعد انتهاء التشنج، ضع المصاب على جنبه (وضعية الإفاقة) لتأمين مجرى التنفس.",
      "ابقَ مع المصاب حتى يستعيد وعيه بالكامل، فقد يكون مشوشاً أو عدوانياً بعد النوبة.",
      "لا تعطِ المصاب أي طعام أو شراب حتى يتأكد وعيه التام.",
      "اطلب الإسعاف إذا استمرت النوبة أكثر من 5 دقائق أو تكررت دون استعادة الوعي."
    ],
    disclaimer: "من الطبيعي أن يتغير لون وجه المصاب أو يخرج زبد من فمه، حافظ على هدوئك."
  },
  fainting: {
    title: "إسعاف حالات الإغماء وهبوط الضغط والسكر",
    steps: [
      "تأكد من أن المصاب يتنفس ومجرى الهواء مفتوح.",
      "ارفع قدمي المصاب حوالي 30 سم عن مستوى الأرض.",
      "قم بتهوية المكان وابعاد المتجمهرين عن المصاب.",
      "امسح وجه المصاب بماء بارد قليلاً ولا تسكب الماء بكميات كبيرة.",
      "إذا استعاد المصاب وعيه، لا تجعله ينهض بسرعة بل تدريجياً.",
      "إذا كان المصاب مريض سكر، أعطه عسيراً أو قطعة حلوى فور استعادة وعيه.",
      "إذا لم يستعد الوعي خلال دقيقة واحدة، ضعه في وضعية الإفاقة.",
      "تحقق من وجود بطاقة طبية أو سوار يوضح حالة مرضية معينة.",
      "راقب النبض والتنفس باستمرار حتى وصول المساعدة.",
      "اتصل بالإسعاف إذا كان الإغماء ناتجاً عن إصابة سابقة أو ترافق مع ألم في الصدر."
    ],
    disclaimer: "الإغماء المفاجئ لكبار السن يتطلب دائماً فحصاً طبياً فورياً."
  }
};

export default function InstructionsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const emergencyTypes = [
    { id: "bleeding", label: "النزيف الحاد", icon: Droplets, color: "bg-rose-50 text-rose-500" },
    { id: "choking", label: "الاختناق والغصة", icon: Wind, color: "bg-blue-50 text-blue-500" },
    { id: "heart_attack", label: "الأزمة القلبية", icon: HeartPulse, color: "bg-red-50 text-red-600" },
    { id: "burns", label: "الحروق بأنواعها", icon: Flame, color: "bg-orange-50 text-orange-500" },
    { id: "fractures", label: "الكسور والعمود الفقري", icon: Stethoscope, color: "bg-slate-50 text-slate-500" },
    { id: "poisoning", label: "التسمم والمواد الكاوية", icon: Skull, color: "bg-amber-50 text-amber-600" },
    { id: "seizures", label: "التشنجات والصرع", icon: Brain, color: "bg-purple-50 text-purple-500" },
    { id: "fainting", label: "الإغماء وهبوط السكر", icon: UserMinus, color: "bg-cyan-50 text-cyan-500" },
  ];

  const currentData = selectedId ? FIRST_AID_DATA[selectedId as keyof typeof FIRST_AID_DATA] : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-cairo" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 h-14 flex items-center justify-between shadow-soft">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-[10px] flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-[13px] font-bold text-slate-800">موسوعة الإسعافات</h1>
        </div>
        <ClipboardList className="text-slate-400 w-4 h-4" />
      </header>

      <main className="px-4 pt-4">
        {!selectedId ? (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-[10px] shadow-soft border border-slate-50">
              <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">الدليل الطبي</h2>
              <p className="text-[11px] text-slate-600 font-bold leading-relaxed">اختر الحالة لبدء خطوات الإنقاذ فوراً وفق المعايير الطبية الدولية.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {emergencyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedId(type.id)}
                  className="bg-white p-4 rounded-[10px] border border-slate-100 shadow-soft flex flex-col items-center text-center transition-all active-scale group"
                >
                  <div className={`p-3 rounded-lg mb-2 ${type.color}`}>
                    <type.icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700 text-[10px] leading-tight">{type.label}</span>
                </button>
              ))}
            </div>

            <Card className="bg-blue-600 border-none shadow-md rounded-[10px] p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[12px]">التدريب الافتراضي</h4>
                  <p className="text-[9px] opacity-80 font-bold">تعلم الإسعاف عبر محاكاة الواقع</p>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedId(null)} 
              className="gap-2 text-slate-400 font-bold p-0 h-auto hover:bg-transparent text-[10px]"
            >
              <ChevronRight className="w-4 h-4" />
              العودة لقائمة الحالات
            </Button>

            <Card className="border-none shadow-soft rounded-[10px] overflow-hidden bg-white">
              <CardHeader className="bg-slate-900 p-6 text-white text-right">
                <p className="text-[8px] font-bold text-primary uppercase tracking-widest mb-1">دليل الإنقاذ الفوري</p>
                <CardTitle className="text-md font-bold">{currentData?.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  {currentData?.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 font-bold text-[10px] border border-slate-100">
                        {idx + 1}
                      </div>
                      <p className="text-[12px] text-slate-600 leading-relaxed font-bold pt-1">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-rose-50 rounded-[10px] border border-rose-100 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-rose-800 uppercase tracking-tighter">تنبيه حرج</p>
                    <p className="text-[10px] text-rose-700/80 leading-relaxed font-bold">
                      {currentData?.disclaimer}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-3">
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white text-[12px] font-bold rounded-[10px] shadow-lg gap-2 active-scale">
                <Volume2 className="w-4 h-4" />
                تفعيل المساعد الصوتي
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-11 rounded-[10px] border-slate-100 text-slate-500 font-bold text-[10px] gap-2 active-scale">
                  <Share2 className="w-3.5 h-3.5" />
                  مشاركة
                </Button>
                <Button variant="outline" className="h-11 rounded-[10px] border-slate-100 text-slate-500 font-bold text-[10px] gap-2 active-scale">
                  <PlayCircle className="w-3.5 h-3.5" />
                  فيديو توضيحي
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav activeTab="instructions" />
    </div>
  );
}
