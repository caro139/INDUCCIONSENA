import React, { useState } from 'react';
import { useInduction } from '../context/InductionContext';
import { CASE_DILEMMAS } from '../data/senaData';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  BookOpen,
  Award,
  Sparkles
} from 'lucide-react';

export const ModuleDilemmas: React.FC = () => {
  const { markModuleCompleted, setActiveSection } = useInduction();
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const currentCase = CASE_DILEMMAS[selectedCaseIndex];
  const selectedOptionId = selectedOptions[currentCase.id];
  const isAnswered = !!selectedOptionId;
  const chosenOption = currentCase.options.find(o => o.id === selectedOptionId);

  const handleSelectOption = (optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentCase.id]: optionId
    }));
    setShowExplanations(prev => ({
      ...prev,
      [currentCase.id]: true
    }));
  };

  const handleResetCurrent = () => {
    setSelectedOptions(prev => {
      const copy = { ...prev };
      delete copy[currentCase.id];
      return copy;
    });
    setShowExplanations(prev => {
      const copy = { ...prev };
      delete copy[currentCase.id];
      return copy;
    });
  };

  const allAnswered = CASE_DILEMMAS.every(c => selectedOptions[c.id]);

  const handleComplete = () => {
    markModuleCompleted('dilemas');
    setActiveSection('evaluacion');
  };

  return (
    <div className="space-y-8">
      {/* Module Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold text-[#39A900] tracking-wider uppercase">
          Módulo 04 · Taller Práctico de Casos
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Simulador de Dilemas y Situaciones Reales
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl">
          El verdadero conocimiento se demuestra en la toma de decisiones cotidianas. Analiza cada situación del entorno formativo SENA y elige la respuesta correcta fundamentada en el reglamento.
        </p>
      </div>

      {/* Case Navigator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {CASE_DILEMMAS.map((c, index) => {
          const isDone = !!selectedOptions[c.id];
          const isSelected = selectedCaseIndex === index;

          return (
            <button
              key={c.id}
              onClick={() => setSelectedCaseIndex(index)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#00324D] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <span>Caso {index + 1}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Case Scenario Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <div className="text-xs font-mono text-[#39A900] font-semibold mb-1">
            Situación de Convivencia y Reglamento #{selectedCaseIndex + 1}
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {currentCase.title}
          </h3>
          <div className="mt-4 p-5 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-800 leading-relaxed">
            <p>{currentCase.scenario}</p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            ¿Qué decisión debe tomarse?
          </div>

          <div className="space-y-3">
            {currentCase.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const hasAnswered = !!chosenOption;

              let style = 'bg-white border-slate-200 hover:border-slate-300 text-slate-800';

              if (hasAnswered) {
                if (opt.isCorrect) {
                  style = 'bg-emerald-50/80 border-emerald-400 text-emerald-950 font-medium';
                } else if (isSelected && !opt.isCorrect) {
                  style = 'bg-rose-50/80 border-rose-300 text-rose-950';
                } else {
                  style = 'bg-slate-50/50 border-slate-200 text-slate-400';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-sm flex items-start gap-3 ${style}`}
                >
                  <div className="mt-0.5 shrink-0">
                    {hasAnswered ? (
                      opt.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-[#39A900]" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300" />
                      )
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-300 group-hover:border-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 leading-relaxed">
                    {opt.text}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Feedback & Legal Citation if answered */}
        {chosenOption && (
          <div className={`p-5 rounded-xl border ${
            chosenOption.isCorrect 
              ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950' 
              : 'bg-rose-50/90 border-rose-200 text-rose-950'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm mb-1">
              {chosenOption.isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                  <span>¡Decisión pedagógica acertada!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Decisión incorrecta frente al reglamento</span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm mt-1 leading-relaxed">
              {chosenOption.explanation}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="font-mono font-semibold">
                Sustento: {chosenOption.regulationArticle}
              </span>
              
              <button
                onClick={handleResetCurrent}
                className="text-xs font-medium text-slate-700 hover:text-slate-900 underline flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reintentar este caso</span>
              </button>
            </div>
          </div>
        )}

        {/* Next case or move to quiz */}
        <div className="flex items-center justify-between pt-2">
          {selectedCaseIndex > 0 ? (
            <button
              onClick={() => setSelectedCaseIndex(prev => prev - 1)}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium"
            >
              ← Caso Anterior
            </button>
          ) : <div />}

          {selectedCaseIndex < CASE_DILEMMAS.length - 1 ? (
            <button
              onClick={() => setSelectedCaseIndex(prev => prev + 1)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <span>Siguiente Caso</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="px-5 py-2.5 bg-[#39A900] hover:bg-[#2d8500] text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              title="Presentar Evaluación de Apropiación del Conocimiento"
            >
              <Award className="w-4 h-4" />
              <span>Evaluación</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
