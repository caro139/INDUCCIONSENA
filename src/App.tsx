/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InductionProvider, useInduction } from './context/InductionContext';
import { useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { RoleEntryScreen } from './components/RoleEntryScreen';
import { HeroSection } from './components/HeroSection';
import { ModuleIdentity } from './components/ModuleIdentity';
import { ModuleRegulation } from './components/ModuleRegulation';
import { ModulePathways } from './components/ModulePathways';
import { ModuleDilemmas } from './components/ModuleDilemmas';
import { ModuleAssessment } from './components/ModuleAssessment';
import { CertificateView } from './components/CertificateView';
import { InstructorDashboard } from './components/InstructorDashboard';
import { ProfileEditModal } from './components/ProfileEditModal';
import { Footer } from './components/Footer';
import { 
  BookOpen, 
  Scale, 
  Briefcase, 
  HelpCircle, 
  Award, 
  FileCheck
} from 'lucide-react';
import { InductionSection } from './types/induction';

const MainContent: React.FC = () => {
  const { 
    role, 
    activeSection, 
    setActiveSection, 
    completedModules, 
    isThemeBlurring, 
    showRoleSelection 
  } = useInduction();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // If user is at the start of the prototype, render the initial two-box role entry screen
  if (showRoleSelection) {
    return <RoleEntryScreen />;
  }

  const apprenticeTabs: { id: InductionSection; label: string; icon: React.ReactNode }[] = [
    { id: 'reglamento', label: '1. Reglamento del Aprendiz', icon: <Scale className="w-4 h-4" /> },
    { id: 'identidad', label: '2. Identidad & Símbolos', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'ruta-formativa', label: '3. Etapa Productiva', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'dilemas', label: '4. Casos Prácticos', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'evaluacion', label: '5. Evaluación de Apropiación', icon: <Award className="w-4 h-4 text-[#39A900]" /> },
    { id: 'certificado', label: '6. Certificado Oficial', icon: <FileCheck className="w-4 h-4" /> },
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 theme-blur-transition ${isThemeBlurring ? 'theme-is-blurring' : ''}`}>
      {/* Visual Blur Glass Overlay during theme toggle */}
      {isThemeBlurring && (
        <div 
          aria-hidden="true" 
          className="fixed inset-0 z-50 pointer-events-none backdrop-blur-md bg-black/5 dark:bg-white/5 transition-opacity duration-300"
        />
      )}

      {/* Header */}
      <Header onOpenProfile={() => setIsProfileOpen(true)} />

      {/* Hero section shown only in apprentice view when exploring modules, not during evaluation or standalone certificate */}
      {role === 'aprendiz' && activeSection !== 'certificado' && activeSection !== 'evaluacion' && (
        <HeroSection onOpenProfile={() => setIsProfileOpen(true)} />
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Subnavigation Bar for Apprentice */}
        {role === 'aprendiz' && (
          <div className="mb-8 bg-white dark:bg-slate-900/90 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-1 overflow-x-auto print:hidden">
            {apprenticeTabs.map((tab) => {
              const isActive = activeSection === tab.id;
              const isDone = completedModules[tab.id];

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? tab.id === 'evaluacion'
                        ? 'bg-[#39A900] text-white shadow-xs'
                        : 'bg-[#00324D] dark:bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={isActive ? 'text-white' : tab.id === 'evaluacion' ? 'text-[#39A900]' : 'text-slate-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  {isDone && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Section View Router */}
        {role === 'instructor' || activeSection === 'panel-instructor' ? (
          <InstructorDashboard />
        ) : (
          <>
            {activeSection === 'evaluacion' && <ModuleAssessment />}
            {activeSection === 'identidad' && <ModuleIdentity />}
            {(activeSection === 'reglamento' || activeSection === 'derechos' || activeSection === 'deberes') && <ModuleRegulation />}
            {activeSection === 'ruta-formativa' && <ModulePathways />}
            {activeSection === 'dilemas' && <ModuleDilemmas />}
            {activeSection === 'certificado' && <CertificateView />}
          </>
        )}
      </main>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <InductionProvider>
      <MainContent />
    </InductionProvider>
  );
}
