import { garage, garagePagination, garageView } from '../../..';
import { Garage } from '../../garage-and-winners/Garage';
import type { Winners } from '../../garage-and-winners/Winners';
import { LocalStorage } from '../../local-storage/Local-storage';
import { ButtonFactory } from './Button';
import { ButtonType, PaginationButtonsId, StorageKey } from '../../../types';
import { Pagination } from '../../pagination/Pagination';
import { disableButton, enableButton } from '../../../utils/helpers';
import { BaseCars } from '../../garage-and-winners/Base-cars';

export class PaginationButtonsFactory {
  public static getNextPageButton(view: Garage | Winners): HTMLButtonElement {
    const nextButton = ButtonFactory.create(ButtonType.Next);
    nextButton.id = PaginationButtonsId.next;
    nextButton.addEventListener('click', async () => {
      garagePagination.nextPage(view);
      this._savePageToLocalStorage(view);
      await view.initialize();
    });
    return nextButton;
  }

  public static getPreviousPageButton(
    view: Garage | Winners,
  ): HTMLButtonElement {
    const previousButton = ButtonFactory.create(ButtonType.Previous);
    previousButton.id = PaginationButtonsId.prev;
    previousButton.addEventListener('click', async () => {
      Pagination.prevPage(view);
      this._savePageToLocalStorage(view);
      await view.initialize();
    });
    return previousButton;
  }

  public static disablePaginationButtons(): void {
    disableButton(garageView.nextPageButton);
    disableButton(garageView.prevPageButton);
  }

  public static enablePaginationButtons(): void {
    if (!garagePagination.isLastPage(garage)) {
      enableButton(garageView.nextPageButton);
    } else {
      disableButton(garageView.nextPageButton);
    }

    if (!Pagination.isFirstPage(garage)) {
      enableButton(garageView.prevPageButton);
    } else {
      disableButton(garageView.prevPageButton);
    }
  }

  private static _savePageToLocalStorage(view: Garage | Winners): void {
    const key =
      view instanceof Garage ? StorageKey.GaragePage : StorageKey.WinnersPage;

    LocalStorage.setItemsToLocalStorage(key, view.currentPage);
  }
}
