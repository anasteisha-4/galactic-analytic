import { create } from 'zustand';

export type AnalyticPagePhase =
  | 'start'
  | 'uploading'
  | 'uploadError'
  | 'fileLoaded'
  | 'parsing'
  | 'analyticComplete';

export type AnalyticData = {
  total_spend_galactic: number;
  rows_affected: number;
  less_spent_at: number;
  big_spent_civ: 'humans' | 'blobs' | 'monsters';
  less_spent_civ: 'humans' | 'blobs' | 'monsters';
  big_spent_at: number;
  big_spent_value: number;
  average_spend_galactic: number;
};

type AnalyticState = {
  phase: AnalyticPagePhase;
  uploadedFile: File | null;
  highlightedDropZone: boolean;

  setPhase: (phase: AnalyticPagePhase) => void;
  setUploadedFile: (file: File | null) => void;
  setHighlightedDropZone: (highlight: boolean) => void;

  handleFileSelection: (file: File) => void;
  resetAnalytic: () => void;
};

export const useAnalyticStore = create<AnalyticState>((set) => ({
  phase: 'start',
  uploadedFile: null,
  highlightedDropZone: false,

  setPhase: (phase) => set({ phase }),
  setUploadedFile: (file) => set({ uploadedFile: file }),
  setHighlightedDropZone: (highlight) =>
    set({ highlightedDropZone: highlight }),

  handleFileSelection: (file: File) => {
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      set({ uploadedFile: file, phase: 'fileLoaded' });
    } else {
      set({
        uploadedFile: file,
        phase: 'uploadError',
      });
    }
  },

  resetAnalytic: () =>
    set({
      phase: 'start',
      uploadedFile: null,
      highlightedDropZone: false,
    }),
}));
