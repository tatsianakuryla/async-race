import { StorageKey, type Car } from '../../types';

export class GarageStorageManager {
  public static saveChosenCar(car: Car): void {
    localStorage.setItem(StorageKey.ChosenCar, JSON.stringify(car));
  }

  public static getChosenCar(): Car | null {
    const item = localStorage.getItem(StorageKey.ChosenCar);
    return item ? JSON.parse(item) : null;
  }

  public static clearChosenCar(): void {
    localStorage.removeItem(StorageKey.ChosenCar);
  }

  public static saveCurrentPage(page: number): void {
    localStorage.setItem(StorageKey.GaragePage, page.toString());
  }

  public static getCurrentPage(): number | null {
    const item = localStorage.getItem(StorageKey.GaragePage);
    return item ? +item : null;
  }

  public static clearCurrentPage(): void {
    localStorage.removeItem(StorageKey.GaragePage);
  }
}
