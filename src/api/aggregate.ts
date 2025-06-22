const BASE_URL = import.meta.env.VITE_API_URL;

export type AggregateParameters = {
  rows: number;
  file: File;
};

export async function aggregate({ rows, file }: AggregateParameters) {
  const formData = new FormData();
  formData.append('file', file);

  const url = new URL(`${BASE_URL}/aggregate`);
  url.searchParams.append('rows', rows.toString());

  const res = await fetch(url.toString(), {
    method: 'POST',
    body: formData,
  });

  if (!res.ok || !res.body) {
    throw new Error(`Ошибка парсинга`);
  }

  const reader = res.body.getReader();
  return reader;
}
