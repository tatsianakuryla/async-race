import type { ItemsPerPage } from '../../types';
import type { Garage } from '../garage-and-winners/Garage';
import type { Winners } from '../garage-and-winners/Winners';

export class Pagination {
  protected static readonly FIRST_PAGE = 1;

  private _totalItems: number = 0;
  private _itemsPerPage: number;

  constructor(itemsPerPage: ItemsPerPage) {
    this._itemsPerPage = itemsPerPage;
  }

  public get totalPages(): number {
    return Math.ceil(this._totalItems / this._itemsPerPage) || 1;
  }

  public set totalItems(count: number) {
    this._totalItems = count;
  }

  public isFirstPage(viewHolder: Garage | Winners): boolean {
    return viewHolder.currentPage === Pagination.FIRST_PAGE;
  }

  public isLastPage(viewHolder: Garage | Winners): boolean {
    return viewHolder.currentPage === this.totalPages;
  }

  public nextPage(viewHolder: Garage | Winners): void {
    if (viewHolder.currentPage < this.totalPages) {
      viewHolder.currentPage += 1;
    }
  }

  public prevPage(viewHolder: Garage | Winners): void {
    if (viewHolder.currentPage > Pagination.FIRST_PAGE) {
      viewHolder.currentPage -= 1;
    }
  }

  public goToPage(page: number, viewHolder: Garage | Winners): void {
    if (page >= Pagination.FIRST_PAGE && page <= this.totalPages) {
      viewHolder.currentPage = page;
    }
  }
}
