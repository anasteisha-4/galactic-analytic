import { localHistory } from '~/features/history';
import { useHistoryStore } from './history';

jest.mock('~/features/history', () => ({
  localHistory: {
    loadHistory: jest.fn(),
    updateEntries: jest.fn(),
    clearHistory: jest.fn(),
  },
}));

const mockEntry = {
  id: '1',
  fileName: 'test.csv',
  timestamp: 1234567890,
  status: 'success' as 'success' | 'failed',
  analyticResults: {
    total_spend_galactic: 1,
    rows_affected: 1,
    less_spent_at: 1,
    big_spent_civ: 'humans' as 'humans' | 'blobs' | 'monsters',
    less_spent_civ: 'blobs' as 'humans' | 'blobs' | 'monsters',
    big_spent_at: 1,
    big_spent_value: 1,
    average_spend_galactic: 1,
  },
};

describe('useHistoryStore', () => {
  beforeEach(() => {
    useHistoryStore.setState({
      historyEntries: [],
      selectedEntry: null,
      isModalOpen: false,
    });
    jest.clearAllMocks();
  });

  it('loadHistory загружает данные из localHistory', () => {
    (localHistory.loadHistory as jest.Mock).mockReturnValue([mockEntry]);
    useHistoryStore.getState().loadHistory();
    expect(useHistoryStore.getState().historyEntries).toEqual([mockEntry]);
    expect(localHistory.loadHistory).toHaveBeenCalled();
  });

  it('addHistoryEntry добавляет запись и вызывает updateEntries', () => {
    useHistoryStore.getState().addHistoryEntry(mockEntry);
    expect(useHistoryStore.getState().historyEntries).toEqual([mockEntry]);
    expect(localHistory.updateEntries).toHaveBeenCalledWith([mockEntry]);
  });

  it('removeHistoryEntry удаляет запись и вызывает updateEntries', () => {
    useHistoryStore.setState({ historyEntries: [mockEntry] });
    useHistoryStore.getState().removeHistoryEntry('1');
    expect(useHistoryStore.getState().historyEntries).toEqual([]);
    expect(localHistory.updateEntries).toHaveBeenCalledWith([]);
  });

  it('clearHistory очищает все записи и вызывает clearHistory', () => {
    useHistoryStore.setState({
      historyEntries: [mockEntry],
      selectedEntry: mockEntry,
      isModalOpen: true,
    });
    useHistoryStore.getState().clearHistory();
    expect(useHistoryStore.getState().historyEntries).toEqual([]);
    expect(useHistoryStore.getState().selectedEntry).toBeNull();
    expect(useHistoryStore.getState().isModalOpen).toBe(false);
    expect(localHistory.clearHistory).toHaveBeenCalled();
  });

  it('openModal устанавливает выбранную запись и открывает модалку', () => {
    useHistoryStore.getState().openModal(mockEntry);
    expect(useHistoryStore.getState().selectedEntry).toEqual(mockEntry);
    expect(useHistoryStore.getState().isModalOpen).toBe(true);
  });

  it('closeModal сбрасывает выбранную запись и закрывает модалку', () => {
    useHistoryStore.setState({ selectedEntry: mockEntry, isModalOpen: true });
    useHistoryStore.getState().closeModal();
    expect(useHistoryStore.getState().selectedEntry).toBeNull();
    expect(useHistoryStore.getState().isModalOpen).toBe(false);
  });
});
