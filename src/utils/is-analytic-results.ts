export type AnalyticData = {
  total_spend_galactic: number;
  rows_affected: number;
  less_spent_at: number;
  big_spent_civ: 'humans' | 'blobs' | 'monsters';
  less_spent_civ: 'humans' | 'blobs' | 'monsters';
  big_spent_at: number;
  big_spent_value: number;
  average_spend_galactic: number;
};

export const isAnalyticResults = (obj: object | null): obj is AnalyticData =>
  obj !== null &&
  'total_spend_galactic' in obj &&
  'less_spent_civ' in obj &&
  'rows_affected' in obj &&
  'big_spent_at' in obj &&
  'less_spent_at' in obj &&
  'big_spent_value' in obj &&
  'big_spent_civ' in obj &&
  'average_spend_galactic' in obj &&
  typeof obj.total_spend_galactic === 'number' &&
  typeof obj.less_spent_civ === 'string' &&
  ['humans', 'blobs', 'monsters'].includes(obj.less_spent_civ) &&
  typeof obj.rows_affected === 'number' &&
  typeof obj.less_spent_at === 'number' &&
  typeof obj.big_spent_at === 'number' &&
  typeof obj.big_spent_value === 'number' &&
  typeof obj.big_spent_civ === 'string' &&
  ['humans', 'blobs', 'monsters'].includes(obj.big_spent_civ) &&
  typeof obj.average_spend_galactic === 'number';
