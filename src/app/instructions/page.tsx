
"use client";

import { useState } from "react";
import { generateFirstAidInstructions, FirstAidInstructionOutput } from "@/ai/flows/generate-first-aid-instructions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Loader2, 
  PlayCircle, 
  ClipboardList, 
  Info, 
  Flame, 
  Activity, 
  Zap, 
  Droplets, 
  AlertCircle, 
  ChevronRight,
  Skull,
  Wind,
  Brain,
  UserMinus
} from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";

export default function InstructionsPage() {
  const [loading, setLoading] = useState(false);
  const [instructions, setInstructions] = useState<FirstAidInstructionOutput | null>(null);
  const [selectedTypeLabel, setSelectedTypeLabel] = useState<string | null>(null);

  const emergencyTypes = [
    { id: "bleeding", label: "النزيف", icon: Droplets, color: "bg-rose-100 text-rose-600" },
    { id: "choking", label: "الاختناق", icon: Wind, color: "bg-blue-100 text-blue-600" },
    { id: "poisoning", label: "التسمم / بلع مواد ضارة", icon: Skull, color: "bg-orange-100 text-orange-600" },
    { id: "burns", label: "الحروق والحريق", icon: Flame, color: "bg-red-100 text-red-600" },
    { id: "fractures", label: "الكسور والجروح", icon: Activity, color: "bg-gray-100 text-gray-600" },
    { id: "electric_shock", label: "صعق كهربائي", icon: Zap, color: "bg-yellow-100 text-yellow-600" },
    { id: "seizures", label: "التشنجات والصرع", icon: Brain, color: "bg-purple-100 text-purple-600" },
    { id: "fainting", label: "الإغماء", icon: UserMinus, color: "bg-cyan-100 text-cyan-600" },
    { id: "other", label: "حالات أخرى", icon: AlertCircle, color: "bg-emerald-100 text-emerald-600" },
  ];

  const fetchInstructions = async (typeId: string, label: string) => {
    setLoading(true);
    setSelectedTypeLabel(label);
    try {
      const result = await generateFirstAidInstructions({ emergencyType: label });
      setInstructions(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-cairo" dir="rtl">
      <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-20">
        <h1 className="text-2xl font-bold">الإسعافات الأولية الذكية</h1>
        <ClipboardList className="text-primary w-6 h-6" />
      </div>

      <div className="p-6 space-y-6">
        {!instructions && !loading && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-2">دليل الإسعاف الفوري</h2>
              <p className="text-sm text-gray-500">اختر نوع الحالة للحصول على خطوات إنقاذ فورية مدعومة بالذكاء الاصطناعي</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {emergencyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => fetchInstructions(type.id, type.label)}
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center transition-all hover:border-primary/50 hover:shadow-md active:scale-95"
                >
                  <div className={`p-4 rounded-2xl mb-3 ${type.color}`}>
                    <type.icon className="w-7 h-7" />
                  </div>
                  <span className="font-bold text-gray-700 text-sm">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-25"></div>
              <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-black text-gray-700 text-xl">جاري تحليل الحالة...</p>
              <p className="text-gray-400 font-medium text-sm">يتم الآن إعداد إرشادات طبية دقيقة لـ {selectedTypeLabel}</p>
            </div>
          </div>
        )}

        {instructions && !loading && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button 
              variant="ghost" 
              onClick={() => {
                setInstructions(null);
                setSelectedTypeLabel(null);
              }} 
              className="gap-2 text-gray-500 font-bold mb-4 p-0 hover:bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
              العودة لكافة الحالات
            </Button>

            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="bg-primary text-white p-8">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">إرشادات فورية لـ</p>
                    <CardTitle className="text-2xl font-black">{instructions.title}</CardTitle>
                  </div>
                  <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 bg-white/20 text-white backdrop-blur-sm border-none">
                    <PlayCircle className="w-7 h-7" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8 bg-white">
                <div className="space-y-6">
                  {instructions.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-5 items-start group">
                      <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 font-black text-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed font-bold pt-1 text-right text-base">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-5 bg-orange-50 rounded-3xl border border-orange-100 flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-black text-orange-800">تنبيه طبي هام:</p>
                    <p className="text-xs text-orange-700/80 leading-relaxed font-medium text-right italic">
                      {instructions.disclaimer}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <Button className="w-full h-16 bg-accent hover:bg-accent/90 text-white text-xl font-black rounded-3xl shadow-xl shadow-accent/20 gap-3">
                <PlayCircle className="w-6 h-6" />
                تشغيل المساعد الصوتي
              </Button>
              <Button variant="outline" className="w-full h-14 rounded-3xl border-gray-200 text-gray-500 font-bold">
                مشاركة هذه الإرشادات
              </Button>
            </div>
          </div>
        )}
      </div>

      <BottomNav activeTab="instructions" />
    </div>
  );
}
