import type { ItemsPerPage } from '../../types';
import type { Garage } from '../cars/Garage';
import type { Winners } from '../cars/Winners';

export class Pagination {
  private _totalItems: number = 0;
  private _itemsPerPage: number;
  private _firstPage: number = 1;
  constructor(itemsPerPage: ItemsPerPage) {
    this._itemsPerPage = itemsPerPage;
  }

  public get totalPages(): number {
    return Math.ceil(this._totalItems / this._itemsPerPage) || 1;
  }

  public set totalItems(count: number) {
    this._totalItems = count;
  }

  public static isFirstPage(viewHolder: Garage | Winners): boolean {
    return viewHolder.currentPage === 1;
  }

  public nextPage(viewHolder: Garage | Winners): void {
    if (viewHolder.currentPage < this.totalPages) {
      viewHolder.currentPage += 1;
    }
  }

  public prevPage(viewHolder: Garage | Winners): void {
    if (viewHolder.currentPage > 1 && this.totalPages) {
      viewHolder.currentPage -= 1;
    }
  }

  public goToPage(page: number, viewHolder: Garage | Winners): void {
    if (page >= 1 && page <= this.totalPages) {
      viewHolder.currentPage = page;
    }
  }

  public isLastPage(viewHolder: Garage | Winners): boolean {
    return viewHolder.currentPage === this.totalPages;
  }

  public isFirstPage(viewHolder: Garage | Winners): boolean {
    return viewHolder.currentPage === this._firstPage;
  }
}
