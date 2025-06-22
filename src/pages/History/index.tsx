import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components';
import { HistoryItem } from '~/components/HistoryItem';
import { Modal } from '~/components/Modal';
import { useHistoryStore } from '~/store';
import s from './History.module.css';

export const HistoryPage: FC = () => {
  const navigate = useNavigate();

  const {
    historyEntries,
    selectedEntry,
    isModalOpen,
    loadHistory,
    removeHistoryEntry,
    clearHistory,
    openModal,
    closeModal,
  } = useHistoryStore();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleGenerateMoreClick = () => {
    navigate('/generator');
  };

  return (
    <main className={s.page}>
      {
        <ul className={s['history-list']}>
          {historyEntries.map((entry) => (
            <HistoryItem
              key={entry.id}
              entry={entry}
              onDelete={removeHistoryEntry}
              onViewDetails={openModal}
            />
          ))}
        </ul>
      }

      <div className={s.actions}>
        <Button onClick={handleGenerateMoreClick}>Сгенерировать больше</Button>
        {historyEntries.length > 0 && (
          <Button onClick={clearHistory} appearance="clear">
            Очистить всё
          </Button>
        )}
      </div>

      {selectedEntry?.analyticResults && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          analyticResults={selectedEntry.analyticResults}
        />
      )}
    </main>
  );
};
