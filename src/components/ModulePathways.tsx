import React, { useState } from 'react';
import { useInduction } from '../context/InductionContext';
import { PRODUCTIVE_MODALITIES } from '../data/senaData';
import { 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Heart, 
  Award, 
  Building2,
  Users,
  Lightbulb,
  FileCheck
} from 'lucide-react';

export const ModulePathways: React.FC = () => {
  const { markModuleCompleted, setActiveSection } = useInduction();
  const [selectedModalityId, setSelectedModalityId] = useState<string>('contrato-aprendizaje');

  const selectedModality = PRODUCTIVE_MODALITIES.find(m => m.id === selectedModalityId) || PRODUCTIVE_MODALITIES[0];

  const handleComplete = () => {
    markModuleCompleted('ruta-formativa');
    setActiveSection('dilemas');
  };

  return (
    <div className="space-y-12">
      {/* Module Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold text-[#39A900] tracking-wider uppercase">
          Módulo 03 · Etapa Productiva & Bienestar al Aprendiz
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Etapa Lectiva, Etapa Productiva y Servicios de Bienestar
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl">
          Tu formación profesional integral consta de dos fases complementarias: la adquisición de competencias en ambientes de aprendizaje (Etapa Lectiva) y la aplicación real en el sector productivo o comunitario (Etapa Productiva).
        </p>
      </div>

      {/* Two Stages Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#39A900] flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-semibold text-[#39A900] uppercase">Fase 1</div>
            <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">Etapa Lectiva</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Periodo en el que desarrollas competencias técnicas específicas de tu programa y competencias transversales (ética, cultura física, inglés, medio ambiente, TIC y seguridad y salud en el trabajo).
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
            Acreditación: Juicios de evaluación 'Aprobado (A)' en SOFIA Plus / Zajuna.
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#00324D] flex items-center justify-center mb-4">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-semibold text-[#00324D] uppercase">Fase 2</div>
            <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">Etapa Productiva</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Periodo de desempeño laboral real y resolución de problemas del entorno donde consolidas tus destrezas. Se realiza mediante 6 alternativas formales avaladas por el SENA.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
            Acompañamiento: Seguimiento de instructor técnico y bitácoras quincenales.
          </div>
        </div>
      </div>

      {/* Las 6 Alternativas de Etapa Productiva - Interactive Explorer */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 bg-slate-50/70">
          <h3 className="text-xl font-bold text-slate-900">
            Las 6 Alternativas Oficiales de Etapa Productiva
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Selecciona la modalidad de tu interés para conocer sus características, beneficios legales y requisitos.
          </p>

          {/* Buttons strip */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1">
            {PRODUCTIVE_MODALITIES.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setSelectedModalityId(mod.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  selectedModalityId === mod.id
                    ? 'bg-[#00324D] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {mod.title.split('.')[1]?.trim() || mod.title}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="text-xs font-mono text-[#39A900] font-semibold">
              Marco Normativo: {selectedModality.legalBasis}
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mt-1">
              {selectedModality.title}
            </h4>
            <p className="text-sm sm:text-base text-slate-700 mt-2 leading-relaxed">
              {selectedModality.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Key Benefits */}
            <div className="p-5 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-[#39A900] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Beneficios y Garantías</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                {selectedModality.keyBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#39A900] font-bold">·</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <FileCheck className="w-4 h-4 text-[#00324D]" />
                <span>Requisitos de Aprobación</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {selectedModality.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">·</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios de Bienestar al Aprendiz */}
      <div className="space-y-4">
        <div>
          <div className="text-xs font-semibold text-[#39A900] tracking-wider uppercase">
            Acompañamiento Integral
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Programas de Bienestar al Aprendiz
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Espacios y beneficios orientados al crecimiento humano, la salud y la permanencia educativa del aprendiz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Heart className="w-6 h-6 text-rose-500 mb-2" />
            <h4 className="font-bold text-slate-900 text-sm">Salud Integral</h4>
            <p className="text-xs text-slate-600 mt-1">
              Jornadas de vacunación, prevención de enfermedades, tamizajes visuales y primeros auxilios en sede.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Award className="w-6 h-6 text-[#39A900] mb-2" />
            <h4 className="font-bold text-slate-900 text-sm">Deporte y Cultura</h4>
            <p className="text-xs text-slate-600 mt-1">
              Juegos zonales y nacionales SENA, grupos de danzas, música, teatro y torneos inter-fichas.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Users className="w-6 h-6 text-[#00324D] mb-2" />
            <h4 className="font-bold text-slate-900 text-sm">Apoyos Socioeconómicos</h4>
            <p className="text-xs text-slate-600 mt-1">
              Apoyo de sostenimiento regular, subsidio de transporte, bono alimentario y apoyos FIC (construcción).
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Lightbulb className="w-6 h-6 text-amber-500 mb-2" />
            <h4 className="font-bold text-slate-900 text-sm">Liderazgo y Habilidades</h4>
            <p className="text-xs text-slate-600 mt-1">
              Escuelas de voceros y líderes, talleres de oratoria, resolución de conflictos y habilidades para la vida.
            </p>
          </div>
        </div>
      </div>

      {/* Module Completion Footer */}
      <div className="p-6 bg-slate-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#39A900] text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">¿Comprendiste la ruta formativa?</div>
            <div className="text-xs text-slate-600">Pon a prueba tu criterio en el Simulador de Casos y Dilemas Reales.</div>
          </div>
        </div>

        <button
          onClick={handleComplete}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#39A900] hover:bg-[#2d8500] text-white text-sm font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <span>Ir a Simulador de Casos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
