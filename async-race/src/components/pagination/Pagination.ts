export class Pagination {
  private _currentPage: number = 1;
  private _totalItems: number = 0;
  private _itemsPerPage: number;

  constructor(itemsPerPage = 7) {
    this._itemsPerPage = itemsPerPage;
  }
  public get currentPage(): number {
    return this._currentPage;
  }

  public get totalPages(): number {
    return Math.ceil(this._totalItems / this._itemsPerPage) || 1;
  }

  public set totalItems(count: number) {
    this._totalItems = count;
  }

  public nextPage(): void {
    if (this._currentPage < this.totalPages) {
      this._currentPage++;
    }
  }

  public prevPage(): void {
    if (this._currentPage > 1) {
      this._currentPage--;
    }
  }

  public goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this._currentPage = page;
    }
  }

  public isFirstPage(): boolean {
    return this._currentPage === 1;
  }

  public isLastPage(): boolean {
    return this._currentPage === this.totalPages;
  }
}
