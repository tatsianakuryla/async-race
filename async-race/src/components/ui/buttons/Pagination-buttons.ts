import { pagination } from '../../..';
import { Garage } from '../../cars/Garage';
import type { Winners } from '../../cars/Winners';
import { LocalStorage } from '../../local-storage/Local-storage';
import { ButtonFactory } from './Button';

export class PaginationButtonsFactory {
  public static getNextPageButton(
    carsHolder: Garage | Winners,
  ): HTMLButtonElement {
    const nextButton = ButtonFactory.create('next');
    nextButton.addEventListener('click', async () => {
      pagination.nextPage(carsHolder);
      this._savePageToLocalStorage(carsHolder);
      await carsHolder.initialize();
    });
    return nextButton;
  }

  public static getPreviousPageButton(
    carsHolder: Garage | Winners,
  ): HTMLButtonElement {
    const previousButton = ButtonFactory.create('prev');
    previousButton.addEventListener('click', async () => {
      pagination.prevPage(carsHolder);
      this._savePageToLocalStorage(carsHolder);
      await carsHolder.initialize();
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
