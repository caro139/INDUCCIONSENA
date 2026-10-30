import React, { useState } from 'react';
import { useInduction } from '../context/InductionContext';
import { ApprenticeProfile } from '../types/induction';
import { 
  Users, 
  Search, 
  Download, 
  UserPlus, 
  RotateCcw, 
  FileEdit, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Award,
  Filter,
  Eye,
  X,
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  Cloud,
  Copy,
  Check,
  CheckCircle,
  Link as LinkIcon,
  LogOut
} from 'lucide-react';
import { SENA_REGIONALES, SENA_PROGRAMS, ASSESSMENT_QUESTIONS } from '../data/senaData';

export const InstructorDashboard: React.FC = () => {
  const { 
    cohort, 
    addApprentice, 
    assignImprovementPlan, 
    resetApprenticeAttempt, 
    exportCohortCSV,
    setCurrentApprentice,
    setActiveSection,
    setRole,
    sheetsConfig,
    connectGoogleWorkspace,
    disconnectGoogleWorkspace,
    createSpreadsheetInDrive,
    setCustomSpreadsheetId,
    syncFullCohortToGoogleSheets
  } = useInduction();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApprenticeForPlan, setSelectedApprenticeForPlan] = useState<ApprenticeProfile | null>(null);
  const [planNote, setPlanNote] = useState('');
  const [inspectApprentice, setInspectApprentice] = useState<ApprenticeProfile | null>(null);

  // Google Sheets local UI state
  const [showManualIdModal, setShowManualIdModal] = useState(false);
  const [manualIdInput, setManualIdInput] = useState(sheetsConfig.spreadsheetId || '');
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // New apprentice form state
  const [newFullName, setNewFullName] = useState('');
  const [newDocType, setNewDocType] = useState<'CC' | 'TI' | 'CE' | 'PEP'>('CC');
  const [newDocNumber, setNewDocNumber] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newFicha, setNewFicha] = useState('2834920');
  const [newProgram, setNewProgram] = useState(SENA_PROGRAMS[0]);
  const [newRegional, setNewRegional] = useState('Regional Tolima');
  const [newCenter, setNewCenter] = useState('Centro de Industria y Construcción - Regional Tolima');

  // Stats calculation
  const total = cohort.length;
  const approved = cohort.filter(a => a.status === 'Aprobado').length;
  const improvement = cohort.filter(a => a.status === 'Plan de Mejoramiento').length;
  const inProgress = cohort.filter(a => a.status === 'En proceso' || a.status === 'Sin iniciar').length;
  
  const evaluatedCount = cohort.filter(a => a.score !== undefined).length;
  const avgScore = evaluatedCount > 0 
    ? Math.round(cohort.reduce((acc, a) => acc + (a.score || 0), 0) / evaluatedCount) 
    : 0;

  const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;

  // Filtered apprentices
  const filteredCohort = cohort.filter(a => {
    const matchesSearch = 
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.docNumber.includes(search) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.ficha.includes(search);

    const matchesStatus = statusFilter === 'Todos' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newDocNumber) return;

    addApprentice({
      fullName: newFullName,
      docType: newDocType,
      docNumber: newDocNumber,
      email: newEmail || `${newDocNumber}@soy.sena.edu.co`,
      ficha: newFicha,
      program: newProgram,
      regional: newRegional,
      center: newCenter,
      enrollmentDate: new Date().toISOString().slice(0, 10),
    });

    setNewFullName('');
    setNewDocNumber('');
    setNewEmail('');
    setShowAddModal(false);
  };

  const handleAssignPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApprenticeForPlan) return;
    assignImprovementPlan(selectedApprenticeForPlan.id, planNote);
    setSelectedApprenticeForPlan(null);
    setPlanNote('');
  };

  const handleSimulateAsApprentice = (apprentice: ApprenticeProfile) => {
    setCurrentApprentice(apprentice);
    setRole('aprendiz');
    setActiveSection('identidad');
  };

  const handleConnectGoogle = async () => {
    try {
      await connectGoogleWorkspace();
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleCreateSheet = async () => {
    setIsCreatingSheet(true);
    try {
      await createSpreadsheetInDrive();
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsCreatingSheet(false);
    }
  };

  const handleSyncAll = async () => {
    setIsSyncingAll(true);
    try {
      await syncFullCohortToGoogleSheets();
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSyncingAll(false);
    }
  };

  const handleCopyId = () => {
    if (sheetsConfig.spreadsheetId) {
      navigator.clipboard?.writeText(sheetsConfig.spreadsheetId);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleSaveManualId = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomSpreadsheetId(manualIdInput);
    setShowManualIdModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Title & Action Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#00324D] tracking-wider uppercase">
            Gestión y Control de Cohortes
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Panel del Instructor y Gestor de Inducción
          </h2>
          <p className="mt-1 text-slate-600 text-xs sm:text-sm">
            Monitorea el avance de apropiación del Reglamento del Aprendiz, asigna planes de mejoramiento y exporta métricas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#39A900] hover:bg-[#2d8500] text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Inscribir Aprendiz</span>
          </button>

          <button
            onClick={exportCohortCSV}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Google Drive & Google Sheets Real-time Synchronization Card */}
      <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm overflow-hidden transition-all">
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-50/70 via-white to-slate-50/50 border-b border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#39A900]/15 text-[#39A900] flex items-center justify-center shrink-0 border border-[#39A900]/25">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-slate-900">
                  Sincronización en Tiempo Real con Google Drive
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Google Sheets v4 API
                </span>
                {sheetsConfig.syncStatus === 'syncing' && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-100 text-sky-800 animate-pulse">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Sincronizando...
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                Los datos de los aprendices (identificación, datos personales, avance y puntaje de apropiación) se actualizan en tu hoja de cálculo al momento de registrarse y al finalizar su evaluación.
              </p>
            </div>
          </div>

          {/* Connection status badge */}
          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            {sheetsConfig.instructorGoogleEmail ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 text-xs text-emerald-900">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium truncate max-w-[170px]" title={sheetsConfig.instructorGoogleEmail}>
                  {sheetsConfig.instructorGoogleEmail}
                </span>
                <button
                  onClick={disconnectGoogleWorkspace}
                  title="Desconectar cuenta Google"
                  className="ml-1 text-slate-400 hover:text-rose-600 transition-colors p-0.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                <Cloud className="w-3.5 h-3.5 text-slate-400" />
                No conectado a Google
              </span>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-6 bg-white space-y-4">
          {!sheetsConfig.instructorGoogleEmail ? (
            /* Prompt to Connect Google Workspace */
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="space-y-1">
                <div className="text-sm font-semibold text-slate-900">
                  Conecta tu cuenta Google del Instructor
                </div>
                <div className="text-xs text-slate-600 max-w-xl">
                  Autoriza el acceso a Google Drive y Google Sheets con un solo clic para generar la hoja de cálculo de inducción oficial y recibir cada respuesta en tiempo real.
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={handleConnectGoogle}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#00324D] hover:bg-[#002235] text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Conectar Cuenta Google</span>
                </button>
                <button
                  onClick={() => setShowManualIdModal(true)}
                  className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  title="Vincular ID existente de hoja de cálculo"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Vincular ID</span>
                </button>
              </div>
            </div>
          ) : !sheetsConfig.spreadsheetId ? (
            /* Connected but Sheet not yet created */
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="space-y-1">
                <div className="text-sm font-semibold text-amber-900 flex items-center gap-2">
                  <span>Cuenta vinculada con éxito</span>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-xs text-amber-800">
                  Crea ahora la hoja de cálculo estructurada en tu Google Drive. Se aplicará el encabezado verde institucional SENA y se sincronizarán los {cohort.length} aprendices actuales.
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={handleCreateSheet}
                  disabled={isCreatingSheet}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#39A900] hover:bg-[#2d8500] text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isCreatingSheet ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Creando en Drive...</span>
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Crear Hoja en Google Drive</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowManualIdModal(true)}
                  className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span>Pegar ID</span>
                </button>
              </div>
            </div>
          ) : (
            /* Active Sync Information & Controls */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Col 1: Spreadsheet links */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Hoja de Cálculo Activa
                    </div>
                    <div className="text-xs font-mono text-slate-700 mt-1 flex items-center gap-2">
                      <span className="truncate max-w-[180px]">ID: {sheetsConfig.spreadsheetId}</span>
                      <button
                        onClick={handleCopyId}
                        className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 transition-colors"
                        title="Copiar ID de la hoja"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={sheetsConfig.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${sheetsConfig.spreadsheetId}/edit`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#39A900] hover:bg-[#2d8500] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir en Google Drive</span>
                    </a>
                    <button
                      onClick={() => setShowManualIdModal(true)}
                      className="px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-600 text-xs rounded-lg transition-colors"
                      title="Cambiar ID de la hoja"
                    >
                      Cambiar
                    </button>
                  </div>
                </div>

                {/* Col 2: Sync triggers */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Modo de Sincronización
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs font-medium text-slate-800">
                        Automático bidireccional
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Disparadores: 1) Registro de aprendiz · 2) Finalización de evaluación
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600">
                    Última sincro: <strong className="text-slate-800">{sheetsConfig.lastSyncedAt || 'Iniciando'}</strong>
                  </div>
                </div>

                {/* Col 3: Manual full batch sync */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Acción Manual
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      Sincroniza en bloque todos los {cohort.length} registros de la cohorte actual con Google Sheets.
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={handleSyncAll}
                      disabled={isSyncingAll}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-[#39A900] ${isSyncingAll ? 'animate-spin' : ''}`} />
                      <span>{isSyncingAll ? 'Sincronizando cohorte...' : 'Sincronizar Toda la Cohorte'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {sheetsConfig.errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center justify-between">
                  <span>{sheetsConfig.errorMessage}</span>
                  <button
                    onClick={handleSyncAll}
                    className="font-semibold underline ml-2 hover:text-rose-900"
                  >
                    Reintentar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cohort KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Aprendices</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{total}</div>
          <div className="text-[11px] text-slate-500 mt-1">Fichas activas en inducción</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Tasa de Apropiación</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 tabular-nums">{approvalRate}%</div>
          <div className="text-[11px] text-slate-500 mt-1">{approved} de {total} aprobados</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Promedio General</span>
            <Award className="w-4 h-4 text-[#00324D]" />
          </div>
          <div className="text-2xl font-bold text-[#00324D] tabular-nums">{avgScore}%</div>
          <div className="text-[11px] text-slate-500 mt-1">Sobre evaluaciones presentadas</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Planes de Mejora</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-700 tabular-nums">{improvement}</div>
          <div className="text-[11px] text-slate-500 mt-1">Requieren refuerzo pedagógico</div>
        </div>
      </div>

      {/* Cohort Diagnostic Insight */}
      <div className="p-5 bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-100 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Diagnóstico Pedagógico de Apropiación
          </h4>
          <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
            La mayoría de los aprendices han mostrado apropiación sólida en <strong>Identidad Institucional</strong> y <strong>Modalidades de Etapa Productiva</strong>. Se sugiere reforzar en las sesiones presenciales el <em>Capítulo IV: Clasificación de Faltas y Plazos de Inasistencias (3 días hábiles)</em>.
          </p>
        </div>
        <div className="text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 shrink-0">
          Evaluación: 10 reactivos activos
        </div>
      </div>

      {/* Apprentices Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filter Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, documento o ficha..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] focus:border-[#39A900]"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto">
            {['Todos', 'Aprobado', 'Plan de Mejoramiento', 'En proceso', 'Sin iniciar'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase">
              <tr>
                <th className="px-5 py-3">Aprendiz</th>
                <th className="px-5 py-3">Ficha / Programa</th>
                <th className="px-5 py-3">Estado</th>
                <th className="px-5 py-3">Calificación</th>
                <th className="px-5 py-3">Fecha</th>
                <th className="px-5 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCohort.map((apprentice) => {
                const isPassed = apprentice.status === 'Aprobado';
                const isImprovement = apprentice.status === 'Plan de Mejoramiento';

                return (
                  <tr key={apprentice.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-slate-900">{apprentice.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {apprentice.docType}: {apprentice.docNumber} · {apprentice.email}
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="font-mono font-semibold text-slate-800">{apprentice.ficha}</div>
                      <div className="text-[11px] text-slate-500 max-w-xs truncate">{apprentice.program}</div>
                    </td>

                    <td className="px-5 py-3.5 whitespace-nowrap">
                      {isPassed ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />
                          Competente
                        </span>
                      ) : isImprovement ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          Plan de Mejora
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                          {apprentice.status}
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-3.5 whitespace-nowrap font-mono tabular-nums">
                      {apprentice.score !== undefined ? (
                        <span className={`font-bold ${apprentice.score >= 80 ? 'text-[#39A900]' : 'text-amber-700'}`}>
                          {apprentice.score}%
                        </span>
                      ) : (
                        <span className="text-slate-400">Pendiente</span>
                      )}
                    </td>

                    <td className="px-5 py-3.5 whitespace-nowrap text-slate-500 text-[11px]">
                      {apprentice.completedAt || apprentice.enrollmentDate}
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View test summary */}
                        <button
                          onClick={() => setInspectApprentice(apprentice)}
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                          title="Ver detalle del aprendiz"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Assign improvement plan */}
                        <button
                          onClick={() => {
                            setSelectedApprenticeForPlan(apprentice);
                            setPlanNote(apprentice.instructorNotes || '');
                          }}
                          className="p-1.5 text-amber-700 hover:bg-amber-50 rounded-md transition-colors"
                          title="Asignar o editar plan de mejoramiento"
                        >
                          <FileEdit className="w-4 h-4" />
                        </button>

                        {/* Reset attempt */}
                        <button
                          onClick={() => resetApprenticeAttempt(apprentice.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="Reiniciar intento de evaluación"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>

                        {/* Simulate as this apprentice */}
                        <button
                          onClick={() => handleSimulateAsApprentice(apprentice)}
                          className="px-2 py-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
                          title="Ver interfaz como este aprendiz"
                        >
                          Simular
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredCohort.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            No se encontraron aprendices coincidentes con los filtros aplicados.
          </div>
        )}
      </div>

      {/* Modal: Inscribir Aprendiz */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Inscribir Nuevo Aprendiz</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="Ej. Andrés Felipe Moreno Rivas"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tipo Doc</label>
                  <select
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="CC">Cédula (CC)</option>
                    <option value="TI">Tarjeta Id (TI)</option>
                    <option value="CE">Cédula Ext (CE)</option>
                    <option value="PEP">PEP</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">Número de Documento *</label>
                  <input
                    type="text"
                    required
                    value={newDocNumber}
                    onChange={(e) => setNewDocNumber(e.target.value)}
                    placeholder="1029384756"
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Correo Institucional</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="ejemplo@soy.sena.edu.co"
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Ficha</label>
                  <input
                    type="text"
                    value={newFicha}
                    onChange={(e) => setNewFicha(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">Programa</label>
                  <select
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white truncate"
                  >
                    {SENA_PROGRAMS.map(prog => (
                      <option key={prog} value={prog}>{prog}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#39A900] hover:bg-[#2d8500] text-white rounded-lg font-bold shadow-xs"
                >
                  Guardar e Inscribir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Asignar Plan de Mejoramiento */}
      {selectedApprenticeForPlan && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Plan de Mejoramiento Pedagógico
              </h3>
              <button
                onClick={() => setSelectedApprenticeForPlan(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600">
              Aprendiz: <strong className="text-slate-900">{selectedApprenticeForPlan.fullName}</strong> ({selectedApprenticeForPlan.ficha})
            </div>

            <form onSubmit={handleAssignPlan} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Actividades y compromisos de refuerzo acordados:
                </label>
                <textarea
                  rows={4}
                  required
                  value={planNote}
                  onChange={(e) => setPlanNote(e.target.value)}
                  placeholder="Ej. Desarrollar el taller complementario de apropiación sobre el Capítulo IV del Reglamento (Faltas y Sanciones) y volver a presentar la evaluación en 48 horas..."
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedApprenticeForPlan(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold shadow-xs"
                >
                  Asignar Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Inspeccionar Detalle del Aprendiz */}
      {inspectApprentice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Ficha del Aprendiz
              </h3>
              <button
                onClick={() => setInspectApprentice(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <div className="text-slate-500">Nombre Completo:</div>
                <div className="text-sm font-bold text-slate-900">{inspectApprentice.fullName}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-slate-500">Identificación:</div>
                  <div className="font-semibold">{inspectApprentice.docType} {inspectApprentice.docNumber}</div>
                </div>
                <div>
                  <div className="text-slate-500">Ficha:</div>
                  <div className="font-mono font-semibold">{inspectApprentice.ficha}</div>
                </div>
              </div>

              <div>
                <div className="text-slate-500">Programa:</div>
                <div className="font-semibold">{inspectApprentice.program}</div>
              </div>

              <div>
                <div className="text-slate-500">Regional y Centro:</div>
                <div>{inspectApprentice.regional} · {inspectApprentice.center}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-slate-500">Desempeño en Inducción:</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  Estado: {inspectApprentice.status} ({inspectApprentice.score !== undefined ? `${inspectApprentice.score}%` : 'Sin presentar'})
                </div>
                {inspectApprentice.instructorNotes && (
                  <div className="mt-2 text-amber-800 text-xs">
                    <strong>Notas del Instructor:</strong> {inspectApprentice.instructorNotes}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setInspectApprentice(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Vincular ID Manual de Hoja de Cálculo */}
      {showManualIdModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#39A900]" />
                <h3 className="text-base font-bold text-slate-900">
                  ID de Hoja en Google Drive
                </h3>
              </div>
              <button
                onClick={() => setShowManualIdModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveManualId} className="space-y-4 text-xs">
              <p className="text-slate-600">
                Pega el ID o la URL completa de tu Google Spreadsheet existente para vincularla a este panel.
              </p>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  ID o Enlace de la Hoja:
                </label>
                <input
                  type="text"
                  value={manualIdInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    // If full Google Sheets URL pasted, extract ID
                    const match = val.match(/\/d\/([a-zA-Z0-9-_]+)/);
                    if (match && match[1]) {
                      setManualIdInput(match[1]);
                    } else {
                      setManualIdInput(val);
                    }
                  }}
                  placeholder="Ej: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-[#39A900] focus:border-transparent outline-none"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Puedes pegar el enlace directo del navegador y extraeremos el ID automáticamente.
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowManualIdModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#39A900] hover:bg-[#2d8500] text-white rounded-lg font-semibold shadow-xs"
                >
                  Guardar y Vincular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
