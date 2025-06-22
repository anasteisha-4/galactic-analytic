const BASE_URL = import.meta.env.VITE_API_URL;

export type ReportParameters = {
  size: number;
  withErrors?: 'on' | 'off';
  maxSpend?: number;
};

export async function report({
  size,
  withErrors = 'off',
  maxSpend = 1000,
}: ReportParameters): Promise<Blob> {
  const url = new URL(`${BASE_URL}/report`);
  url.searchParams.append('size', size.toString());
  url.searchParams.append('withErrors', withErrors);
  url.searchParams.append('maxSpend', maxSpend.toString());

  const res = await fetch(url.toString());
  if (!res.ok) {
    const errorMessage = await res
      .json()
      .then(({ error }: { error: string }) => ({ error }));

    throw new Error(`Ошибка генерации: ${res.status} - ${errorMessage.error}`);
  }
  const data: Blob = await res.blob();
  return data;
}
