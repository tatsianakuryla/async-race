import { carTransform, garage, pagination } from '../../..';
import { Garage } from '../../garage-and-winners/Garage';
import type { Winners } from '../../garage-and-winners/Winners';
import { LocalStorage } from '../../local-storage/Local-storage';
import { ButtonFactory } from './Button';

export class PaginationButtonsFactory {
  public static getNextPageButton(view: Garage | Winners): HTMLButtonElement {
    const nextButton = ButtonFactory.create('next');
    nextButton.addEventListener('click', async () => {
      pagination.nextPage(view);
      this._savePageToLocalStorage(view);
      const carsList = Object.entries(garage.cars);
      carsList.forEach(([, carItem]) => carItem.enableButtonsAfterRace());
      carTransform.enableButtonsForEndRace();
      await view.initialize();
    });
    return nextButton;
  }

  public static getPreviousPageButton(
    view: Garage | Winners,
  ): HTMLButtonElement {
    const previousButton = ButtonFactory.create('prev');
    previousButton.addEventListener('click', async () => {
      pagination.prevPage(view);
      const carsList = Object.entries(garage.cars);
      carsList.forEach(([, carItem]) => carItem.enableButtonsAfterRace());
      carTransform.enableButtonsForEndRace();
      this._savePageToLocalStorage(view);
      await view.initialize();
    });
    return previousButton;
  }

  private static _savePageToLocalStorage(carsHolder: Garage | Winners): void {
    const key =
      carsHolder instanceof Garage
        ? 'garage-page-number'
        : 'winners-page-number';
    LocalStorage.setItemsToLocalStorage(key, carsHolder.currentPage);
  }
}
