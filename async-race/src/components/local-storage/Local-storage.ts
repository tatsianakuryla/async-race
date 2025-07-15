import type { Car, Order, Sort } from '../../types';
import { StorageKey } from '../../types';

export class LocalStorage {
  public static setItem(key: string, value: string | number): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getItem(key: string): string | null {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  }

  public static clear(): void {
    localStorage.clear();
  }

  public static saveChosenCar(key = StorageKey.ChosenCar, car: Car): void {
    localStorage.setItem(key, JSON.stringify(car));
  }

  public static getOrder(key: StorageKey.Order): Order | null {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  }

  public static getSort(key: StorageKey.Sort): Sort | null {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  }
}
