import type { Car } from '../../types';

export class LocalStorage {
  public static setItemsToLocalStorage(
    key: string,
    value: string | number,
  ): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getItemsFromLocalStorage(key: string): string | null {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  }

  public static clearLocalStorage(): void {
    localStorage.clear();
  }

  public static removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  public static saveChosenCarToLocalStorage(key = 'chosenCar', car: Car): void {
    localStorage.setItem(key, JSON.stringify(car));
  }

  public static getChosenCarFromLocalStorage(key = 'chosenCar'): Car | null {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  }
}
