import { errorNotification } from '../..';
import type { ItemsPerPage } from '../../types';

export abstract class BaseCars<T> {
  protected static readonly DEFAULT_PAGE = 1;

  protected _items: T[] = [];
  protected _totalItemsCount = 0;
  protected _currentPage: number = BaseCars.DEFAULT_PAGE;
  protected _itemsPerPage: ItemsPerPage;

  constructor(value: ItemsPerPage) {
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
}
