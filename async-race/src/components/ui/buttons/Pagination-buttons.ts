import { carTransform, garage, garagePagination } from '../../..';
import { Garage } from '../../garage-and-winners/Garage';
import type { Winners } from '../../garage-and-winners/Winners';
import { LocalStorage } from '../../local-storage/Local-storage';
import { ButtonFactory } from './Button';
import { ButtonType, StorageKey } from '../../../types';
import { Pagination } from '../../pagination/Pagination';

export class PaginationButtonsFactory {
  public static getNextPageButton(view: Garage | Winners): HTMLButtonElement {
    const nextButton = ButtonFactory.create(ButtonType.Next);
    nextButton.addEventListener('click', async () => {
      garagePagination.nextPage(view);
      this._savePageToLocalStorage(view);
      this._restoreRaceButtons();
      await view.initialize();
    });
    return nextButton;
  }

  public static getPreviousPageButton(
    view: Garage | Winners,
  ): HTMLButtonElement {
    const previousButton = ButtonFactory.create(ButtonType.Previous);
    previousButton.addEventListener('click', async () => {
      Pagination.prevPage(view);
      this._savePageToLocalStorage(view);
      this._restoreRaceButtons();
      await view.initialize();
    });
    return previousButton;
  }

  private static _savePageToLocalStorage(view: Garage | Winners): void {
    const key =
      view instanceof Garage ? StorageKey.GaragePage : StorageKey.WinnersPage;

    LocalStorage.setItemsToLocalStorage(key, view.currentPage);
  }

  private static _restoreRaceButtons(): void {
    Object.values(garage.cars).forEach((carItem) =>
      carItem.enableButtonsAfterRace(),
    );
    carTransform.enableButtonsForEndRace();
  }
}
