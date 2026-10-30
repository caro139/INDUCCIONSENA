import React, { useRef } from 'react';
import { useInduction } from '../context/InductionContext';
import { 
  Printer, 
  Download, 
  ShieldCheck, 
  QrCode, 
  Award, 
  ArrowLeft,
  Calendar,
  CheckCircle,
  Building
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

export const CertificateView: React.FC = () => {
  const { currentApprentice, setActiveSection } = useInduction();
  const certRef = useRef<HTMLDivElement>(null);

  const isApproved = currentApprentice.status === 'Aprobado';

  const handlePrint = () => {
    window.print();
  };

  const certificateNumber = `SENA-IND-${currentApprentice.ficha}-${currentApprentice.docNumber.slice(-4)}`;
  const issueDate = currentApprentice.completedAt || new Date().toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  if (!isApproved) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Certificado Aún No Disponible
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
          Para expedir tu Certificado Oficial de Aprobación de Inducción SENA, debes completar la evaluación interactiva de conocimientos con un puntaje mínimo del <strong className="text-slate-900">80% (Competente)</strong>.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setActiveSection('evaluacion')}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#39A900] hover:bg-[#2d8500] text-white font-semibold text-xs rounded-lg shadow-sm transition-all"
          >
            Ir a Presentar la Evaluación
          </button>
          <button
            onClick={() => setActiveSection('identidad')}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors"
          >
            Repasar Módulos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs print:hidden">
        <button
          onClick={() => setActiveSection('identidad')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al menú de formación</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#00324D] hover:bg-[#002236] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar en PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Certificate Canvas */}
      <div 
        id="printable-certificate"
        ref={certRef}
        className="bg-white p-8 sm:p-12 md:p-16 rounded-2xl border-4 border-double border-[#00324D] shadow-lg relative overflow-hidden text-center"
        style={{ minHeight: '620px' }}
      >
        {/* Subtle decorative corners */}
        <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-[#39A900]" />
        <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-[#39A900]" />
        <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-[#39A900]" />
        <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-[#39A900]" />

        {/* Subtle Watermark in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
          <SenaLogo className="w-[500px] h-[500px]" />
        </div>

        {/* Certificate Header */}
        <div className="space-y-2 mb-8 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-20 h-20 flex items-center justify-center">
              <SenaLogo className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
            República de Colombia · Ministerio del Trabajo
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#00324D] tracking-wide uppercase">
            Servicio Nacional de Aprendizaje — SENA
          </h1>
          <div className="text-xs font-medium text-slate-600">
            {currentApprentice.regional} · {currentApprentice.center}
          </div>
        </div>

        {/* Certificate Body */}
        <div className="my-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#39A900]">
            Constancia Oficial de Apropiación
          </div>
          <div className="text-sm text-slate-600">
            Hace constar que el (la) aprendiz:
          </div>

          <div className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif uppercase">
            {currentApprentice.fullName}
          </div>

          <div className="text-xs sm:text-sm text-slate-600">
            Identificado(a) con {currentApprentice.docType} No. <strong className="text-slate-900 font-mono font-bold">{currentApprentice.docNumber}</strong>
          </div>

          <div className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
            Ha culminado y aprobado satisfactoriamente el ciclo integral de <strong className="text-slate-900">Inducción y Apropiación Institucional</strong> para el programa de formación profesional:
          </div>

          <div className="text-base sm:text-lg font-bold text-[#00324D] uppercase tracking-wide">
            {currentApprentice.program}
          </div>

          <div className="text-xs text-slate-500">
            Ficha de Caracterización No. <strong className="text-slate-800 font-mono">{currentApprentice.ficha}</strong>
          </div>

          {/* Outcome badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider mt-2">
            <CheckCircle className="w-4 h-4 text-[#39A900]" />
            <span>Juicio Evaluativo: COMPETENTE ({currentApprentice.score || 100}%)</span>
          </div>
        </div>

        {/* Verification and Signatures Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center">
          {/* Signee 1 */}
          <div className="space-y-1">
            <div className="w-36 h-10 mx-auto border-b border-slate-400 flex items-center justify-center font-serif italic text-slate-700 text-sm">
              Carlos E. Mendoza
            </div>
            <div className="text-[11px] font-bold text-slate-800 uppercase">Subdirector de Centro</div>
            <div className="text-[10px] text-slate-500">{currentApprentice.center}</div>
          </div>

          {/* Institutional QR Code stamp */}
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="w-16 h-16 p-1 bg-slate-50 border border-slate-300 rounded-lg flex items-center justify-center">
              <QrCode className="w-12 h-12 text-slate-800" />
            </div>
            <div className="text-[10px] font-mono text-slate-500 font-semibold">
              {certificateNumber}
            </div>
            <div className="text-[9px] text-slate-400">
              Validación en línea SOFIA Plus
            </div>
          </div>

          {/* Signee 2 */}
          <div className="space-y-1">
            <div className="w-36 h-10 mx-auto border-b border-slate-400 flex items-center justify-center font-serif italic text-slate-700 text-sm">
              Martha L. Ospina
            </div>
            <div className="text-[11px] font-bold text-slate-800 uppercase">Coordinación Académica</div>
            <div className="text-[10px] text-slate-500">Gestión de la Formación</div>
          </div>
        </div>

        {/* Date stamped */}
        <div className="mt-6 text-[11px] text-slate-500">
          Expedido válidamente en Colombia el <strong className="text-slate-700">{issueDate}</strong>. Documento oficial generado en plataforma de inducción.
        </div>
      </div>
    </div>
  );
};
