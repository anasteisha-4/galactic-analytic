import { useCallback, useState } from 'react';
import { report, type ReportParameters } from '~/api/report';

export type GeneratePhase = 'default' | 'loading' | 'error' | 'success';

export const useGenerator = () => {
  const [generatePhase, setGeneratePhase] = useState<GeneratePhase>('default');

  const onGenerateClick = useCallback(async (params: ReportParameters) => {
    setGeneratePhase('loading');

    try {
      const csvBlob = await report(params);
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
