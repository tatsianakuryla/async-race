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
export type CarAndWinner = Car & Winner;

export type GetResponse<T> = {
  results: T[];
  totalCount: number;
};

export type Views = 'garage' | 'winners';
export type TransformCarTasks = 'update' | 'create';
export type Sort = 'id' | 'wins' | 'time';
export type Order = 'ASC' | 'DESC';
export type ItemsPerPage = 7 | 10;

export type EngineDataResponse = {
  velocity: number;
  distance: number;
};

export type EngineToDriveModeResponse = {
  success: boolean;
};

export type EngineStatus = 'started' | 'stopped' | 'drive';
