import { create } from 'zustand';

export type AnalyticPagePhase =
  | 'start'
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

  setPhase: (phase: AnalyticPagePhase) => void;
  setUploadedFile: (file: File | null) => void;

  handleFileSelection: (file: File) => void;
  resetAnalytic: () => void;
};

const EXPECTED_HEADERS = ['id', 'civ', 'developer_id', 'date', 'spend'];

export const useAnalyticStore = create<AnalyticState>((set) => ({
  phase: 'start',
  uploadedFile: null,

  setPhase: (phase) => set({ phase }),
  setUploadedFile: (file) => set({ uploadedFile: file }),

  handleFileSelection: async (file: File) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      set({
        uploadedFile: file,
        phase: 'uploadError',
      });
      return;
    }

    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = (e) => {
        const firstLine = (e.target?.result as string).split('\n')[0].trim();
        const headers = firstLine.split(',').map((h) => h.trim());
        const headersMatch =
          headers.length === EXPECTED_HEADERS.length &&
          headers.every((header, index) => header === EXPECTED_HEADERS[index]);

        set({ uploadedFile: file });

        if (headersMatch) {
          set({ phase: 'fileLoaded' });
        } else {
          set({
            phase: 'uploadError',
          });
        }
        resolve();
      };

      reader.onerror = () => {
        set({
          uploadedFile: file,
          phase: 'uploadError',
        });
        resolve();
      };

      const blobSlice = file.slice(0, 1024);
      reader.readAsText(blobSlice);
    });
  },

  resetAnalytic: () =>
    set({
      phase: 'start',
      uploadedFile: null,
    }),
}));
