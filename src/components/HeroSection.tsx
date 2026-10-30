import React from 'react';
import { useInduction } from '../context/InductionContext';
import { Award, ArrowRight, BookOpen, CheckCircle2, ShieldCheck, AlertCircle, Scale } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

export const HeroSection: React.FC<{ onOpenProfile: () => void }> = ({ onOpenProfile }) => {
  const { currentApprentice, setActiveSection, completedModules, role } = useInduction();

  const campusImage = '/src/assets/images/sena_campus_modern_1793115116554.jpg';

  const isPassed = currentApprentice.status === 'Aprobado';
  const isImprovement = currentApprentice.status === 'Plan de Mejoramiento';

  const modulesKeys = ['identidad', 'derechos', 'deberes', 'ruta-formativa', 'dilemas'];
  const completedCount = modulesKeys.filter(k => completedModules[k]).length;
  const progressPercent = Math.round((completedCount / modulesKeys.length) * 100);

  return (
    <div className="relative overflow-hidden bg-white border-b border-slate-200">
      {/* Background decoration with soft gradient scrim */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Greeting and Context */}
          <div className="lg:col-span-7 space-y-5">
            {/* Unboxed metadata line */}
            <div className="flex items-center flex-wrap gap-2 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5 text-[#39A900] font-semibold">
                <SenaLogo className="w-4 h-4 object-contain inline-block" />
                Proceso Oficial de Inducción
              </span>
              <span aria-hidden="true">·</span>
              <span>Ficha {currentApprentice.ficha}</span>
              <span aria-hidden="true">·</span>
              <span>{currentApprentice.regional}</span>
              <span aria-hidden="true">·</span>
              <span>Vigencia 2026</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Bienvenido al SENA, <span className="text-[#39A900]">Aprendiz</span>
              </h1>
              <p className="mt-2 text-base text-slate-600 leading-relaxed max-w-2xl">
                Apropia la identidad institucional, tus derechos y deberes según el nuevo Reglamento del Aprendiz (Acuerdo 0009 de 2024), y supera la evaluación para certificar tu inducción.
              </p>
            </div>

            {/* Apprentice Status Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="text-xs text-slate-500">Programa de Formación</div>
                  <div className="text-sm font-semibold text-slate-900">{currentApprentice.program}</div>
                </div>

                <div className="flex items-center gap-2">
                  {isPassed ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Competente / Aprobado ({currentApprentice.score}%)
                    </span>
                  ) : isImprovement ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-md">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      Plan de Mejoramiento ({currentApprentice.score}%)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-200 px-3 py-1 rounded-md">
                      En proceso de inducción
                    </span>
                  )}
                  <button
                    onClick={onOpenProfile}
                    className="text-xs text-[#00324D] hover:underline font-medium"
                  >
                    Cambiar datos
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Módulos de formación explorados</span>
                  <span className="font-semibold text-slate-900">{completedCount} de 5 módulos ({progressPercent}%)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-[#39A900] h-2 transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Actions CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveSection('reglamento')}
                className="px-5 py-2.5 bg-[#39A900] hover:bg-[#2d8500] text-white text-sm font-medium rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span>Módulo Reglamento del Aprendiz</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => setActiveSection('evaluacion')}
                className="px-5 py-2.5 bg-white border-2 border-[#39A900] hover:bg-emerald-50 text-slate-900 text-sm font-semibold rounded-lg shadow-xs transition-all flex items-center gap-2 group cursor-pointer"
                title="Presentar Evaluación de Apropiación del Conocimiento"
              >
                <Award className="w-4 h-4 text-[#39A900] group-hover:scale-110 transition-transform" />
                <span>Evaluación de Apropiación del Conocimiento</span>
              </button>

              {isPassed && (
                <button
                  onClick={() => setActiveSection('certificado')}
                  className="px-5 py-2.5 bg-[#00324D] hover:bg-[#002236] text-white text-sm font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Ver Certificado</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Campus image with fallback */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[16/10] bg-slate-900">
              <img
                src={campusImage}
                alt="Ambiente de formación tecnológica e innovación del SENA - Centro de Industria y Construcción Regional Tolima"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Fallback container with pure CSS in case image fails */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00324D] via-[#004e75] to-[#39A900] p-6 flex flex-col justify-end text-white pointer-events-none -z-10">
                <div className="text-xl font-bold">Formación Profesional Integral</div>
                <div className="text-xs text-white/80">Ambientes de aprendizaje y tecnología de punta</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none flex flex-col justify-end p-5">
                <div className="text-xs text-emerald-300 font-medium tracking-wide">
                  Centro de Formación Oficial
                </div>
                <div className="text-white text-base font-semibold leading-tight mt-1">
                  {currentApprentice.center}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
