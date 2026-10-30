import React, { useState } from 'react';
import { useInduction } from '../context/InductionContext';
import { 
  SENA_DUTIES, 
  REGULATION_DEFINITIONS, 
  LIFECYCLE_STAGES, 
  DISCIPLINARY_MEASURES 
} from '../data/senaData';
import { 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  ShieldAlert, 
  FileWarning, 
  Clock, 
  Sparkles,
  BookOpen,
  GraduationCap,
  Scale,
  Calendar,
  AlertCircle,
  FileCheck,
  UserCheck,
  HelpCircle,
  Gavel
} from 'lucide-react';

export const ModuleDuties: React.FC = () => {
  const { markModuleCompleted, setActiveSection } = useInduction();
  const [activeTab, setActiveTab] = useState<'ciclo-vida' | 'definiciones' | 'deberes-prohibiciones' | 'regimen-sancionatorio'>('ciclo-vida');
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-ingreso');
  const [selectedDisciplinaryCategory, setSelectedDisciplinaryCategory] = useState<'todos' | 'faltas' | 'medidas' | 'sanciones'>('todos');

  const dutiesList = SENA_DUTIES.filter(d => d.type === 'deber');
  const prohibitionsList = SENA_DUTIES.filter(d => d.type === 'prohibicion');

  const currentStage = LIFECYCLE_STAGES.find(s => s.id === selectedStageId) || LIFECYCLE_STAGES[0];

  const handleComplete = () => {
    markModuleCompleted('deberes');
    setActiveSection('ruta-formativa');
  };

  return (
    <div className="space-y-8">
      {/* Module Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="text-xs font-semibold text-[#39A900] tracking-wider uppercase">
          Módulo 03 · Reglamento del Aprendiz (Acuerdo 0009 de 2024)
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
          Reglamento, Ciclo de Vida y Régimen Disciplinario
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          El <strong className="text-slate-800 dark:text-slate-100">Acuerdo 0009 de 2024</strong> compila de manera integral las definiciones institucionales, el ciclo formativo desde el ingreso y las novedades de permanencia hasta la certificación, junto con el régimen de faltas, medidas formativas pedagógicas y sanciones.
        </p>
      </div>

      {/* Main Module Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('ciclo-vida')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'ciclo-vida'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-[#39A900]" />
          <span>Ingreso, Permanencia y Certificación</span>
        </button>

        <button
          onClick={() => setActiveTab('definiciones')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'definiciones'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-[#39A900]" />
          <span>Definiciones Institucionales</span>
        </button>

        <button
          onClick={() => setActiveTab('deberes-prohibiciones')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'deberes-prohibiciones'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-[#39A900]" />
          <span>Deberes y Prohibiciones</span>
        </button>

        <button
          onClick={() => setActiveTab('regimen-sancionatorio')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'regimen-sancionatorio'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-[#39A900]" />
          <span>Faltas, Medidas Formativas y Sanciones</span>
        </button>
      </div>

      {/* TAB 1: CICLO DE VIDA (INGRESO, PERMANENCIA Y CERTIFICACIÓN) */}
      {activeTab === 'ciclo-vida' && (
        <div className="space-y-6">
          {/* Subheader and Stage selector */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div>
              <div className="text-xs font-mono text-[#39A900] font-semibold uppercase">
                Trayectoria Integral del Aprendiz
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Fases de Ingreso, Permanencia y Certificación (Acuerdo 0009 de 2024)
              </h3>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto shrink-0">
              {LIFECYCLE_STAGES.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStageId(st.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                    selectedStageId === st.id
                      ? 'bg-[#00324D] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {st.stage}
                </button>
              ))}
            </div>
          </div>

          {/* Current Stage Overview */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
              <span className="text-xs font-bold text-[#39A900] uppercase tracking-wide">
                {currentStage.subtitle}
              </span>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {currentStage.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {currentStage.description}
              </p>
            </div>

            {/* Stage items and procedures */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentStage.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 space-y-2 hover:shadow-xs transition-shadow"
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

                  <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60">
                    <strong className="text-slate-700 dark:text-slate-200">Condición normativa: </strong>
                    <span>{item.condition}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Specific highlight for Deserción under Permanencia */}
            {currentStage.stage === 'Permanencia' && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="block font-semibold mb-0.5">Atención frente a la Deserción (Artículos de Permanencia):</strong>
                  La inasistencia injustificada durante <span className="underline font-bold">3 días consecutivos</span> o acumular el <span className="underline font-bold">15% de fallas</span> en el trimestre activa de oficio la declaratoria de deserción. El aprendiz es citado por correo electrónico a descargos; si no justifica la ausencia, se procede con la cancelación de matrícula e inhabilidad de 6 meses en el SENA.
                </div>
              </div>
            )}

            {/* Specific highlight for Certificación */}
            {currentStage.stage === 'Certificación' && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-start gap-3 text-xs text-emerald-900 dark:text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-[#39A900] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="block font-semibold mb-0.5">Gratuidad y Validez Nacional de la Certificación SENA:</strong>
                  La expedición de títulos, diplomas y actas de grado en el SENA es <strong>100% gratuita</strong>. Los certificados cuentan con firma digital y código de validación QR verificable en línea por empresas y entidades gubernamentales en todo el territorio colombiano.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DEFINICIONES INSTITUCIONALES */}
      {activeTab === 'definiciones' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Glosario y Conceptos Fundamentales del Acuerdo 0009 de 2024
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Comprende los términos pedagógicos y legales que rigen tu proceso de formación profesional integral en el SENA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REGULATION_DEFINITIONS.map((def) => (
              <div
                key={def.id}
                className="bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between hover:shadow-xs transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                    <span className="font-mono font-semibold text-[#39A900]">{def.concept}</span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {def.term}
                  </h4>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {def.definition}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/80 space-y-2 text-xs">
                  <div className="text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-700 dark:text-slate-300">Alcance institucional:</strong> {def.scope}
                  </div>
                  <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-2.5 rounded-lg text-emerald-950 dark:text-emerald-200 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                    <span><strong>En tu día a día:</strong> {def.practicalApplication}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DEBERES Y PROHIBICIONES */}
      {activeTab === 'deberes-prohibiciones' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column Deberes */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-[#39A900]" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Deberes del Aprendiz SENA ({dutiesList.length})
                </h3>
              </div>

              <div className="space-y-4">
                {dutiesList.map((duty) => (
                  <div
                    key={duty.id}
                    className="bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-2 hover:shadow-xs transition-shadow"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-mono font-semibold text-[#00324D] dark:text-sky-400">{duty.article}</span>
                      <span>{duty.category}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {duty.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {duty.summary}
                    </p>

                    <div className="pt-2 flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700/60">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>Consecuencia:</strong> {duty.consequence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column Prohibiciones */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Prohibiciones Expresas ({prohibitionsList.length})
                </h3>
              </div>

              <div className="space-y-4">
                {prohibitionsList.map((proh) => (
                  <div
                    key={proh.id}
                    className="bg-white dark:bg-slate-800/90 rounded-xl border border-rose-200 dark:border-rose-900/60 p-5 space-y-2 hover:shadow-xs transition-shadow"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">{proh.article}</span>
                      <span className="font-semibold text-rose-700 dark:text-rose-300">Falta {proh.severity}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {proh.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {proh.summary}
                    </p>

                    <div className="pt-2 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2">
                      <FileWarning className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span><strong>Efecto disciplinario:</strong> {proh.consequence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FALTAS, MEDIDAS FORMATIVAS, DISCIPLINARIAS Y SANCIONATORIAS */}
      {activeTab === 'regimen-sancionatorio' && (
        <div className="space-y-8">
          {/* Due Process Flowchart Banner */}
          <div className="bg-gradient-to-r from-[#00324D] to-[#004e75] text-white p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <Gavel className="w-5 h-5 text-[#39A900]" />
              <h3 className="text-lg font-bold">
                El Debido Proceso Disciplinario (Acuerdo 0009 de 2024)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-3xl">
              En el SENA nadie puede ser sancionado de forma arbitraria. Toda medida disciplinaria debe respetar las fases constitucionales de queja motivada, notificación al aprendiz, audiencia con derecho a la defensa y descargos ante el Comité de Evaluación y Seguimiento, resolución motivada del Subdirector y derecho al <strong>Recurso de Reposición</strong> dentro de los 5 días hábiles siguientes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                <div className="font-bold text-[#39A900]">1. Reporte o Queja</div>
                <div className="text-[11px] text-white/80 mt-1">Informe formal sobre la falta académica o disciplinaria.</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                <div className="font-bold text-[#39A900]">2. Notificación y Descargos</div>
                <div className="text-[11px] text-white/80 mt-1">Citación con antelación y presentación de pruebas del aprendiz.</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                <div className="font-bold text-[#39A900]">3. Sesión del Comité</div>
                <div className="text-[11px] text-white/80 mt-1">Revisión colegiada y recomendación motivada al Subdirector.</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                <div className="font-bold text-[#39A900]">4. Acto Administrativo</div>
                <div className="text-[11px] text-white/80 mt-1">Resolución oficial con opción de Recurso de Reposición legal.</div>
              </div>
            </div>
          </div>

          {/* Classification: Faltas vs Medidas Formativas vs Sanciones Disciplinarias */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Faltas y Criterios */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Tipos de Faltas
                </h4>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">Faltas Académicas</div>
                  <div className="mt-1">Incumplimiento de evidencias, bajo rendimiento, omisión en tareas formativas pactadas en el diseño curricular.</div>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">Faltas Disciplinarias</div>
                  <div className="mt-1">Comportamientos que atentan contra la sana convivencia, el respeto, la integridad personal o los bienes del SENA.</div>
                </div>

                <div className="p-3.5 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                  <div className="font-bold">Criterios de Graduación:</div>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                    <li><strong>Leves:</strong> Falta de diligencia sin dolo.</li>
                    <li><strong>Graves:</strong> Reincidencia o afectación de actividades.</li>
                    <li><strong>Gravísimas:</strong> Plagio, armas, drogas, agresiones físicas o alteración de notas.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 2: Medidas Formativas (Pedagógicas) */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-emerald-200 dark:border-emerald-900 p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-emerald-100 dark:border-emerald-800">
                <Sparkles className="w-5 h-5 text-[#39A900]" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Medidas Formativas
                </h4>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Acciones de naturaleza 100% pedagógica y preventiva. Buscan reorientar la actitud del aprendiz sin generar sanción en su hoja de vida.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <div className="font-bold text-emerald-950 dark:text-emerald-200">1. Llamado de Atención Verbal</div>
                  <div className="text-slate-600 dark:text-slate-300 mt-1">Reflexión pedagógica directa entre instructor y aprendiz ante una falta leve.</div>
                </div>

                <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <div className="font-bold text-emerald-950 dark:text-emerald-200">2. Plan de Mejoramiento Académico</div>
                  <div className="text-slate-600 dark:text-slate-300 mt-1">Acta con actividades de nivelación para resultados no aprobados (plazo máx. 30 días).</div>
                </div>

                <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <div className="font-bold text-emerald-950 dark:text-emerald-200">3. Plan de Mejoramiento Disciplinario</div>
                  <div className="text-slate-600 dark:text-slate-300 mt-1">Compromiso conductual firmado en Comité con seguimiento psicosocial de Bienestar.</div>
                </div>
              </div>
            </div>

            {/* Column 3: Sanciones Disciplinarias */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-rose-200 dark:border-rose-900 p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-rose-100 dark:border-rose-800">
                <FileWarning className="w-5 h-5 text-rose-600" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Sanciones Disciplinarias
                </h4>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Medidas jurídicas impuestas únicamente por el Subdirector de Centro ante faltas graves o gravísimas comprobadas.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800">
                  <div className="font-bold text-rose-950 dark:text-rose-200">1. Llamado de Atención Escrito</div>
                  <div className="text-slate-600 dark:text-slate-300 mt-1">Sanción con copia al expediente y hoja de vida académica del aprendiz.</div>
                </div>

                <div className="p-3 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800">
                  <div className="font-bold text-rose-950 dark:text-rose-200">2. Condicionamiento de Matrícula</div>
                  <div className="text-slate-600 dark:text-slate-300 mt-1">Pérdida de beneficios (apoyos de sostenimiento, monitorías) y estado de prueba.</div>
                </div>

                <div className="p-3 bg-rose-50/80 dark:bg-rose-950/50 rounded-xl border border-rose-300 dark:border-rose-700">
                  <div className="font-bold text-rose-950 dark:text-rose-200 flex items-center justify-between">
                    <span>3. Cancelación de Matrícula</span>
                    <span className="text-[10px] font-mono text-rose-700 dark:text-rose-400">Inhabilidad 6m - 3 años</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 mt-1">Expulsión formal del programa y veto para matricularse en el SENA en el periodo fijado.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module Completion Footer */}
      <div className="p-6 bg-slate-100 dark:bg-slate-800/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#39A900] text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              ¿Apropiaste el Reglamento y las etapas del Aprendiz?
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              Continúa con el Módulo 04 para conocer las 6 alternativas de Etapa Productiva y los servicios de Bienestar.
            </div>
          </div>
        </div>

        <button
          onClick={handleComplete}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#39A900] hover:bg-[#2d8500] text-white text-sm font-medium rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continuar a Etapa Productiva</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
