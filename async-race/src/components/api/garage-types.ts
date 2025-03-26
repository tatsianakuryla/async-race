export const BASE_URL = 'http://localhost:3000';

export interface Car {
  name: string;
  color: string;
}

export type CarWithId = Car & { id: number };

export interface getCarsResponse {
  cars: CarWithId[];
  totalCount: number;
}
