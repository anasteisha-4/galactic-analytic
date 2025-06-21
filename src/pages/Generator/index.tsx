import { useState } from 'react';
import { generate, type GenerateParameters } from '~/api/generate';
import loader from '~/assets/icons/loading.svg';
import { Button, ClearButton } from '~/components';
import s from './Generator.module.css';

type GeneratePhase = 'default' | 'loading' | 'error' | 'success';

export const GeneratorPage = () => {
  const generateParams: GenerateParameters = {
    size: 0.1,
    withErrors: 'on',
    maxSpend: 1000,
  };
  const [generatePhase, setGeneratePhase] = useState<GeneratePhase>('default');

  const onGenerateClick = async (generateParams: GenerateParameters) => {
    setGeneratePhase('loading');

    try {
      const csvBlob = await generate(generateParams);
      const url = window.URL.createObjectURL(csvBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `report.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      setGeneratePhase('success');
    } catch {
      setGeneratePhase('error');
    }
  };

  const onClearClick = () => setGeneratePhase('default');

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
            <ClearButton onClick={onClearClick} />
          </div>
          <p className={s['error-text']}>упс, не то...</p>
        </div>
      ) : generatePhase === 'success' ? (
        <div className={s.success}>
          <div className={s['button-block']}>
            <Button appearance={generatePhase} disabled>
              Done!
            </Button>
            <ClearButton onClick={onClearClick} />
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
