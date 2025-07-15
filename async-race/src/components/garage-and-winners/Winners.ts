import {
  errorNotification,
  garageApi,
  winners,
  winnersApi,
  winnersPagination,
  winnersView,
} from '../..';
import {
  ItemsPerPage,
  Order,
  Sort,
  StorageKey,
  type CarAndWinner,
  type Winner,
  type WinnerInput,
} from '../../types';
import { WinnerItem } from '../garage-winners-item/Winner';
import { LocalStorage } from '../local-storage/Local-storage';
import { View } from '../views/Base-view';
import { BaseCars } from './Base-cars';

export class Winners extends BaseCars<Winner> {
  public sort: Sort;
  public order: Order;

  constructor() {
    super(ItemsPerPage.Winners);
    const raw = localStorage.getItem(StorageKey.WinnersPage);
    const pageNumber = raw !== null ? parseInt(raw, 10) : NaN;
    this._currentPage = Number.isNaN(pageNumber)
      ? BaseCars.DEFAULT_PAGE
      : pageNumber;
    const savedSort = LocalStorage.getSort(StorageKey.Sort);
    const savedOrder = LocalStorage.getOrder(StorageKey.Order);

    this.sort = savedSort ?? Sort.Time;
    this.order = savedOrder ?? Order.ASC;
  }

  public static async saveWinner(winner: WinnerInput): Promise<void> {
    try {
      const existingWinner = await winnersApi.getOne(winner.id);

      if (!existingWinner.id) {
        await this._createWinner({
          id: winner.id,
          wins: 1,
          time: winner.time,
        });
      } else {
        await this._updateExistingWinner(existingWinner, winner.time);
      }
    } catch {
      errorNotification.open('Failed to save the winner');
    }
  }

  private static async _createWinner(item: Winner): Promise<void> {
    await this._safeExecute(
      () => winnersApi.createItem(item),
      'Failed to create the winner',
    );
  }

  private static async _updateWinner(item: Winner): Promise<void> {
    await this._safeExecute(
      () => winnersApi.updateItem(item),
      'Failed to update the winner',
    );
  }

  private static async _updateExistingWinner(
    existing: Winner,
    newTime: number,
  ): Promise<void> {
    const updatedWinner: Winner = {
      id: existing.id,
      wins: existing.wins + 1,
      time: Math.min(existing.time, newTime),
    };
    await this._updateWinner(updatedWinner);
  }

  private static async _safeExecute<T>(
    action: () => Promise<T>,
    errorMessage: string,
  ): Promise<T | undefined> {
    try {
      return await action();
    } catch {
      this._reportError(errorMessage);
      return undefined;
    }
  }

  private static async _getWinnersFromGarage(
    winners: Winner[],
  ): Promise<CarAndWinner[]> {
    const results = await Promise.allSettled(
      winners.map(async (winner) => {
        const car = await garageApi.getOne(winner.id);
        return { ...car, wins: winner.wins, time: winner.time };
      }),
    );

    return results
      .filter(
        (result): result is PromiseFulfilledResult<CarAndWinner> =>
          result.status === 'fulfilled',
      )
      .map((result) => result.value);
  }

  public toggleOrder(sort: Sort): void {
    if (this.sort === sort && this.order === Order.ASC) {
      this.order = Order.DESC;
    } else if (this.sort === sort && this.order === Order.DESC) {
      this.order = Order.ASC;
    } else if (this.sort !== sort) {
      this.order = Order.ASC;
    }
    this.sort = sort;
    LocalStorage.setItem(StorageKey.Sort, this.sort);
    LocalStorage.setItem(StorageKey.Order, this.order);
  }

  public async initialize(): Promise<void> {
    await this._loadData();
    await this._renderView();
  }

  public async renderAll(winners: Winner[]): Promise<void> {
    const resultArray = await Winners._getWinnersFromGarage(winners);
    winnersView.itemsList.replaceChildren();

    resultArray.forEach((winner, index) => {
      const winnerCar = new WinnerItem(
        winner,
        (this.currentPage - 1) * this._itemsPerPage + 1 + index,
      );
      winnersView.itemsList.append(winnerCar.element);
    });
  }

  public async deleteCar(dataId: string): Promise<void> {
    await Winners._safeExecute(async () => {
      await winnersApi.deleteItem(+dataId);
      const response = await winnersApi.getAll(
        1,
        this.sort,
        this.order,
        winners,
      );
      const totalCount = response.totalCount;
      const maxPage = Math.ceil(totalCount / this._itemsPerPage);

      if (this._currentPage > maxPage) {
        this._currentPage = maxPage || 1;
        LocalStorage.setItem(StorageKey.WinnersPage, this._currentPage);
      }
      await this.initialize();
    }, 'Failed to delete the winner');
  }

  private async _loadData(): Promise<void> {
    try {
      const response = await winnersApi.getAll(
        this._itemsPerPage,
        this.sort,
        this.order,
        winners,
      );

      this._items = response.results;
      this._totalItemsCount = response.totalCount;
      winnersPagination.totalItems = this._totalItemsCount;
    } catch {
      Winners._reportError('Failed to load winners data');
    }
  }

  private async _renderView(): Promise<void> {
    await this.renderAll(this._items);
    winnersView.updateTotalItemsQuantityInfo(this);
    winnersView.updatePageNumberInfo(this);
    View.updatePaginationButtons(winnersView, winners);
    BaseCars._updatePagination(winners, winnersPagination, winnersView);
  }
}
