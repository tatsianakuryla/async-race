import { main, garagePagination } from '../..';
import { ButtonType, type CarHolders } from '../../types';
import {
  createButtonsContainer,
  createContainer,
  createElementWithClassId,
  disableButton,
  enableButton,
  textToUpperCase,
} from '../../utils/helpers';
import type { Garage } from '../garage-and-winners/Garage';
import type { Winners } from '../garage-and-winners/Winners';
import { Pagination } from '../pagination/Pagination';
import { ButtonFactory } from '../ui/buttons/Button';
import { PaginationButtonsFactory } from '../ui/buttons/Pagination-buttons';
import { ItemsListFactory } from '../ui/items-list/Items-list';
import type { GarageView } from './Garage-view';
import type { WinnersView } from './Winners-view';

export abstract class View {
  public prevPageButton: HTMLButtonElement = ButtonFactory.create(
    ButtonType.Previous,
  );
  public nextPageButton: HTMLButtonElement = ButtonFactory.create(
    ButtonType.Next,
  );
  public itemsList: HTMLUListElement;
  protected _totalItemsQuantityInfo: HTMLSpanElement;
  protected _section: HTMLElement;
  protected _container: HTMLElement;
  protected _pageNumberInfo: HTMLElement;
  protected _TOTAL_INFO_TEXT = 'Total quantity: ';

  constructor(viewModificator: CarHolders) {
    this._section = createElementWithClassId('section', [
      'app__view',
      `app__view_${viewModificator}`,
    ]);
    this._container = createContainer('view');

    this._totalItemsQuantityInfo = createElementWithClassId('span', [
      'app__items-quantity-info',
    ]);
    this._pageNumberInfo = createElementWithClassId('span', [
      'app__page-number',
    ]);
    this.itemsList = ItemsListFactory.getUl();
    this._container.append(
      View._getViewTitle(viewModificator),
      this._createTotalItemsInfoBlock(),
    );
    this._section.append(this._container);
  }

  public get section(): HTMLElement {
    return this._section;
  }

  public get pageNumberInfo(): HTMLElement {
    return this._pageNumberInfo;
  }

  public static updatePaginationButtons(
    view: GarageView | WinnersView,
    viewHolder: Garage | Winners,
  ): void {
    if (Pagination.isFirstPage(viewHolder)) {
      disableButton(view.prevPageButton);
    }
    if (garagePagination.isLastPage(viewHolder)) {
      disableButton(view.nextPageButton);
    }
  }

  private static _getViewTitle(viewModificator: CarHolders): HTMLElement {
    const title = createElementWithClassId('h3', ['app__view-title']);
    title.textContent = textToUpperCase(viewModificator);
    return title;
  }

  public open(route: string, sectionToClose: HTMLElement): void {
    import('../router/router').then(({ Router }) => {
      Router.navigateTo(route);
    });
    if (main.contains(sectionToClose)) {
      sectionToClose.remove();
    }
    if (!main.contains(this._section)) {
      main.append(this._section);
    }
  }

  public updateTotalItemsQuantityInfo(view: Garage | Winners): void {
    this._totalItemsQuantityInfo.textContent = String(view.itemsQuantity);
  }

  public updatePageNumberInfo(view: Garage | Winners): void {
    this._pageNumberInfo.textContent = String(view.currentPage);
  }

  protected _createTotalItemsInfoBlock(): HTMLElement {
    const title = createElementWithClassId('h4', ['app__view-total-info']);
    title.textContent = textToUpperCase(this._TOTAL_INFO_TEXT);
    title.append(this._totalItemsQuantityInfo);
    return title;
  }

  protected _getPaginationButtonsContainer(
    view: Garage | Winners,
  ): HTMLElement {
    const buttonsContainer = createButtonsContainer('pagination');
    this.updatePageNumberInfo(view);
    this.prevPageButton = PaginationButtonsFactory.getPreviousPageButton(view);
    this.nextPageButton = PaginationButtonsFactory.getNextPageButton(view);
    this.prevPageButton.addEventListener('click', () => {
      enableButton(this.nextPageButton);
      if (Pagination.isFirstPage(view)) {
        disableButton(this.prevPageButton);
      }
    });
    this.nextPageButton.addEventListener('click', () => {
      enableButton(this.prevPageButton);
      if (garagePagination.isLastPage(view)) {
        disableButton(this.nextPageButton);
      }
    });
    buttonsContainer.append(
      this.prevPageButton,
      this.pageNumberInfo,
      this.nextPageButton,
    );
    return buttonsContainer;
  }
}
