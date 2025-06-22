import { create } from 'zustand';
import { aggregate } from '~/api/aggregate';
import { type AnalyticData } from '~/utils/is-analytic-results';

export type AnalyticPagePhase =
  | 'start'
  | 'uploadError'
  | 'fileLoaded'
  | 'parsing'
  | 'parsingError'
  | 'analyticComplete';

type AnalyticState = {
  phase: AnalyticPagePhase;
  uploadedFile: File | null;
  analyticResults: AnalyticData | null;

  setPhase: (phase: AnalyticPagePhase) => void;
  setUploadedFile: (file: File | null) => void;

  handleFileSelection: (file: File) => void;
  processAnalytics: (file: File) => Promise<void>;
  resetAnalytic: () => void;
};

const EXPECTED_HEADERS = ['id', 'civ', 'developer_id', 'date', 'spend'];

export const useAnalyticStore = create<AnalyticState>((set) => ({
  phase: 'start',
  uploadedFile: null,
  analyticResults: null,

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

  processAnalytics: async (file: File) => {
    set({ phase: 'parsing', analyticResults: null });
    const rows = 1000;
    let analyticComplete = false;

    try {
      const reader = await aggregate({ rows, file });
      const decoder = new TextDecoder();
      let buffer = '';

      while (!analyticComplete) {
        const { done, value } = await reader.read();
        if (done) {
          if (buffer.trim()) {
            const data = JSON.parse(buffer);
            set({ analyticResults: data });
          }
          set({ phase: 'analyticComplete' });
          analyticComplete = true;
        } else {
          buffer += decoder.decode(value, { stream: true });

          let newlineIndex = buffer.indexOf('\n');
          while (newlineIndex !== -1) {
            const jsonLine = buffer.slice(0, newlineIndex).trim();
            buffer = buffer.slice(newlineIndex + 1);
            if (jsonLine) {
              const partialData: AnalyticData = JSON.parse(jsonLine);
              set({ analyticResults: partialData });
            }
            newlineIndex = buffer.indexOf('\n');
          }
        }
      }
    } catch {
      set({
        phase: 'parsingError',
      });
    }
  },

  resetAnalytic: () =>
    set({
      phase: 'start',
      uploadedFile: null,
    }),
}));
