import { useCallback, useState } from 'react';
import { generate, type GenerateParameters } from '~/api/generate';

export type GeneratePhase = 'default' | 'loading' | 'error' | 'success';

export const useGeneratorLogic = () => {
  const [generatePhase, setGeneratePhase] = useState<GeneratePhase>('default');

  const onGenerateClick = useCallback(async (params: GenerateParameters) => {
    setGeneratePhase('loading');

    try {
      const csvBlob = await generate(params);
      const url = window.URL.createObjectURL(csvBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `report-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setGeneratePhase('success');
    } catch {
      setGeneratePhase('error');
    }
  }, []);

  const onClearClick = useCallback(() => {
    setGeneratePhase('default');
  }, []);

  return { generatePhase, onGenerateClick, onClearClick };
};
