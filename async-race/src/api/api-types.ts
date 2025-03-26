export const BASE_URL = 'http://localhost:3000';

type Car = {
  name: string;
  color: string;
};

export type CarWithId = Car & { id: number };

export type GetCarsResponse = {
  cars: CarWithId[];
  totalCount: number;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type GetResponse<T> = {
  results: T[];
  totalCount: number;
};

export type ViewsTypes = 'garage' | 'winners';
