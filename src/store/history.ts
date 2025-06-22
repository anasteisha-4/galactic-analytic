import { create } from 'zustand';
import { localHistory, type HistoryEntry } from '~/features/history';

type HistoryState = {
  historyEntries: HistoryEntry[];
  selectedEntry: HistoryEntry | null;
  isModalOpen: boolean;

  loadHistory: () => void;
  addHistoryEntry: (entry: HistoryEntry) => void;
  removeHistoryEntry: (id: string) => void;
  openModal: (entry: HistoryEntry) => void;
  clearHistory: () => void;
  closeModal: () => void;
};

export const useHistoryStore = create<HistoryState>((set, get) => ({
  historyEntries: [],
  selectedEntry: null,
  isModalOpen: false,

  loadHistory: () => {
    set({ historyEntries: localHistory.loadHistory() });
  },

  addHistoryEntry: (entry) => {
    const currentEntries = get().historyEntries;
    currentEntries.push(entry);
    set({ historyEntries: currentEntries });
    localHistory.updateEntries(currentEntries);
  },

  removeHistoryEntry: (id) => {
    const updatedEntries = get().historyEntries.filter(
      (entry) => entry.id !== id,
    );
    set({ historyEntries: updatedEntries });
    localHistory.updateEntries(updatedEntries);
  },

  clearHistory: () => {
    set({ historyEntries: [], selectedEntry: null, isModalOpen: false });
    localHistory.clearHistory();
  },

  openModal: (entry) => set({ selectedEntry: entry, isModalOpen: true }),
  closeModal: () => set({ selectedEntry: null, isModalOpen: false }),
}));
