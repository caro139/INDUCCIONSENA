import React from 'react';
import { useInduction } from '../context/InductionContext';
import { InductionSection } from '../types/induction';
import { Award, UserCheck, ShieldCheck, Users, Sun, Moon, Home, ArrowLeftRight } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

export const Header: React.FC<{ onOpenProfile: () => void }> = ({ onOpenProfile }) => {
  const { 
    role, 
    setRole, 
    activeSection, 
    setActiveSection, 
    currentApprentice, 
    theme, 
    toggleTheme,
    setShowRoleSelection 
  } = useInduction();

  const handleNavClick = (section: InductionSection) => {
    setActiveSection(section);
  };

  const isApproved = currentApprentice.status === 'Aprobado';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 h-16 min-w-0">
          
          {/* Zone 1: Brand title with official SENA logo */}
          <div className="flex items-center shrink-0">
            <button 
              onClick={() => setShowRoleSelection(true)}
              className="text-left group flex items-center gap-2 sm:gap-2.5 focus:outline-none cursor-pointer"
              title="Volver a la pantalla inicial de roles"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center p-0.5 shrink-0">
                <SenaLogo className="w-full h-full object-contain" />
              </div>
              <div className="flex items-baseline">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#39A900] transition-colors whitespace-nowrap">
                  SENA Inducción
                </span>
                <span className="hidden xl:inline-block ml-2 text-xs text-slate-400">
                  Ruta de Apropiación
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Concise single-line text navigation links (1-2 words to prevent overflow) */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-xs xl:text-sm font-medium text-slate-600 dark:text-slate-300 shrink-0">
            <button
              onClick={() => handleNavClick('reglamento')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeSection === 'reglamento' || activeSection === 'derechos' || activeSection === 'deberes'
                  ? 'text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Reglamento
            </button>
            <button
              onClick={() => handleNavClick('identidad')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeSection === 'identidad'
                  ? 'text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Identidad
            </button>
            <button
              onClick={() => handleNavClick('ruta-formativa')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeSection === 'ruta-formativa'
                  ? 'text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Etapa Productiva
            </button>
            <button
              onClick={() => handleNavClick('dilemas')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeSection === 'dilemas'
                  ? 'text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Casos
            </button>
            <button
              onClick={() => handleNavClick('evaluacion')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1 ${
                activeSection === 'evaluacion'
                  ? 'text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#39A900]" />
              <span>Evaluación</span>
            </button>
          </nav>

          {/* Zone 3: Actions row, always fitting in a single line without wrapping */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Theme Toggle (Dark / Light) with Blur Transition */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="w-8 h-8 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center shrink-0 shadow-2xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#39A900]/50"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in fade-in duration-200" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 animate-in fade-in duration-200" />
              )}
            </button>

            {/* Back to Initial Role Screen */}
            <button
              onClick={() => setShowRoleSelection(true)}
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
              title="Volver a la primera pantalla de selección de rol"
            >
              <Home className="w-3.5 h-3.5 text-[#39A900]" />
              <span className="hidden md:inline">Roles / Inicio</span>
            </button>

            {role === 'aprendiz' ? (
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {isApproved && (
                  <button
                    onClick={() => setActiveSection('certificado')}
                    className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#39A900] bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors whitespace-nowrap shrink-0"
                    title="Ver mi Certificado de Inducción"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Certificado</span>
                  </button>
                )}

                {/* Botón oficial de Evaluación de Apropiación */}
                <button
                  onClick={() => setActiveSection('evaluacion')}
                  className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-1 shrink-0 cursor-pointer ${
                    activeSection === 'evaluacion'
                      ? 'bg-[#39A900] text-white shadow-xs'
                      : 'bg-[#39A900]/10 hover:bg-[#39A900]/20 text-[#246900] dark:text-[#5ade16] border border-[#39A900]/30'
                  }`}
                  title="Presentar Evaluación"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Evaluación</span>
                </button>

                <button
                  onClick={onOpenProfile}
                  className="px-2 py-1 text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-1 shrink-0"
                  title={`Perfil de ${currentApprentice.fullName}`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>Aprendiz</span>
                </button>

                <button
                  onClick={() => {
                    setRole('instructor');
                    setActiveSection('panel-instructor');
                  }}
                  className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-[#00324D] hover:bg-[#002236] rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-xs shrink-0"
                  title="Cambiar a vista de instructor"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Instructor</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  onClick={() => setActiveSection('panel-instructor')}
                  className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    activeSection === 'panel-instructor'
                      ? 'bg-slate-900 dark:bg-slate-700 text-white'
                      : 'text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200'
                  }`}
                >
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    setRole('aprendiz');
                    setActiveSection('reglamento');
                  }}
                  className="px-2.5 sm:px-3 py-1.5 text-xs font-medium text-white bg-[#39A900] hover:bg-[#2d8500] rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-xs shrink-0"
                  title="Volver al modo aprendiz"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Modo Aprendiz</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
