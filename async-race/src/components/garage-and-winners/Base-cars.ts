import { errorNotification } from '../..';
import type { ItemsPerPage } from '../../types';
import { disableButton, enableButton } from '../../utils/helpers';
import type { Pagination } from '../pagination/Pagination';
import type { View } from '../views/Base-view';
import type { Garage } from './Garage';
import type { Winners } from './Winners';

export abstract class BaseCars<T> {
  protected static readonly DEFAULT_PAGE = 1;

  protected _items: T[] = [];
  protected _totalItemsCount = 0;
  protected _currentPage: number = BaseCars.DEFAULT_PAGE;
  protected _itemsPerPage: ItemsPerPage;

  protected constructor(value: ItemsPerPage) {
    this._itemsPerPage = value;
  }

  public get items(): T[] {
    return this._items;
  }

  public get currentPage(): number {
    return this._currentPage;
  }

  public get itemsQuantity(): number {
    return this._totalItemsCount;
  }

  public set currentPage(value: number) {
    this._currentPage = value;
  }

  protected static _reportError(context: string): void {
    errorNotification.open(context);
  }

  protected static _updatePagination(
    carHolder: Garage | Winners,
    pagination: Pagination,
    view: View,
  ): void {
    if (!pagination.isLastPage(carHolder)) {
      enableButton(view.nextPageButton);
    } else {
      disableButton(view.nextPageButton);
    }
  }
}
