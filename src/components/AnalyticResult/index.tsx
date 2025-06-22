import { type FC } from 'react';
import { type AnalyticData } from '~/utils/is-analytic-results';
import { processDay } from '~/utils/process-date';
import s from './AnalyticResult.module.css';

type AnalyticResultProps = {
  analyticResults: AnalyticData;
};

export const AnalyticResult: FC<AnalyticResultProps> = ({
  analyticResults,
}) => (
  <div className={s['results']}>
    <div className={s['result-item']}>
      <p className={s.data}>
        {Math.round(analyticResults.total_spend_galactic)}
      </p>
      <p className={s['item-name']}>общие расходы в галактических кредитах</p>
    </div>
    <div className={s['result-item']}>
      <p className={s.data}>{analyticResults.less_spent_civ}</p>
      <p className={s['item-name']}>цивилизация с минимальными расходами</p>
    </div>
    <div className={s['result-item']}>
      <p className={s.data}>{analyticResults.rows_affected}</p>
      <p className={s['item-name']}>количество обработанных записей</p>
    </div>
    <div className={s['result-item']}>
      <p className={s.data}>{processDay(analyticResults.big_spent_at)}</p>
      <p className={s['item-name']}>день года с максимальными расходами</p>
    </div>
    <div className={s['result-item']}>
      <p className={s.data}>{processDay(analyticResults.less_spent_at)}</p>
      <p className={s['item-name']}>день года с минимальными расходами</p>
    </div>
    <div className={s['result-item']}>
      <p className={s.data}>{Math.round(analyticResults.big_spent_value)}</p>
      <p className={s['item-name']}>максимальная сумма расходов за день</p>
    </div>
    <div className={s['result-item']}>
      <p className={s.data}>{analyticResults.big_spent_civ}</p>
      <p className={s['item-name']}>цивилизация с максимальными расходами</p>
    </div>
    <div className={s['result-item']}>
      <p className={s.data}>
        {Math.round(analyticResults.average_spend_galactic)}
      </p>
      <p className={s['item-name']}>средние расходы в галактических кредитах</p>
    </div>
  </div>
);
