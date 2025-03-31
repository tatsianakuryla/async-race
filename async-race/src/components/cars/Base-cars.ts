import { ItemsPerPage } from '../../types';

export abstract class BaseCars<T> {
  protected _items: T[] = [];
  protected _itemsOnServerQuantity = 0;
  protected _currentPage: number = 1;
  protected _itemsPerPage: ItemsPerPage;

  constructor(value: ItemsPerPage) {
    this._itemsPerPage = value;
  }

  public get currentPage(): number {
    return this._currentPage;
  }

  public get itemsQuantity(): number {
    return this._itemsOnServerQuantity;
  }

  public set currentPage(value: number) {
    this._currentPage = value;
  }

  protected static _handleError(context: string): void {
    throw new Error(`${context} failed`);
    // TODO: Error modal
  }
}
