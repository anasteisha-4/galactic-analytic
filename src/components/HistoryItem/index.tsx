import { type FC } from 'react';
import file from '~/assets/icons/file.svg';
import { type HistoryEntry } from '~/features/history';
import { processDate } from '~/utils/process-date';
import { processNameLength } from '~/utils/process-name-length';
import { DeleteButton } from '../Buttons/DeleteButton';
import { Happy, Sad } from '../Emojis';
import s from './HistoryItem.module.css';

type HistoryItemProps = {
  entry: HistoryEntry;
  onDelete: (id: string) => void;
  onViewDetails: (entry: HistoryEntry) => void;
};

export const HistoryItem: FC<HistoryItemProps> = ({
  entry,
  onDelete,
  onViewDetails,
}) => (
  <li className={s.item}>
    <div
      className={`${s['item-info']} ${entry.status === 'failed' ? s['item-info-inactive'] : ''}`}
      onClick={() => entry.status === 'success' && onViewDetails(entry)}
    >
      <div className={s['file-name']}>
        <img src={file} />
        {processNameLength(entry.fileName)}
      </div>
      <div>{processDate(new Date(entry.timestamp))}</div>
      <div
        className={`${s.status} ${entry.status === 'failed' ? s['status-inactive'] : ''}`}
      >
        Обработан успешно
        <Happy status={entry.status} />
      </div>
      <div
        className={`${s.status} ${entry.status === 'success' ? s['status-inactive'] : ''}`}
      >
        Не удалось обработать
        <Sad status={entry.status} />
      </div>
    </div>
    <DeleteButton onClick={() => onDelete(entry.id)} />
  </li>
);
