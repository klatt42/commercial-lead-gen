import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DamageAssessment {
  damageType: string | null;
  severity: 'minor' | 'moderate' | 'severe' | 'catastrophic' | null;
  urgency: 'emergency' | 'urgent' | 'scheduled' | 'assessment' | null;
  propertyType: string | null;
  squareFootage: number | null;
  affectedAreas: string[];
  contactInfo: {
    name: string;
    phone: string;
    email: string;
    businessName: string;
  };
  propertyAddress: string;
  serviceArea: 'MD' | 'DC' | 'VA' | null;
  estimatedCost: {
    low: number;
    high: number;
  } | null;
  conversationStep: number;
}

interface DamageAssessmentStore extends DamageAssessment {
  updateAssessment: (updates: Partial<DamageAssessment>) => void;
  resetAssessment: () => void;
  nextStep: () => void;
}

const initialState: DamageAssessment = {
  damageType: null,
  severity: null,
  urgency: null,
  propertyType: null,
  squareFootage: null,
  affectedAreas: [],
  contactInfo: {
    name: '',
    phone: '',
    email: '',
    businessName: '',
  },
  propertyAddress: '',
  serviceArea: null,
  estimatedCost: null,
  conversationStep: 1,
};

export const useDamageAssessment = create<DamageAssessmentStore>()(
  persist(
    (set) => ({
      ...initialState,

      // Actions
      updateAssessment: (updates) => set((state) => ({ ...state, ...updates })),

      resetAssessment: () => set(initialState),

      nextStep: () => set((state) => ({ conversationStep: state.conversationStep + 1 })),
    }),
    {
      name: 'damage-assessment-storage',
    }
  )
);
