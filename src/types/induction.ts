export type InductionSection = 
  | 'identidad'
  | 'reglamento'
  | 'derechos'
  | 'deberes'
  | 'ruta-formativa'
  | 'dilemas'
  | 'evaluacion'
  | 'certificado'
  | 'panel-instructor';

export type UserRole = 'aprendiz' | 'instructor';

export interface ApprenticeProfile {
  id: string;
  fullName: string;
  docType: 'CC' | 'TI' | 'CE' | 'PEP';
  docNumber: string;
  email: string;
  ficha: string;
  program: string;
  regional: string;
  center: string;
  enrollmentDate: string;
  status: 'Sin iniciar' | 'En proceso' | 'Aprobado' | 'Plan de Mejoramiento';
  score?: number;
  completedAt?: string;
  attemptsCount: number;
  instructorNotes?: string;
  answersSummary?: {
    total: number;
    correct: number;
    incorrectCategories: string[];
  };
}

export interface SenaSymbol {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  meaning: string;
  iconName: string;
}

export interface SenaRight {
  id: string;
  article: string;
  title: string;
  summary: string;
  description: string;
  category: 'Formación' | 'Bienestar' | 'Representación' | 'Evaluación' | 'Garantías';
  practicalExample: string;
}

export interface SenaDuty {
  id: string;
  article: string;
  type: 'deber' | 'prohibicion';
  severity?: 'Leve' | 'Grave' | 'Gravísima';
  title: string;
  summary: string;
  consequence: string;
  category: 'Académico' | 'Disciplinario' | 'Seguridad e Infraestructura' | 'Convivencia';
}

export interface ProductiveModalities {
  id: string;
  title: string;
  description: string;
  legalBasis: string;
  keyBenefits: string[];
  requirements: string[];
}

export interface CaseDilemma {
  id: string;
  title: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
    regulationArticle: string;
  }[];
}

export interface Question {
  id: string;
  category: 
    | 'Identidad Institucional' 
    | 'Derechos del Aprendiz' 
    | 'Deberes y Faltas' 
    | 'Etapa Productiva y Bienestar'
    | 'Permanencia y Trámites'
    | 'Medidas Formativas y Sanciones'
    | 'Reglamento';
  question: string;
  options: string[];
  correctAnswer: number;
  feedback: string;
  regulationReference: string;
}

export interface EvaluationResult {
  score: number; // percentage 0 - 100
  correctCount: number;
  totalQuestions: number;
  isPassed: boolean; // >= 80%
  completedAt: string;
  categoryScores: Record<string, { correct: number; total: number }>;
  userAnswers: Record<string, number>;
}

export interface RegulationDefinition {
  id: string;
  term: string;
  concept: string;
  definition: string;
  scope: string;
  practicalApplication: string;
}

export interface LifecycleStage {
  id: string;
  stage: 'Ingreso' | 'Permanencia' | 'Certificación';
  title: string;
  subtitle: string;
  description: string;
  items: {
    name: string;
    description: string;
    condition: string;
    deadline?: string;
  }[];
}

export interface DisciplinaryMeasure {
  id: string;
  type: 'falta' | 'medida_formativa' | 'sancion';
  classification: string;
  title: string;
  description: string;
  authority: string;
  effect: string;
  legalBasis: string;
}

