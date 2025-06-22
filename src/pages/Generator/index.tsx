import { type ReportParameters } from '~/api/report';
import loader from '~/assets/icons/loading.svg';
import { Button, XButton } from '~/components';
import { useGenerator } from '~/features/generator';
import s from './Generator.module.css';

export const GeneratorPage = () => {
  const generateParams: ReportParameters = {
    size: 0.01,
    withErrors: 'on',
    maxSpend: 1000,
  };

  const { generatePhase, onGenerateClick, onClearClick } = useGenerator();

  return (
    <main className={s.page}>
      <p>Сгенерируйте готовый csv-файл нажатием одной кнопки</p>
      {generatePhase === 'loading' ? (
        <div className={s.loading}>
          <Button appearance={generatePhase} disabled>
            <img src={loader} />
          </Button>
          <p>идёт процесс генерации</p>
        </div>
      ) : generatePhase === 'error' ? (
        <div className={s.error}>
          <div className={s['button-block']}>
            <Button appearance={generatePhase} disabled>
              Ошибка
            </Button>
            <XButton onClick={onClearClick} />
          </div>
          <p className={s['error-text']}>упс, не то...</p>
        </div>
      ) : generatePhase === 'success' ? (
        <div className={s.success}>
          <div className={s['button-block']}>
            <Button appearance={generatePhase} disabled>
              Done!
            </Button>
            <XButton onClick={onClearClick} />
          </div>
          <p>файл сгенерирован!</p>
        </div>
      ) : (
        <Button onClick={() => onGenerateClick(generateParams)}>
          Начать генерацию
        </Button>
      )}
    </main>
  );
};
