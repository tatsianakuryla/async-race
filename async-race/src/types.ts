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

export enum CarHolders {
  Garage = 'garage',
  Winners = 'winners',
}

export enum Sort {
  Id = 'id',
  Wins = 'wins',
  Time = 'time',
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ItemsPerPage {
  Garage = 7,
  Winners = 10,
}

export type EngineDataResponse = {
  velocity: number;
  distance: number;
};

export type EngineToDriveModeResponse = {
  success: boolean;
};

export enum EngineStatus {
  Started = 'started',
  Stopped = 'stopped',
  Drive = 'drive',
}

export enum TransformTask {
  Create = 'create',
  Update = 'update',
}

export type WinnerInput = {
  id: number;
  time: number;
};

export enum RouteButtonType {
  Garage = 'visit garage',
  Winners = 'visit winners',
}

export type RaceData = {
  id: number;
  time: number;
  name: string;
};

export enum ButtonType {
  Start = 'start',
  Stop = 'stop',
  Delete = 'delete',
  Select = 'select',
  Sort = 'sort',
  Next = 'next',
  Previous = 'prev',
  RaceAll = 'race all',
  Reset = 'reset race',
  Generate = 'generate cars',
  Route = 'route',
}

export enum StorageKey {
  Sort = 'winners-sort',
  Order = 'winners-order',
  WinnersPage = 'winners-page-number',
  GaragePage = 'garage-page-number',
  ChosenCar = 'chosenCar',
  CreateTitle = 'create-title',
  CreateColor = 'create-color',
}

export enum RouteValues {
  GARAGE = '/garage',
  WINNERS = '/winners',
  MAIN = '/',
}
