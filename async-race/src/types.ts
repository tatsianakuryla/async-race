export const BASE_URL = 'http://localhost:3000';

export type Car = {
  name: string;
  color: string;
  id: number;
};

export type Winner = {
  wins: number;
  time: number;
  id: number;
};

export type CarOrWinner = Car | Winner;

export type GetResponse<T> = {
  results: T[];
  totalCount: number;
};

export type Views = 'garage' | 'winners';
export type TransformCarTasks = 'update' | 'create';
