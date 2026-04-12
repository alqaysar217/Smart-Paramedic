"use client";

import { useState } from "react";
import { generateFirstAidInstructions, FirstAidInstructionOutput } from "@/ai/flows/generate-first-aid-instructions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PlayCircle, ClipboardList, Info, Flame, Activity, Zap, Droplets, AlertCircle, ChevronLeft } from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";

export default function InstructionsPage() {
  const [loading, setLoading] = useState(false);
  const [instructions, setInstructions] = useState<FirstAidInstructionOutput | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const emergencyTypes = [
    { id: "bleeding", label: "النزيف", icon: Droplets, color: "bg-rose-100 text-rose-600" },
    { id: "fainting", label: "الإغماء", icon: Activity, color: "bg-blue-100 text-blue-600" },
    { id: "burns", label: "الحروق", icon: Flame, color: "bg-orange-100 text-orange-600" },
    { id: "fractures", label: "الكسور", icon: AlertCircle, color: "bg-gray-100 text-gray-600" },
    { id: "choking", label: "الاختناق", icon: Zap, color: "bg-yellow-100 text-yellow-600" },
  ];

  const fetchInstructions = async (type: string) => {
    setLoading(true);
    setSelectedType(type);
    try {
      const result = await generateFirstAidInstructions({ emergencyType: type });
      setInstructions(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-20">
        <h1 className="font-headline text-2xl font-bold">الإسعافات الأولية</h1>
        <ClipboardList className="text-primary w-6 h-6" />
      </div>

      <div className="p-6 space-y-6">
        {!instructions && !loading && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="font-headline text-lg font-bold mb-2">كيف يمكننا مساعدتك؟</h2>
              <p className="text-sm text-gray-500">اختر الحالة للحصول على إرشادات فورية مدعومة بالذكاء الاصطناعي</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {emergencyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => fetchInstructions(type.id)}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div className={`p-4 rounded-2xl mb-4 ${type.color}`}>
                    <type.icon className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-gray-700">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="font-bold text-gray-500">جاري إعداد الإرشادات الطبية...</p>
          </div>
        )}

        {instructions && !loading && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button variant="ghost" onClick={() => setInstructions(null)} className="gap-2 text-gray-500 font-bold mb-4">
              <ChevronLeft className="w-5 h-5" />
              العودة للأقسام
            </Button>

            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-primary text-white p-6">
                <div className="flex justify-between items-center">
                  <CardTitle className="font-headline text-2xl">{instructions.title}</CardTitle>
                  <Button variant="secondary" size="icon" className="rounded-full bg-white/20 text-white backdrop-blur-sm border-none">
                    <PlayCircle className="w-6 h-6" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6 bg-white">
                <div className="space-y-4">
                  {instructions.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start group">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed font-medium pt-1">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-3">
                  <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500 leading-relaxed italic">
                    {instructions.disclaimer}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-bold rounded-2xl shadow-lg gap-2">
              <PlayCircle className="w-6 h-6" />
              تشغيل الإرشادات الصوتية
            </Button>
          </div>
        )}
      </div>

      <BottomNav activeTab="instructions" />
    </div>
  );
}