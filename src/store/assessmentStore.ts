import { create } from 'zustand';
import type { AssessmentData, GapAnalysisResult } from '../types/assessment';

interface AssessmentStore {
  // Assessment data
  assessmentData: Partial<AssessmentData>;
  updateAssessmentData: (data: Partial<AssessmentData>) => void;
  resetAssessmentData: () => void;

  // Current step in multi-step form
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;

  // Analysis results
  analysisResult: GapAnalysisResult | null;
  setAnalysisResult: (result: GapAnalysisResult) => void;

  // UI state
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  isGeneratingPDF: boolean;
  setIsGeneratingPDF: (generating: boolean) => void;
}

const initialAssessmentData: Partial<AssessmentData> = {
  certifications: [],
  aircraftCategories: [],
  servicesOffered: [],
  oemAuthorizations: [],
  specialCapabilities: [],
  qualityMethodologies: [],
  challenges: [],
  productionBottlenecks: [],
  certificateActions: [],
};

export const useAssessmentStore = create<AssessmentStore>((set) => ({
  assessmentData: initialAssessmentData,
  updateAssessmentData: (data) =>
    set((state) => ({
      assessmentData: { ...state.assessmentData, ...data },
    })),
  resetAssessmentData: () => set({ assessmentData: initialAssessmentData }),

  currentStep: 0,
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  previousStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

  analysisResult: null,
  setAnalysisResult: (result) => set({ analysisResult: result }),

  isAnalyzing: false,
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  isGeneratingPDF: false,
  setIsGeneratingPDF: (generating) => set({ isGeneratingPDF: generating }),
}));
