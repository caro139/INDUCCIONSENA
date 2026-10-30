import React, { useState, useEffect } from 'react';
import { useInduction } from '../context/InductionContext';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { SenaLogo } from './SenaLogo';
import { 
  Award, 
  Users, 
  UserCheck, 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sun, 
  Moon,
  Sparkles,
  BookOpen,
  FileCheck,
  Briefcase,
  Lock,
  User,
  CreditCard,
  Building,
  Scale,
  Play,
  X,
  Film
} from 'lucide-react';

export const RoleEntryScreen: React.FC = () => {
  const { 
    selectRoleAndEnter, 
    setCurrentApprentice, 
    currentApprentice,
    theme, 
    toggleTheme 
  } = useInduction();
  const { signUp, signIn } = useAuth();

  // Floating Video Tutorial Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  // Close modal on Escape key press and prevent scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoModalOpen(false);
      }
    };
    if (isVideoModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoModalOpen]);

  // Apprentice form state
  const [apprenticeMode, setApprenticeMode] = useState<'login' | 'register'>('login');
  const [docType, setDocType] = useState<'CC' | 'TI' | 'CE' | 'PEP'>('CC');
  const [docNumber, setDocNumber] = useState<string>('1019283746');
  const [apprenticePassword, setApprenticePassword] = useState<string>('123456');
  const [fullName, setFullName] = useState<string>('Santiago Peña Castro');
  const [ficha, setFicha] = useState<string>('2834920');
  const [program, setProgram] = useState<string>('Tecnología en Análisis y Desarrollo de Software (ADSO)');
  const [apprenticeError, setApprenticeError] = useState<string | null>(null);
  const [isApprenticeLoading, setIsApprenticeLoading] = useState<boolean>(false);

  // Instructor form state
  const [instructorEmail, setInstructorEmail] = useState<string>('instructor.lider@sena.edu.co');
  const [instructorPassword, setInstructorPassword] = useState<string>('123456');
  const [isInstructorLoading, setIsInstructorLoading] = useState<boolean>(false);

  // Handle Apprentice Submit
  const handleApprenticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApprenticeError(null);
    setIsApprenticeLoading(true);

    const emailFormatted = `${docNumber.trim()}@aprendiz.sena.edu.co`;

    try {
      if (apprenticeMode === 'register') {
        try {
          await signUp(auth, emailFormatted, apprenticePassword);
        } catch (err: any) {
          // If already in use, attempt signIn or proceed
          if (err?.code === 'auth/email-already-in-use') {
            await signIn(auth, emailFormatted, apprenticePassword);
          } else {
            console.warn('Firebase register notice, continuing with local profile:', err?.message);
          }
        }
      } else {
        try {
          await signIn(auth, emailFormatted, apprenticePassword);
        } catch (err: any) {
          console.warn('Firebase login notice, continuing with local profile:', err?.message);
        }
      }

      // Update current apprentice profile in context
      setCurrentApprentice({
        id: `apr-${docNumber.trim() || Date.now()}`,
        fullName: fullName.trim() || 'Aprendiz SENA',
        docType: docType,
        docNumber: docNumber.trim() || '1019283746',
        email: emailFormatted,
        ficha: ficha.trim() || '2834920',
        program: program.trim() || 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
        regional: 'Regional Tolima',
        center: 'Centro de Industria y Construcción - Regional Tolima',
        enrollmentDate: new Date().toISOString().slice(0, 10),
        status: currentApprentice.status || 'En proceso',
        attemptsCount: currentApprentice.attemptsCount || 0
      });

      // Pass directly to the Regulation module in apprentice role as requested
      selectRoleAndEnter('aprendiz', 'reglamento');
    } catch (err: any) {
      setApprenticeError(err?.message || 'Error al procesar el ingreso');
    } finally {
      setIsApprenticeLoading(false);
    }
  };

  // Quick Demo Access for Apprentice
  const handleQuickApprenticeAccess = () => {
    selectRoleAndEnter('aprendiz', 'reglamento');
  };

  // Handle Instructor Submit
  const handleInstructorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInstructorLoading(true);
    setTimeout(() => {
      selectRoleAndEnter('instructor', 'panel-instructor');
      setIsInstructorLoading(false);
    }, 200);
  };

  // Quick Demo Access for Instructor
  const handleQuickInstructorAccess = () => {
    selectRoleAndEnter('instructor', 'panel-instructor');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 transition-colors">
      {/* Top Bar with Logo and Theme Switcher */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center p-0.5">
              <SenaLogo className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                SENA Inducción
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-500 dark:text-slate-400">
                · Portal Institucional de Acceso
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 transition-all cursor-pointer shadow-2xs group"
              title="Ver video tutorial de inducción"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#39A900] dark:text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Video Tutorial</span>
            </button>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden md:inline">
              Acuerdo 0009 de 2024
            </span>
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="w-9 h-9 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col justify-center">
        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#39A900]/10 text-[#246900] dark:text-[#5ade16] border border-[#39A900]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sistema Integrado de Inducción y Apropiación</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Bienvenido al Portal de Inducción SENA
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Selecciona tu perfil de ingreso institucional. En el <strong className="text-[#39A900] dark:text-emerald-400">Rol de Aprendiz</strong> podrás acceder a los contenidos de formación y presentar la <strong className="text-slate-900 dark:text-white">Evaluación de Apropiación del Conocimiento</strong>.
          </p>

          {/* Botón Video Tutorial destacado en el Hero */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#39A900] to-[#2d8500] hover:from-[#2d8500] hover:to-[#226600] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-white" />
              </div>
              <span>Video Tutorial</span>
              <span className="text-[11px] font-normal text-emerald-100 bg-black/20 px-2.5 py-0.5 rounded-full">
                Guía interactiva (3:00 min)
              </span>
            </button>
          </div>
        </div>

        {/* Dual Role Selection Cards (Los dos cuadros de ingreso) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto w-full">
          
          {/* ========================================================
              CUADRO 1: INGRESO ROL APRENDIZ
             ======================================================== */}
          <div className="bg-white dark:bg-slate-850 rounded-2xl border-2 border-[#39A900] dark:border-emerald-500/80 shadow-md hover:shadow-lg transition-all flex flex-col overflow-hidden relative">
            {/* Top decorative accent bar */}
            <div className="h-2 bg-gradient-to-r from-[#39A900] via-emerald-400 to-[#00324D]" />

            <div className="p-6 sm:p-8 flex-1 flex flex-col">
              {/* Header Badge & Title */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-[#1a5b00] dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                    <UserCheck className="w-3.5 h-3.5" />
                    Rol Aprendiz
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                    Ingreso como Aprendiz
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Presentación de la evaluación de apropiación y certificación de inducción.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0 text-[#39A900]">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>

              {/* Special Regulation & Induction Notice Banner */}
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/80 mb-5 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2.5">
                <Scale className="w-5 h-5 text-[#39A900] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold">
                    Módulo Reglamento del Aprendiz (Acuerdo 0009 de 2024)
                  </strong>
                  Al ingresar accederás a la inducción integral del reglamento: Derechos y Deberes, Definiciones Clave, Ciclo de Ingreso, Permanencia y Certificación, y Régimen de Faltas, Medidas Formativas y Sancionatorias.
                </div>
              </div>

              {/* Mode Toggle: Iniciar Sesión vs Registro */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-4 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setApprenticeMode('login')}
                  className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                    apprenticeMode === 'login'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Ingreso con Documento
                </button>
                <button
                  type="button"
                  onClick={() => setApprenticeMode('register')}
                  className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                    apprenticeMode === 'register'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Crear Registro
                </button>
              </div>

              {apprenticeError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-xs text-rose-700 dark:text-rose-300 mb-4">
                  {apprenticeError}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleApprenticeSubmit} className="space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {apprenticeMode === 'register' && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Nombre Completo del Aprendiz
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Ej: Santiago Peña Castro"
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Ficha de Formación
                          </label>
                          <input
                            type="text"
                            required
                            value={ficha}
                            onChange={(e) => setFicha(e.target.value)}
                            placeholder="Ej: 2834920"
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Programa
                          </label>
                          <input
                            type="text"
                            required
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                            placeholder="ADSO / Técnico..."
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Document Type & Number */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Tipo Doc.
                      </label>
                      <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value as any)}
                        className="w-full px-2 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      >
                        <option value="CC">CC</option>
                        <option value="TI">TI</option>
                        <option value="CE">CE</option>
                        <option value="PEP">PEP</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Documento de Identidad
                      </label>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={docNumber}
                          onChange={(e) => setDocNumber(e.target.value)}
                          placeholder="Ej: 1019283746"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Contraseña de Acceso
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="password"
                        required
                        value={apprenticePassword}
                        onChange={(e) => setApprenticePassword(e.target.value)}
                        placeholder="Contraseña"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit & Demo buttons */}
                <div className="pt-4 space-y-2">
                  <button
                    type="submit"
                    disabled={isApprenticeLoading}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#39A900] hover:bg-[#2d8500] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Scale className="w-4 h-4" />
                    <span>
                      {apprenticeMode === 'register' 
                        ? 'Registrarme e Ingresar al Módulo Reglamento' 
                        : 'Ingresar al Módulo Reglamento'}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickApprenticeAccess}
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Acceso Rápido Demo (Módulo Reglamento · ADSO)</span>
                  </button>
                </div>
              </form>

              {/* Module Highlights */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                  <span>Derechos, deberes y prohibiciones expresas del aprendiz</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                  <span>Definiciones, ciclo de permanencia y causales de deserción</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                  <span>Régimen de faltas, medidas formativas pedagógicas y sanciones</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              CUADRO 2: INGRESO ROL INSTRUCTOR
             ======================================================== */}
          <div className="bg-white dark:bg-slate-850 rounded-2xl border-2 border-[#00324D] dark:border-sky-600/80 shadow-md hover:shadow-lg transition-all flex flex-col overflow-hidden relative">
            {/* Top decorative accent bar */}
            <div className="h-2 bg-gradient-to-r from-[#00324D] via-sky-600 to-[#39A900]" />

            <div className="p-6 sm:p-8 flex-1 flex flex-col">
              {/* Header Badge & Title */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-[#00324D] dark:text-sky-300 border border-slate-300 dark:border-slate-700">
                    <Users className="w-3.5 h-3.5" />
                    Rol Instructor
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                    Ingreso como Instructor
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Supervisión de cohortes, planes de mejoramiento y reportes analíticos.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center shrink-0 text-[#00324D] dark:text-sky-400">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>

              {/* Special Instructor Notice Banner */}
              <div className="p-3.5 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800/80 mb-5 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#00324D] dark:text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold">
                    Panel de Gestión y Cohortes
                  </strong>
                  Acceso al registro consolidado de aprendices, seguimiento a resultados evaluativos y formulación de planes de mejoramiento.
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleInstructorSubmit} className="space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Correo Institucional o Usuario SENA
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={instructorEmail}
                        onChange={(e) => setInstructorEmail(e.target.value)}
                        placeholder="instructor.lider@sena.edu.co"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00324D] dark:focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Contraseña de Instructor
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="password"
                        required
                        value={instructorPassword}
                        onChange={(e) => setInstructorPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00324D] dark:focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      Capacidades habilitadas para el instructor:
                    </div>
                    <p>· Visualización de puntajes, intentos y estado de la cohorte.</p>
                    <p>· Registro de observaciones pedagógicas y planes de acción.</p>
                    <p>· Exportación de la base de datos de inducción a CSV.</p>
                  </div>
                </div>

                {/* Submit & Demo buttons */}
                <div className="pt-4 space-y-2">
                  <button
                    type="submit"
                    disabled={isInstructorLoading}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#00324D] hover:bg-[#002236] dark:bg-sky-600 dark:hover:bg-sky-500 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Users className="w-4 h-4" />
                    <span>Ingresar al Panel de Instructor</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickInstructorAccess}
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-sky-800 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900/40 border border-sky-200 dark:border-sky-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00324D] dark:text-sky-400" />
                    <span>Acceso Directo como Instructor (Coordinación)</span>
                  </button>
                </div>
              </form>

              {/* Module Highlights */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00324D] dark:text-sky-400 shrink-0" />
                  <span>Gestión del Comité de Evaluación y Seguimiento</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00324D] dark:text-sky-400 shrink-0" />
                  <span>Seguimiento a deserción e inasistencias injustificadas</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Information */}
        <div className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            Servicio Nacional de Aprendizaje SENA · Dirección de Formación Profesional
          </p>
          <p>
            Plataforma Pedagógica y Normativa conforme al Acuerdo 0009 de 2024 · República de Colombia
          </p>
        </div>
      </main>

      {/* ========================================================
          VENTANA FLOTANTE: VIDEO TUTORIAL INTERACTIVO CON CONTROLES
         ======================================================== */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all"
          onClick={() => setIsVideoModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-tutorial-title"
        >
          <div 
            className="relative bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-850 border-b border-slate-700/70">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#39A900]/20 border border-[#39A900]/40 flex items-center justify-center shrink-0 text-[#39A900]">
                  <Film className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 id="video-tutorial-title" className="text-sm sm:text-base font-bold text-white truncate">
                      Video Tutorial: Inducción y Uso de la Plataforma
                    </h3>
                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#39A900]/20 text-[#5ade16] border border-[#39A900]/30">
                      SENA Oficial
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    Aprende a navegar los módulos, resolver los simuladores y superar la evaluación de apropiación.
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-3"
                aria-label="Cerrar video tutorial"
                title="Cerrar (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Area with native playback controls */}
            <div className="bg-black flex items-center justify-center relative overflow-hidden">
              <video
                src="/assets/aistudio/2026__13_32_aa535161.mp4"
                controls
                autoPlay
                playsInline
                className="w-full max-h-[62vh] aspect-video object-contain bg-black shadow-inner"
              >
                Tu navegador no soporta la reproducción de video HTML5.
              </video>
            </div>

            {/* Modal Footer / Navigation Guide */}
            <div className="px-4 sm:px-6 py-3 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#39A900] animate-pulse" />
                <span>
                  <strong>Ruta Verde SENA:</strong> 1. Identidad · 2. Reglamento · 3. Casos · 4. Evaluación de Apropiación
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#39A900] hover:bg-[#2d8500] transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                Continuar a la Inducción
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
