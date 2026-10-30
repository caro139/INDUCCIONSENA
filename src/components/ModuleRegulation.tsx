import React, { useState } from 'react';
import { useInduction } from '../context/InductionContext';
import { 
  SENA_RIGHTS, 
  SENA_DUTIES, 
  REGULATION_DEFINITIONS, 
  LIFECYCLE_STAGES, 
  DISCIPLINARY_MEASURES 
} from '../data/senaData';
import { 
  Scale, 
  ShieldAlert, 
  BookOpen, 
  Calendar, 
  Gavel, 
  CheckCircle2, 
  Search, 
  HelpCircle, 
  Clock, 
  AlertTriangle, 
  FileWarning, 
  Sparkles, 
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Award,
  ChevronRight,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export type RegulationTab = 'derechos-deberes' | 'definiciones' | 'ingreso-permanencia' | 'faltas-sanciones';

export const ModuleRegulation: React.FC = () => {
  const { markModuleCompleted, setActiveSection } = useInduction();
  const [activeTab, setActiveTab] = useState<RegulationTab>('derechos-deberes');

  // Sub-filter for Derechos y Deberes
  const [rightsDutiesFilter, setRightsDutiesFilter] = useState<'todos' | 'derechos' | 'deberes' | 'prohibiciones'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [rightCategory, setRightCategory] = useState('Todas');
  const rightCategories = ['Todas', 'Formación', 'Evaluación', 'Bienestar', 'Representación', 'Garantías'];

  // Lifecycle stage state
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-ingreso');
  const currentStage = LIFECYCLE_STAGES.find(s => s.id === selectedStageId) || LIFECYCLE_STAGES[0];

  // Lists
  const dutiesList = SENA_DUTIES.filter(d => d.type === 'deber');
  const prohibitionsList = SENA_DUTIES.filter(d => d.type === 'prohibicion');

  // Filtered Rights
  const filteredRights = SENA_RIGHTS.filter(r => {
    const matchesSearch = 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.practicalExample.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = rightCategory === 'Todas' || r.category === rightCategory;
    return matchesSearch && matchesCat;
  });

  // Filtered Duties
  const filteredDuties = dutiesList.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.consequence.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered Prohibitions
  const filteredProhibitions = prohibitionsList.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.consequence.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFinishRegulation = () => {
    markModuleCompleted('reglamento');
    markModuleCompleted('derechos');
    markModuleCompleted('deberes');
    setActiveSection('evaluacion');
  };

  const stepsList: { id: RegulationTab; stepNumber: string; title: string; subtitle: string; icon: React.ReactNode }[] = [
    { 
      id: 'derechos-deberes', 
      stepNumber: '01', 
      title: 'Derechos y Deberes', 
      subtitle: `${SENA_RIGHTS.length} derechos y ${SENA_DUTIES.length} deberes/prohibiciones`,
      icon: <Scale className="w-4 h-4" /> 
    },
    { 
      id: 'definiciones', 
      stepNumber: '02', 
      title: 'Definiciones Clave', 
      subtitle: 'Conceptos del Acuerdo 0009 de 2024',
      icon: <BookOpen className="w-4 h-4" /> 
    },
    { 
      id: 'ingreso-permanencia', 
      stepNumber: '03', 
      title: 'Ingreso, Permanencia y Certificación', 
      subtitle: 'Ciclo formativo, causales de deserción y trámites',
      icon: <Calendar className="w-4 h-4" /> 
    },
    { 
      id: 'faltas-sanciones', 
      stepNumber: '04', 
      title: 'Faltas, Medidas y Sanciones', 
      subtitle: 'Debido proceso disciplinario y medidas formativas',
      icon: <Gavel className="w-4 h-4" /> 
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Module Title Header */}
      <div className="bg-white dark:bg-slate-850 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#39A900]/10 text-[#246900] dark:text-[#5ade16] border border-[#39A900]/20 mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Inducción Institucional · Rol Aprendiz</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Módulo Reglamento del Aprendiz SENA
            </h2>
            <div className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Acuerdo 0009 de 2024 · Consejo Directivo Nacional
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveSection('evaluacion')}
              className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/80 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Award className="w-4 h-4 text-[#39A900]" />
              <span>Ir a Evaluación</span>
            </button>
          </div>
        </div>

        <p className="mt-4 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
          Este módulo reúne la fundamentación normativa de la Formación Profesional Integral. Recorre cada una de las 4 secciones estructurales: <strong>Derechos y Deberes</strong>, <strong>Definiciones Institucionales</strong>, el ciclo de <strong>Ingreso, Permanencia y Certificación</strong>, y el régimen de <strong>Faltas, Medidas Formativas, Disciplinarias y Sancionatorias</strong>.
        </p>
      </div>

      {/* 4 Interactive Stepper Navigation Tabs (Los 4 ejes del reglamento solicitados) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stepsList.map((st) => {
          const isActive = activeTab === st.id;
          return (
            <button
              key={st.id}
              onClick={() => setActiveTab(st.id)}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-[#00324D] dark:bg-sky-600 text-white border-[#00324D] dark:border-sky-500 shadow-sm ring-2 ring-offset-2 ring-[#00324D] dark:ring-sky-500'
                  : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className={isActive ? 'text-emerald-300 font-bold' : 'text-[#39A900] font-bold'}>
                    SECCIÓN {st.stepNumber}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/10' : 'bg-slate-100 dark:bg-slate-700 text-[#39A900]'}`}>
                    {st.icon}
                  </div>
                </div>
                <h3 className={`font-bold text-sm sm:text-base leading-snug ${isActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {st.title}
                </h3>
              </div>
              <p className={`text-[11px] mt-2 line-clamp-2 ${isActive ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                {st.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          SECCIÓN 1: DERECHOS Y DEBERES
         ======================================================== */}
      {activeTab === 'derechos-deberes' && (
        <div className="space-y-6">
          {/* Sub-filtering bar for Derechos y Deberes */}
          <div className="bg-white dark:bg-slate-850 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-[#39A900]" />
                  <span>1. Derechos y Deberes del Aprendiz SENA</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  Marco integral de garantías, deberes cívico-académicos y prohibiciones según el Acuerdo 0009 de 2024.
                </p>
              </div>

              {/* View selector pills */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setRightsDutiesFilter('todos')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    rightsDutiesFilter === 'todos'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Ver Todo
                </button>
                <button
                  type="button"
                  onClick={() => setRightsDutiesFilter('derechos')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    rightsDutiesFilter === 'derechos'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Derechos ({SENA_RIGHTS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setRightsDutiesFilter('deberes')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    rightsDutiesFilter === 'deberes'
                      ? 'bg-[#00324D] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Deberes ({dutiesList.length})
                </button>
                <button
                  type="button"
                  onClick={() => setRightsDutiesFilter('prohibiciones')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    rightsDutiesFilter === 'prohibiciones'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Prohibiciones ({prohibitionsList.length})
                </button>
              </div>
            </div>

            {/* Search filter input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar por artículo, concepto o palabra clave (ej: evaluación, carné, inasistencia, respeto)..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              />
            </div>
          </div>

          {/* DERECHOS SECTION */}
          {(rightsDutiesFilter === 'todos' || rightsDutiesFilter === 'derechos') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#39A900]" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Derechos del Aprendiz ({filteredRights.length})
                  </h4>
                </div>
                <span className="text-xs text-slate-500">Garantías institucionales irrenunciables</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRights.map((right) => (
                  <div
                    key={right.id}
                    className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:shadow-xs transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <span className="font-mono font-bold text-[#39A900] bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          {right.article}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span>{right.category}</span>
                      </div>

                      <h5 className="text-base font-bold text-slate-900 dark:text-white">
                        {right.title}
                      </h5>

                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {right.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-start gap-2 bg-emerald-50/60 dark:bg-emerald-950/30 p-2.5 rounded-lg text-xs text-emerald-950 dark:text-emerald-200">
                        <HelpCircle className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block mb-0.5">Ejemplo práctico:</strong>
                          <span>{right.practicalExample}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DEBERES SECTION */}
          {(rightsDutiesFilter === 'todos' || rightsDutiesFilter === 'deberes') && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#00324D] dark:bg-sky-400" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Deberes del Aprendiz ({filteredDuties.length})
                  </h4>
                </div>
                <span className="text-xs text-slate-500">Compromisos formativos y de convivencia</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDuties.map((duty) => (
                  <div
                    key={duty.id}
                    className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:shadow-xs transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <span className="font-mono font-bold text-[#00324D] dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                          {duty.article}
                        </span>
                        <span>{duty.category}</span>
                      </div>

                      <h5 className="text-base font-bold text-slate-900 dark:text-white">
                        {duty.title}
                      </h5>

                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {duty.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>Consecuencia ante omisión:</strong> {duty.consequence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROHIBICIONES SECTION */}
          {(rightsDutiesFilter === 'todos' || rightsDutiesFilter === 'prohibiciones') && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-600" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Prohibiciones Expresas ({filteredProhibitions.length})
                  </h4>
                </div>
                <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">Conductas sancionables</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProhibitions.map((proh) => (
                  <div
                    key={proh.id}
                    className="bg-white dark:bg-slate-850 rounded-xl border border-rose-200 dark:border-rose-900/60 p-5 flex flex-col justify-between hover:shadow-xs transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                          {proh.article}
                        </span>
                        <span className="font-semibold text-rose-700 dark:text-rose-400">
                          Falta {proh.severity}
                        </span>
                      </div>

                      <h5 className="text-base font-bold text-slate-900 dark:text-white">
                        {proh.title}
                      </h5>

                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {proh.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-rose-100 dark:border-rose-900/60 p-2.5 rounded-lg bg-rose-50/70 dark:bg-rose-950/40 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2">
                      <FileWarning className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span><strong>Efecto disciplinario:</strong> {proh.consequence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stepper button to next section */}
          <div className="pt-6 flex justify-end">
            <button
              onClick={() => setActiveTab('definiciones')}
              className="px-6 py-3 bg-[#00324D] hover:bg-[#002236] dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Paso Siguiente: 2. Definiciones Clave</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SECCIÓN 2: DEFINICIONES
         ======================================================== */}
      {activeTab === 'definiciones' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-[#39A900]" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                2. Definiciones y Conceptos del Acuerdo 0009 de 2024
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Glosario oficial de los términos pedagógicos, técnicos y normativos que rigen el proceso formativo en el SENA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REGULATION_DEFINITIONS.map((def) => (
              <div
                key={def.id}
                className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-xs transition-shadow"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-[#39A900] uppercase mb-1">
                    {def.concept}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {def.term}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {def.definition}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <div className="text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-700 dark:text-slate-300">Alcance institucional:</strong> {def.scope}
                  </div>
                  <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-2.5 rounded-lg text-emerald-950 dark:text-emerald-200 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                    <span><strong>Aplicación en tu formación:</strong> {def.practicalApplication}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stepper buttons */}
          <div className="pt-6 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('derechos-deberes')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior: Derechos y Deberes</span>
            </button>

            <button
              onClick={() => setActiveTab('ingreso-permanencia')}
              className="px-6 py-3 bg-[#00324D] hover:bg-[#002236] dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Paso Siguiente: 3. Ingreso, Permanencia y Certificación</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SECCIÓN 3: INGRESO, PERMANENCIA Y CERTIFICACIÓN
         ======================================================== */}
      {activeTab === 'ingreso-permanencia' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-5 h-5 text-[#39A900]" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  3. Fases de Ingreso, Permanencia y Certificación
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Selecciona cada fase para explorar los trámites normativos, plazos, condiciones y causales de deserción.
              </p>
            </div>

            {/* Stage Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto shrink-0 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {LIFECYCLE_STAGES.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStageId(st.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    selectedStageId === st.id
                      ? 'bg-[#00324D] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {st.stage}
                </button>
              ))}
            </div>
          </div>

          {/* Current Stage Card */}
          <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-xs font-bold text-[#39A900] uppercase tracking-wide">
                Fase Oficial: {currentStage.subtitle}
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {currentStage.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {currentStage.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentStage.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 space-y-2 hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-bold text-slate-900 dark:text-white text-base">
                      {item.name}
                    </h5>
                    {item.deadline && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold shrink-0">
                        {item.deadline}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800">
                    <strong className="text-slate-700 dark:text-slate-200">Condición normativa: </strong>
                    <span>{item.condition}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Highlight for Permanencia (Deserción) */}
            {currentStage.stage === 'Permanencia' && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="block font-semibold mb-0.5">Causales de Deserción en Formación (Acuerdo 0009 de 2024):</strong>
                  La inasistencia injustificada durante <span className="underline font-bold">3 días consecutivos</span> en formación presencial, acumular el <span className="underline font-bold">15% de fallas</span> en el trimestre, o no reportar actividades en plataforma virtual activa la declaratoria de deserción con cancelación de matrícula e inhabilidad de 6 meses.
                </div>
              </div>
            )}
          </div>

          {/* Stepper buttons */}
          <div className="pt-6 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('definiciones')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior: Definiciones Clave</span>
            </button>

            <button
              onClick={() => setActiveTab('faltas-sanciones')}
              className="px-6 py-3 bg-[#00324D] hover:bg-[#002236] dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Paso Siguiente: 4. Faltas, Medidas y Sanciones</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SECCIÓN 4: FALTAS, MEDIDAS FORMATIVAS Y SANCIONES
         ======================================================== */}
      {activeTab === 'faltas-sanciones' && (
        <div className="space-y-8">
          {/* Due Process Flowchart Banner */}
          <div className="bg-gradient-to-r from-[#00324D] to-[#004e75] text-white p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <Gavel className="w-6 h-6 text-[#39A900]" />
              <h3 className="text-xl font-bold">
                4. Régimen Disciplinario y Garantía del Debido Proceso
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-4xl">
              Nadie puede ser sancionado arbitrariamente. Toda medida disciplinaria debe respetar las fases constitucionales de queja formal, notificación al aprendiz, audiencia ante el Comité de Evaluación y Seguimiento con derecho a descargos y pruebas, resolución motivada del Subdirector de Centro y derecho al <strong>Recurso de Reposición</strong> dentro de los 5 días hábiles siguientes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-[#39A900]">1. Reporte o Queja</div>
                <div className="text-[11px] text-white/80 mt-1">Informe formal sobre la falta académica o disciplinaria.</div>
              </div>
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-[#39A900]">2. Citación y Descargos</div>
                <div className="text-[11px] text-white/80 mt-1">Notificación oficial y oportunidad de aportar pruebas.</div>
              </div>
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-[#39A900]">3. Sesión del Comité</div>
                <div className="text-[11px] text-white/80 mt-1">Evaluación colegiada y recomendación motivada al Subdirector.</div>
              </div>
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-[#39A900]">4. Acto Administrativo</div>
                <div className="text-[11px] text-white/80 mt-1">Resolución oficial con garantía de Recurso de Reposición legal.</div>
              </div>
            </div>
          </div>

          {/* Three Categorical Columns: Faltas, Medidas Formativas, Sanciones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Faltas */}
            <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Tipos de Faltas
                </h4>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white">Faltas Académicas</div>
                  <div className="mt-1">Incumplimiento de evidencias evaluativas, bajo rendimiento y omisión en tareas de formación.</div>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white">Faltas Disciplinarias</div>
                  <div className="mt-1">Comportamientos contrarios a la convivencia, respeto mutuo, seguridad y cuidado de bienes del SENA.</div>
                </div>

                <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                  <div className="font-bold">Criterios de Graduación:</div>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                    <li><strong>Leves:</strong> Falta de diligencia sin dolo ni daño grave.</li>
                    <li><strong>Graves:</strong> Reincidencia o afectación de la comunidad.</li>
                    <li><strong>Gravísimas:</strong> Plagio, armas, estupefacientes, fraude o violencia.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 2: Medidas Formativas */}
            <div className="bg-white dark:bg-slate-850 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-emerald-100 dark:border-emerald-800">
                <Sparkles className="w-5 h-5 text-[#39A900]" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Medidas Formativas
                </h4>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Acciones pedagógicas orientadas a la autorregulación y fortalecimiento del aprendiz sin generar sanción en su hoja de vida.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <div className="font-bold text-emerald-950 dark:text-emerald-200">1. Llamado Verbal</div>
                  <div className="text-slate-600 dark:text-slate-300 mt-1">Reflexión pedagógica directa entre instructor y aprendiz ante falta leve.</div>
                </div>

                <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <div className="font-bold text-emerald-950 dark:text-emerald-200">2. Plan de Mejora Académico</div>
                  <div className="text-slate-600 dark:text-slate-300 mt-1">Acta concertada con actividades de nivelación para resultados pendientes (plazo máx. 30 días).</div>
                </div>

                <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <div className="font-bold text-emerald-950 dark:text-emerald-200">3. Plan de Mejora Disciplinario</div>
                  <div className="text-slate-600 dark:text-slate-300 mt-1">Compromiso conductual en Comité con acompañamiento psicosocial de Bienestar al Aprendiz.</div>
                </div>
              </div>
            </div>

            {/* Column 3: Sanciones Disciplinarias */}
            <div className="bg-white dark:bg-slate-850 rounded-2xl border border-rose-200 dark:border-rose-900 p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-rose-100 dark:border-rose-800">
                <FileWarning className="w-5 h-5 text-rose-600" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Sanciones Disciplinarias
                </h4>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Medidas impuestas formalmente por el Subdirector de Centro ante faltas graves o gravísimas comprobadas.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800">
                  <div className="font-bold text-rose-950 dark:text-rose-200">1. Llamado Escrito</div>
                  <div className="text-slate-600 dark:text-slate-300 mt-1">Anotación formal con copia a la hoja de vida institucional del aprendiz.</div>
                </div>

                <div className="p-3 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800">
                  <div className="font-bold text-rose-950 dark:text-rose-200">2. Condicionamiento de Matrícula</div>
                  <div className="text-slate-600 dark:text-slate-300 mt-1">Suspensión temporal de apoyos socioeconómicos y periodo de prueba formativa.</div>
                </div>

                <div className="p-3 bg-rose-50/80 dark:bg-rose-950/50 rounded-xl border border-rose-300 dark:border-rose-700">
                  <div className="font-bold text-rose-950 dark:text-rose-200 flex items-center justify-between">
                    <span>3. Cancelación de Matrícula</span>
                    <span className="text-[10px] font-mono text-rose-700 dark:text-rose-400">Inhabilidad 6m - 3 años</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 mt-1">Pérdida de la calidad de aprendiz y veto para matricularse en programas del SENA.</div>
                </div>
              </div>
            </div>

          </div>

          {/* Stepper buttons & Completion CTA */}
          <div className="p-6 bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#39A900] text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  ¡Has completado las 4 secciones del Reglamento del Aprendiz!
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Ya tienes los conocimientos necesarios para presentar la Evaluación de Apropiación (10 preguntas).
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('ingreso-permanencia')}
                className="px-4 py-2.5 bg-white dark:bg-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-600 cursor-pointer"
              >
                Anterior
              </button>

              <button
                onClick={handleFinishRegulation}
                className="px-6 py-2.5 bg-[#39A900] hover:bg-[#2d8500] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Presentar Evaluación de Apropiación</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
