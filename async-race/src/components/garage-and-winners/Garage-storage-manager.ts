import type { Car } from '../../types';

const CHOSEN_CAR_KEY = 'chosenCar';
const GARAGE_PAGE_KEY = 'garage-page-number';

export class GarageStorageManager {
  public static saveChosenCar(car: Car): void {
    localStorage.setItem(CHOSEN_CAR_KEY, JSON.stringify(car));
  }

  public static getChosenCar(): Car | null {
    const item = localStorage.getItem(CHOSEN_CAR_KEY);
    return item ? JSON.parse(item) : null;
  }

  public static clearChosenCar(): void {
    localStorage.removeItem(CHOSEN_CAR_KEY);
  }

  public static saveCurrentPage(page: number): void {
    localStorage.setItem(GARAGE_PAGE_KEY, page.toString());
  }

  public static getCurrentPage(): number | null {
    const item = localStorage.getItem(GARAGE_PAGE_KEY);
    return item ? +item : null;
  }

  public static clearPage(): void {
    localStorage.removeItem(GARAGE_PAGE_KEY);
  }
}
