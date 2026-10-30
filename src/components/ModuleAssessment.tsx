import React, { useState, useEffect } from 'react';
import { useInduction } from '../context/InductionContext';
import { ASSESSMENT_QUESTIONS } from '../data/senaData';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  RotateCcw, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ModuleAssessment: React.FC = () => {
  const { 
    userAnswers, 
    setUserAnswer, 
    finishEvaluation, 
    retakeEvaluation, 
    evaluationResult,
    setActiveSection,
    currentApprentice
  } = useInduction();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(900); // 15 mins
  const [timerActive, setTimerActive] = useState<boolean>(true);

  // Timer countdown
  useEffect(() => {
    if (!timerActive || evaluationResult) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          finishEvaluation();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, evaluationResult]);

  const currentQ = ASSESSMENT_QUESTIONS[currentIndex];
  const selectedAnswer = userAnswers[currentQ?.id];
  const totalCount = ASSESSMENT_QUESTIONS.length;
  const answeredCount = Object.keys(userAnswers).length;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (idx: number) => {
    if (!currentQ) return;
    setUserAnswer(currentQ.id, idx);
  };

  const handleNext = () => {
    if (currentIndex < totalCount - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    finishEvaluation();
  };

  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  // If already evaluated, show results screen
  if (evaluationResult) {
    const isPassed = evaluationResult.isPassed;

    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Results Banner */}
        <div className={`p-6 sm:p-8 rounded-2xl border text-center transition-all ${
          isPassed 
            ? 'bg-gradient-to-b from-emerald-50 via-white to-emerald-50/20 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/20 border-emerald-300 dark:border-emerald-700/60' 
            : 'bg-gradient-to-b from-amber-50 via-white to-amber-50/20 dark:from-amber-950/40 dark:via-slate-900 dark:to-amber-950/20 border-amber-300 dark:border-amber-700/60'
        }`}>
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {isPassed ? (
              <ShieldCheck className="w-10 h-10 text-[#39A900]" />
            ) : (
              <AlertCircle className="w-10 h-10 text-amber-500" />
            )}
          </div>

          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Evaluación de Apropiación del Conocimiento · SENA
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {isPassed ? "¡Felicitaciones! Has sido calificado como COMPETENTE" : "Apropiación Parcial: Requiere Plan de Mejoramiento"}
          </h2>

          <div className="mt-3 flex items-center justify-center flex-wrap gap-2 sm:gap-4 text-slate-600 dark:text-slate-300 text-sm">
            <span>Puntaje obtenido: <strong className="text-slate-900 dark:text-white font-bold text-lg tabular-nums">{evaluationResult.score}%</strong></span>
            <span aria-hidden="true">·</span>
            <span>Aciertos: <strong className="text-slate-900 dark:text-white font-bold tabular-nums">{evaluationResult.correctCount} de {evaluationResult.totalQuestions}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Mínimo institucional: <strong className="text-slate-900 dark:text-white font-bold">80%</strong></span>
          </div>

          <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {isPassed
              ? "Has demostrado la apropiación de los derechos, deberes, símbolos institucionales y el nuevo Reglamento del Aprendiz (Acuerdo 0009 de 2024). Tu certificado oficial de inducción ha sido generado y validado con éxito."
              : "No alcanzaste el umbral de aprobación institucional del 80%. Revisa a continuación la retroalimentación pedagógica y normativa, y reintenta la evaluación para afianzar tus competencias."}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {isPassed ? (
              <button
                onClick={() => setActiveSection('certificado')}
                className="px-6 py-3 bg-[#39A900] hover:bg-[#2d8500] text-white font-semibold text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-5 h-5" />
                <span>Ver y Descargar Mi Certificado Oficial</span>
              </button>
            ) : (
              <button
                onClick={retakeEvaluation}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Evaluación</span>
              </button>
            )}

            <button
              onClick={() => setActiveSection('identidad')}
              className="px-5 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm rounded-xl transition-colors cursor-pointer"
            >
              Repasar Módulos de Formación
            </button>
          </div>
        </div>

        {/* Categorical Performance Breakdown */}
        <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#39A900]" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Apropiación por Áreas de Conocimiento
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(evaluationResult.categoryScores).map(([cat, stat]) => {
              const pct = Math.round((stat.correct / stat.total) * 100);
              return (
                <div key={cat} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    <span>{cat}</span>
                    <span className="tabular-nums font-mono">{stat.correct}/{stat.total} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-2 transition-all ${pct >= 80 ? 'bg-[#39A900]' : 'bg-amber-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Revisión Pedagógica y Citas del Reglamento
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {evaluationResult.totalQuestions} preguntas evaluadas
            </span>
          </div>

          <div className="space-y-4">
            {ASSESSMENT_QUESTIONS.map((q, idx) => {
              const userAns = evaluationResult.userAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    isCorrect 
                      ? 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800' 
                      : 'bg-rose-50/30 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span className="font-semibold text-slate-900 dark:text-white">Pregunta {idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#39A900] font-medium">{q.category}</span>
                    </div>

                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                        Correcta
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 dark:text-rose-400">
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        Incorrecta
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1 leading-snug">
                    {q.question}
                  </p>

                  <div className="mt-3 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="font-medium text-slate-500 dark:text-slate-400">Tu respuesta: </span>
                      <span className={isCorrect ? 'text-emerald-800 dark:text-emerald-300 font-semibold' : 'text-rose-800 dark:text-rose-300 line-through'}>
                        {userAns !== undefined ? q.options[userAns] : 'Sin responder'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div>
                        <span className="font-medium text-emerald-800 dark:text-emerald-400">Respuesta reglamentaria: </span>
                        <span className="text-emerald-950 dark:text-emerald-200 font-semibold">{q.options[q.correctAnswer]}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">Sustento oficial:</strong>
                    {q.feedback}
                    <div className="mt-1.5 font-mono text-emerald-800 dark:text-emerald-400 font-semibold text-[11px]">
                      {q.regulationReference}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active quiz screen
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Module Title & Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#39A900] tracking-wider uppercase flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>Módulo 05 · Evaluación Oficial</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Evaluación de Apropiación del Conocimiento
          </h2>
          <p className="mt-1 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
            Cuestionario oficial de {totalCount} preguntas de selección múltiple con única respuesta sobre el Reglamento del Aprendiz (Acuerdo 0009 de 2024), derechos, deberes y trámites de inducción. Umbral de aprobación: 80% (mínimo 8/10 respuestas correctas).
          </p>
        </div>

        {/* Timer & Threshold Box */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#39A900]" />
            <span>Mínimo: 80%</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <Clock className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            <span className="font-mono text-sm font-bold text-slate-900 dark:text-white tabular-nums">
              {formatTime(secondsLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400">
          <span>Pregunta <strong className="text-slate-900 dark:text-white">{currentIndex + 1}</strong> de {totalCount}</span>
          <span><strong className="text-[#39A900]">{answeredCount}</strong> de {totalCount} respondidas</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-[#39A900] h-2 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
          />
        </div>

        {/* Quick jump questions buttons */}
        <div className="flex items-center gap-1.5 pt-2 flex-wrap">
          {ASSESSMENT_QUESTIONS.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCurrent = currentIndex === idx;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${
                  isCurrent
                    ? 'bg-[#00324D] dark:bg-sky-600 text-white shadow-xs ring-2 ring-offset-1 ring-[#00324D]'
                    : isAnswered
                    ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
                title={`Pregunta ${idx + 1}: ${q.category}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      {currentQ && (
        <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-[#39A900] font-semibold uppercase bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                {currentQ.category}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Selección múltiple con única respuesta
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-3 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options list */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-sm flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-[#39A900] text-slate-900 dark:text-white font-medium shadow-xs ring-1 ring-[#39A900]'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg text-xs font-bold border flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                    isSelected 
                      ? 'border-[#39A900] bg-[#39A900] text-white' 
                      : 'border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {optionLetters[idx]}
                  </div>
                  <div className="leading-relaxed flex-1">
                    {opt}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation within assessment */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {currentIndex < totalCount - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={answeredCount === 0}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#2d8500] rounded-lg flex items-center gap-2 transition-all shadow-sm disabled:opacity-40 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Finalizar y Calificar ({answeredCount}/{totalCount})</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
