import { Garage } from '../garage/Garage';
import { Winners } from '../winners/Winners';

export class Pagination {
  private _totalItems: number = 0;
  private _itemsPerPage: number;

  constructor(itemsPerPage = 7) {
    this._itemsPerPage = itemsPerPage;
  }

  public get totalPages(): number {
    return Math.ceil(this._totalItems / this._itemsPerPage) || 1;
  }

  public set totalItems(count: number) {
    this._totalItems = count;
  }

  public nextPage(viewHolder: Garage | Winners): void {
    if (viewHolder.currentPage < this.totalPages) {
      viewHolder.currentPage++;
    }
  }

  public prevPage(viewHolder: Garage | Winners): void {
    if (viewHolder.currentPage > 1) {
      viewHolder.currentPage--;
    }
  }

  public goToPage(page: number, viewHolder: Garage | Winners): void {
    if (page >= 1 && page <= this.totalPages) {
      viewHolder.currentPage = page;
    }
  }

  public isFirstPage(viewHolder: Garage | Winners): boolean {
    return viewHolder.currentPage === 1;
  }

  public isLastPage(viewHolder: Garage | Winners): boolean {
    return viewHolder.currentPage === this.totalPages;
  }
}
