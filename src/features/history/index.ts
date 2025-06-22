import { type AnalyticData } from '~/utils/is-analytic-results';

const LOCAL_STORAGE_KEY = 'analyticsHistory';

export type HistoryEntry = {
  id: string;
  fileName: string;
  timestamp: number;
  status: 'success' | 'failed';
  analyticResults: AnalyticData | null;
};

export const localHistory = {
  loadHistory: () => {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = item ? JSON.parse(item) : [];
    return Array.isArray(parsed) ? parsed : [];
  },

  updateEntries: (updatedEntries: HistoryEntry[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEntries));
  },

  clearHistory: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  },
};
