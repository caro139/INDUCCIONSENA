import React from 'react';
import { useInduction } from '../context/InductionContext';
import { SenaLogo } from './SenaLogo';

export const Footer: React.FC = () => {
  const { setActiveSection, setRole } = useInduction();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 print:hidden mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center p-0.5 bg-white/10 rounded-lg">
                <SenaLogo className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight">SENA Colombia</div>
                <div className="text-slate-400 text-[10px]">Servicio Nacional de Aprendizaje</div>
              </div>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Entidad pública adscrita al Ministerio del Trabajo. Formación profesional integral 100% gratuita.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="text-white font-semibold text-xs uppercase tracking-wider">Módulos de Inducción</div>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => { setRole('aprendiz'); setActiveSection('identidad'); }} className="hover:text-white transition-colors">
                  1. Identidad e Institucionalidad
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('aprendiz'); setActiveSection('reglamento'); }} className="hover:text-white transition-colors text-[#39A900] font-medium">
                  2. Reglamento del Aprendiz (Acuerdo 0009/2024)
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('aprendiz'); setActiveSection('ruta-formativa'); }} className="hover:text-white transition-colors">
                  3. Etapa Productiva & Bienestar
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('aprendiz'); setActiveSection('dilemas'); }} className="hover:text-white transition-colors">
                  4. Casos Prácticos y Dilemas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="text-white font-semibold text-xs uppercase tracking-wider">Herramientas de Inducción</div>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => { setRole('aprendiz'); setActiveSection('dilemas'); }} className="hover:text-white transition-colors">
                  Simulador de Casos Prácticos
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('aprendiz'); setActiveSection('evaluacion'); }} className="hover:text-white transition-colors">
                  Evaluación de Apropiación
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('aprendiz'); setActiveSection('certificado'); }} className="hover:text-white transition-colors">
                  Certificado de Inducción
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('instructor'); setActiveSection('panel-instructor'); }} className="hover:text-white transition-colors">
                  Panel del Instructor
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2 text-[11px]">
            <div className="text-white font-semibold text-xs uppercase tracking-wider">Atención al Ciudadano</div>
            <div>Bogotá: (601) 343 0111</div>
            <div>Línea gratuita nacional: 01 8000 910 270</div>
            <div>Horario: Lunes a Viernes 7:00 a.m. a 7:00 p.m.</div>
            <div className="pt-2 text-slate-500">
              Calle 57 No. 8 - 69, Bogotá D.C. - Colombia
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} Servicio Nacional de Aprendizaje SENA · Proceso de Inducción de Aprendices
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Reglamento del Aprendiz (Acuerdo 0009 de 2024)</span>
            <span aria-hidden="true">·</span>
            <span>Código de Integridad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
