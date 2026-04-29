import { create } from 'zustand';
import type { AlgorithmId } from '@/types';

type Theme = 'dark' | 'light';
type Language = 'en' | 'es';

interface UIState {
  theme: Theme;
  language: Language;
  isTheoryPanelOpen: boolean;
  theoryAlgorithmId: AlgorithmId | null;

  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  openTheoryPanel: (id: AlgorithmId) => void;
  closeTheoryPanel: () => void;
}

const savedTheme = (localStorage.getItem('theme') as Theme | null) ?? 'dark';
const savedLang = (localStorage.getItem('lang') as Language | null) ?? 'es';

export const useUIStore = create<UIState>((set) => ({
  theme: savedTheme,
  language: savedLang,
  isTheoryPanelOpen: false,
  theoryAlgorithmId: null,

  toggleTheme: () =>
    set((s) => {
      const next: Theme = s.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return { theme: next };
    }),

  setLanguage: (lang) => {
    localStorage.setItem('lang', lang);
    set({ language: lang });
  },

  openTheoryPanel: (id) => set({ isTheoryPanelOpen: true, theoryAlgorithmId: id }),
  closeTheoryPanel: () => set({ isTheoryPanelOpen: false }),
}));
