import { useEffect, type FC } from 'react';
import { createPortal } from 'react-dom';
import { type AnalyticData } from '~/utils/is-analytic-results';
import { processDay } from '~/utils/process-date';
import { XButton } from '../Buttons/XButton';
import s from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  analyticResults: AnalyticData;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, analyticResults }) => {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !modalRoot) {
    return null;
  }

  return createPortal(
    <div className={s['modal-page']}>
      <div className={s['modal-area']}>
        <div
          className={s['scroll-area']}
          style={{ maxHeight: window.innerHeight - 165 }}
        >
          <ul className={s.modal}>
            <li className={s.item}>
              <p className={s.data}>
                {Math.round(analyticResults.total_spend_galactic)}
              </p>
              <p className={s['item-name']}>
                общие расходы в галактических кредитах
              </p>
            </li>
            <li className={s.item}>
              <p className={s.data}>{analyticResults.rows_affected}</p>
              <p className={s['item-name']}>количество обработанных записей</p>
            </li>
            <li className={s.item}>
              <p className={s.data}>
                {processDay(analyticResults.less_spent_at)}
              </p>
              <p className={s['item-name']}>
                день года с минимальными расходами
              </p>
            </li>
            <li className={s.item}>
              <p className={s.data}>{analyticResults.big_spent_civ}</p>
              <p className={s['item-name']}>
                цивилизация с максимальными расходами
              </p>
            </li>
            <li className={s.item}>
              <p className={s.data}>{analyticResults.less_spent_civ}</p>
              <p className={s['item-name']}>
                цивилизация с минимальными расходами
              </p>
            </li>
            <li className={s.item}>
              <p className={s.data}>
                {processDay(analyticResults.big_spent_at)}
              </p>
              <p className={s['item-name']}>
                день года с максимальными расходами
              </p>
            </li>
            <li className={s.item}>
              <p className={s.data}>
                {Math.round(analyticResults.big_spent_value)}
              </p>
              <p className={s['item-name']}>
                максимальная сумма расходов за день
              </p>
            </li>
            <li className={s.item}>
              <p className={s.data}>
                {Math.round(analyticResults.average_spend_galactic)}
              </p>
              <p className={s['item-name']}>
                средние расходы в галактических кредитах
              </p>
            </li>
          </ul>
        </div>
        <XButton onClick={onClose} />
      </div>
    </div>,
    modalRoot,
  );
};
