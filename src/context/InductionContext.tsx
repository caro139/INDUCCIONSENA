import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  InductionSection, 
  UserRole, 
  ApprenticeProfile, 
  EvaluationResult 
} from '../types/induction';
import { 
  INITIAL_APPRENTICES_COHORT,
  ASSESSMENT_QUESTIONS
} from '../data/senaData';
import { 
  signInWithGoogleWorkspace, 
  getCachedAccessToken, 
  createInductionSpreadsheet, 
  syncApprenticeToSheet, 
  syncCohortToSheet, 
  logoutGoogleWorkspace 
} from '../services/googleSheetsService';

export interface GoogleSheetsConfig {
  spreadsheetId: string | null;
  spreadsheetUrl: string | null;
  isSyncActive: boolean;
  lastSyncedAt: string | null;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  instructorGoogleEmail: string | null;
  errorMessage?: string | null;
}

interface InductionContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  showRoleSelection: boolean;
  setShowRoleSelection: (show: boolean) => void;
  selectRoleAndEnter: (selectedRole: UserRole, targetSection?: InductionSection) => void;
  activeSection: InductionSection;
  setActiveSection: (sec: InductionSection) => void;
  currentApprentice: ApprenticeProfile;
  setCurrentApprentice: (apprentice: ApprenticeProfile) => void;
  updateCurrentApprentice: (updates: Partial<ApprenticeProfile>) => void;
  cohort: ApprenticeProfile[];
  completedModules: Record<string, boolean>;
  markModuleCompleted: (moduleId: string) => void;
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isThemeBlurring: boolean;
  // Quiz
  userAnswers: Record<string, number>;
  setUserAnswer: (questionId: string, answerIndex: number) => void;
  evaluationResult: EvaluationResult | null;
  finishEvaluation: () => void;
  retakeEvaluation: () => void;
  // Instructor actions
  addApprentice: (apprentice: Omit<ApprenticeProfile, 'id' | 'status' | 'attemptsCount'>) => void;
  assignImprovementPlan: (apprenticeId: string, note: string) => void;
  resetApprenticeAttempt: (apprenticeId: string) => void;
  exportCohortCSV: () => void;
  // Google Sheets & Drive Sync
  sheetsConfig: GoogleSheetsConfig;
  connectGoogleWorkspace: () => Promise<boolean>;
  disconnectGoogleWorkspace: () => Promise<void>;
  createSpreadsheetInDrive: (title?: string) => Promise<string | null>;
  setCustomSpreadsheetId: (id: string) => void;
  syncApprenticeToGoogleSheets: (apprentice: ApprenticeProfile) => Promise<boolean>;
  syncFullCohortToGoogleSheets: () => Promise<boolean>;
}

const InductionContext = createContext<InductionContextType | undefined>(undefined);

const LOCAL_STORAGE_COHORT_KEY = 'sena_induction_cohort_v1';
const LOCAL_STORAGE_APP_KEY = 'sena_induction_curr_apprentice_v1';
const LOCAL_STORAGE_MODULES_KEY = 'sena_induction_modules_v1';
const LOCAL_STORAGE_THEME_KEY = 'sena_theme_v1';
const LOCAL_STORAGE_SHEETS_KEY = 'sena_induction_sheets_v1';

export const InductionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('aprendiz');
  const [activeSection, setActiveSection] = useState<InductionSection>('reglamento');
  const [showRoleSelection, setShowRoleSelection] = useState<boolean>(true);

  const [sheetsConfig, setSheetsConfig] = useState<GoogleSheetsConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SHEETS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      spreadsheetId: null,
      spreadsheetUrl: null,
      isSyncActive: true,
      lastSyncedAt: null,
      syncStatus: 'idle',
      instructorGoogleEmail: null,
      errorMessage: null
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SHEETS_KEY, JSON.stringify(sheetsConfig));
    } catch (e) {
      console.warn('Could not save sheets config to localStorage', e);
    }
  }, [sheetsConfig]);

  const selectRoleAndEnter = (selectedRole: UserRole, targetSection?: InductionSection) => {
    setRole(selectedRole);
    if (targetSection) {
      setActiveSection(targetSection);
    } else if (selectedRole === 'aprendiz') {
      setActiveSection('reglamento');
    } else {
      setActiveSection('panel-instructor');
    }
    setShowRoleSelection(false);
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // fallback
    }
    return 'light';
  });

  const [isThemeBlurring, setIsThemeBlurring] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    } catch {
      // fallback
    }
  }, [theme]);

  const toggleTheme = () => {
    setIsThemeBlurring(true);
    setTimeout(() => {
      setTheme(prev => {
        const next = prev === 'light' ? 'dark' : 'light';
        if (next === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        try {
          localStorage.setItem(LOCAL_STORAGE_THEME_KEY, next);
        } catch {}
        return next;
      });
    }, 100);

    setTimeout(() => {
      setIsThemeBlurring(false);
    }, 450);
  };

  const [currentApprentice, setCurrentApprenticeState] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_APP_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.center === 'Centro de Gestión de Mercados, Logística y TIC' || !parsed.center) {
          parsed.center = 'Centro de Industria y Construcción - Regional Tolima';
          parsed.regional = 'Regional Tolima';
          try {
            localStorage.setItem(LOCAL_STORAGE_APP_KEY, JSON.stringify(parsed));
          } catch {}
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return {
      id: "apr-current",
      fullName: "Santiago Peña Castro",
      docType: "CC",
      docNumber: "1019283746",
      email: "sapena061@soy.sena.edu.co",
      ficha: "2834920",
      program: "Tecnología en Análisis y Desarrollo de Software (ADSO)",
      regional: "Regional Tolima",
      center: "Centro de Industria y Construcción - Regional Tolima",
      enrollmentDate: "2026-10-25",
      status: "En proceso",
      attemptsCount: 0
    };
  });

  const [cohort, setCohort] = useState<ApprenticeProfile[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_COHORT_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_APPRENTICES_COHORT;
  });

  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_MODULES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      'identidad': true,
      'derechos': false,
      'deberes': false,
      'ruta-formativa': false,
      'dilemas': false
    };
  });

  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_COHORT_KEY, JSON.stringify(cohort));
    } catch (e) {
      console.warn('Could not save cohort to localStorage', e);
    }
  }, [cohort]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_APP_KEY, JSON.stringify(currentApprentice));
    } catch (e) {
      console.warn('Could not save current apprentice to localStorage', e);
    }
  }, [currentApprentice]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_MODULES_KEY, JSON.stringify(completedModules));
    } catch (e) {
      console.warn('Could not save completed modules to localStorage', e);
    }
  }, [completedModules]);

  const setCurrentApprentice = (apprentice: ApprenticeProfile) => {
    setCurrentApprenticeState(apprentice);
    syncApprenticeToGoogleSheets(apprentice);
  };

  const updateCurrentApprentice = (updates: Partial<ApprenticeProfile>) => {
    setCurrentApprenticeState(prev => {
      const updated = { ...prev, ...updates };
      // Also sync back to cohort if this id exists in cohort
      setCohort(cList => cList.map(c => c.id === prev.id ? updated : c));
      return updated;
    });
  };

  const markModuleCompleted = (moduleId: string) => {
    setCompletedModules(prev => ({
      ...prev,
      [moduleId]: true
    }));
  };

  const setUserAnswer = (questionId: string, answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const finishEvaluation = () => {
    let correct = 0;
    const catScores: Record<string, { correct: number; total: number }> = {};
    const incorrectCats: string[] = [];

    ASSESSMENT_QUESTIONS.forEach(q => {
      if (!catScores[q.category]) {
        catScores[q.category] = { correct: 0, total: 0 };
      }
      catScores[q.category].total += 1;

      const userAns = userAnswers[q.id];
      if (userAns === q.correctAnswer) {
        correct += 1;
        catScores[q.category].correct += 1;
      } else {
        if (!incorrectCats.includes(q.category)) {
          incorrectCats.push(q.category);
        }
      }
    });

    const total = ASSESSMENT_QUESTIONS.length;
    const scorePct = Math.round((correct / total) * 100);
    const passed = scorePct >= 80;

    const result: EvaluationResult = {
      score: scorePct,
      correctCount: correct,
      totalQuestions: total,
      isPassed: passed,
      completedAt: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }),
      categoryScores: catScores,
      userAnswers: { ...userAnswers }
    };

    setEvaluationResult(result);

    // Update current apprentice record
    const updatedStatus = passed ? 'Aprobado' : 'Plan de Mejoramiento';
    const updatedApprentice: ApprenticeProfile = {
      ...currentApprentice,
      status: updatedStatus,
      score: scorePct,
      completedAt: result.completedAt,
      attemptsCount: currentApprentice.attemptsCount + 1,
      answersSummary: {
        total,
        correct,
        incorrectCategories: incorrectCats
      }
    };

    setCurrentApprenticeState(updatedApprentice);
    syncApprenticeToGoogleSheets(updatedApprentice);

    // Update cohort list
    setCohort(prevCohort => {
      const existingIdx = prevCohort.findIndex(a => a.id === updatedApprentice.id || a.docNumber === updatedApprentice.docNumber);
      if (existingIdx >= 0) {
        const copy = [...prevCohort];
        copy[existingIdx] = updatedApprentice;
        return copy;
      } else {
        return [updatedApprentice, ...prevCohort];
      }
    });
  };

  const retakeEvaluation = () => {
    setUserAnswers({});
    setEvaluationResult(null);
  };

  const addApprentice = (newApp: Omit<ApprenticeProfile, 'id' | 'status' | 'attemptsCount'>) => {
    const fresh: ApprenticeProfile = {
      ...newApp,
      id: `apr-${Date.now()}`,
      status: 'Sin iniciar',
      attemptsCount: 0
    };
    setCohort(prev => [fresh, ...prev]);
  };

  const assignImprovementPlan = (apprenticeId: string, note: string) => {
    setCohort(prev => prev.map(a => {
      if (a.id === apprenticeId) {
        return {
          ...a,
          status: 'Plan de Mejoramiento',
          instructorNotes: note
        };
      }
      return a;
    }));

    if (currentApprentice.id === apprenticeId) {
      setCurrentApprenticeState(prev => ({
        ...prev,
        status: 'Plan de Mejoramiento',
        instructorNotes: note
      }));
    }
  };

  const resetApprenticeAttempt = (apprenticeId: string) => {
    setCohort(prev => prev.map(a => {
      if (a.id === apprenticeId) {
        return {
          ...a,
          status: 'En proceso',
          score: undefined,
          completedAt: undefined,
          answersSummary: undefined
        };
      }
      return a;
    }));

    if (currentApprentice.id === apprenticeId) {
      setUserAnswers({});
      setEvaluationResult(null);
      setCurrentApprenticeState(prev => ({
        ...prev,
        status: 'En proceso',
        score: undefined,
        completedAt: undefined,
        answersSummary: undefined
      }));
    }
  };

  const connectGoogleWorkspace = async (): Promise<boolean> => {
    try {
      setSheetsConfig(prev => ({ ...prev, syncStatus: 'syncing', errorMessage: null }));
      const result = await signInWithGoogleWorkspace();
      setSheetsConfig(prev => ({
        ...prev,
        instructorGoogleEmail: result.user.email || 'Instructor Autorizado',
        syncStatus: 'idle'
      }));
      return true;
    } catch (err: any) {
      setSheetsConfig(prev => ({
        ...prev,
        syncStatus: 'error',
        errorMessage: err?.message || 'Error al conectar con Google Workspace'
      }));
      return false;
    }
  };

  const disconnectGoogleWorkspace = async () => {
    await logoutGoogleWorkspace();
    setSheetsConfig(prev => ({
      ...prev,
      instructorGoogleEmail: null,
      syncStatus: 'idle'
    }));
  };

  const createSpreadsheetInDrive = async (title?: string): Promise<string | null> => {
    const token = getCachedAccessToken();
    if (!token) {
      setSheetsConfig(prev => ({ ...prev, syncStatus: 'error', errorMessage: 'Debes conectar tu cuenta Google del instructor primero.' }));
      return null;
    }
    try {
      setSheetsConfig(prev => ({ ...prev, syncStatus: 'syncing', errorMessage: null }));
      const defaultTitle = title || `SENA_Induccion_Cohorte_${currentApprentice.ficha || '2834920'}_${new Date().toISOString().slice(0, 10)}`;
      const result = await createInductionSpreadsheet(token, defaultTitle, cohort);
      const now = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
      setSheetsConfig(prev => ({
        ...prev,
        spreadsheetId: result.spreadsheetId,
        spreadsheetUrl: result.spreadsheetUrl,
        syncStatus: 'synced',
        lastSyncedAt: now,
        isSyncActive: true,
        errorMessage: null
      }));
      return result.spreadsheetId;
    } catch (err: any) {
      setSheetsConfig(prev => ({ ...prev, syncStatus: 'error', errorMessage: err?.message || 'Error al crear la hoja en Google Drive' }));
      return null;
    }
  };

  const setCustomSpreadsheetId = (id: string) => {
    const cleanId = id.trim();
    setSheetsConfig(prev => ({
      ...prev,
      spreadsheetId: cleanId || null,
      spreadsheetUrl: cleanId ? `https://docs.google.com/spreadsheets/d/${cleanId}/edit` : null,
      syncStatus: 'idle'
    }));
  };

  const syncApprenticeToGoogleSheets = async (apprentice: ApprenticeProfile): Promise<boolean> => {
    const token = getCachedAccessToken();
    const sheetId = sheetsConfig.spreadsheetId;
    if (!token || !sheetId || !sheetsConfig.isSyncActive) {
      return false;
    }
    try {
      setSheetsConfig(prev => ({ ...prev, syncStatus: 'syncing' }));
      const success = await syncApprenticeToSheet(token, sheetId, apprentice);
      if (success) {
        const now = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
        setSheetsConfig(prev => ({ ...prev, syncStatus: 'synced', lastSyncedAt: now, errorMessage: null }));
      } else {
        setSheetsConfig(prev => ({ ...prev, syncStatus: 'idle' }));
      }
      return success;
    } catch (err: any) {
      setSheetsConfig(prev => ({ ...prev, syncStatus: 'error', errorMessage: err?.message || 'Error al sincronizar fila en Google Sheets' }));
      return false;
    }
  };

  const syncFullCohortToGoogleSheets = async (): Promise<boolean> => {
    const token = getCachedAccessToken();
    const sheetId = sheetsConfig.spreadsheetId;
    if (!token || !sheetId) return false;
    try {
      setSheetsConfig(prev => ({ ...prev, syncStatus: 'syncing' }));
      const success = await syncCohortToSheet(token, sheetId, cohort);
      if (success) {
        const now = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
        setSheetsConfig(prev => ({ ...prev, syncStatus: 'synced', lastSyncedAt: now, errorMessage: null }));
      } else {
        setSheetsConfig(prev => ({ ...prev, syncStatus: 'error' }));
      }
      return success;
    } catch (err: any) {
      setSheetsConfig(prev => ({ ...prev, syncStatus: 'error', errorMessage: err?.message }));
      return false;
    }
  };

  const exportCohortCSV = () => {
    const headers = ["ID", "Nombre Completo", "Tipo Doc", "Número Doc", "Correo", "Ficha", "Programa", "Regional", "Centro", "Estado", "Puntaje (%)", "Intentos", "Fecha Finalización", "Notas Instructor"];
    const rows = cohort.map(a => [
      a.id,
      `"${a.fullName}"`,
      a.docType,
      a.docNumber,
      a.email,
      a.ficha,
      `"${a.program}"`,
      `"${a.regional}"`,
      `"${a.center}"`,
      `"${a.status}"`,
      a.score !== undefined ? a.score : "N/A",
      a.attemptsCount,
      a.completedAt || "Pendiente",
      `"${a.instructorNotes || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Reporte_Induccion_SENA_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <InductionContext.Provider
      value={{
        role,
        setRole,
        showRoleSelection,
        setShowRoleSelection,
        selectRoleAndEnter,
        activeSection,
        setActiveSection,
        currentApprentice,
        setCurrentApprentice,
        updateCurrentApprentice,
        cohort,
        completedModules,
        markModuleCompleted,
        theme,
        toggleTheme,
        isThemeBlurring,
        userAnswers,
        setUserAnswer,
        evaluationResult,
        finishEvaluation,
        retakeEvaluation,
        addApprentice,
        assignImprovementPlan,
        resetApprenticeAttempt,
        exportCohortCSV,
        sheetsConfig,
        connectGoogleWorkspace,
        disconnectGoogleWorkspace,
        createSpreadsheetInDrive,
        setCustomSpreadsheetId,
        syncApprenticeToGoogleSheets,
        syncFullCohortToGoogleSheets
      }}
    >
      {children}
    </InductionContext.Provider>
  );
};

export const useInduction = () => {
  const context = useContext(InductionContext);
  if (!context) {
    throw new Error('useInduction must be used within an InductionProvider');
  }
  return context;
};
