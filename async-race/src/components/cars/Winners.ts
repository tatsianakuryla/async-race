import {
  errorNotification,
  garageApi,
  winners,
  winnersApi,
  winnersView,
} from '../..';
import type { CarAndWinner, Winner, WinnerInput } from '../../types';
import { WinnerItem } from '../car/Winner';
import { LocalStorage } from '../local-storage/Local-storage';
import { View } from '../views/Base-view';
import { BaseCars } from './Base-cars';

export class Winners extends BaseCars<Winner> {
  constructor() {
    super(10);
    const pageNumber = LocalStorage.getItemsFromLocalStorage(
      'winners-page-number',
    );
    this._currentPage = pageNumber ? +pageNumber : 1;
  }

  public static async saveWinner(winner: WinnerInput): Promise<void> {
    try {
      const existingWinner = await winnersApi.getOne(winner.id);

      if (!existingWinner?.id) {
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
    errorMsg: string,
  ): Promise<T | undefined> {
    try {
      return await action();
    } catch {
      this._handleError(errorMsg);
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
        (r): r is PromiseFulfilledResult<CarAndWinner> =>
          r.status === 'fulfilled',
      )
      .map((r) => r.value);
  }

  public async initialize(): Promise<void> {
    await this._loadData();
    await this._renderView();
  }

  private async _loadData(): Promise<void> {
    try {
      const response = await winnersApi.getAll(
        this._itemsPerPage,
        'time',
        'ASC',
        winners,
      );
      this._items = response.results;
      this._itemsOnServerQuantity = response.totalCount;
    } catch {
      Winners._handleError('Failed to load winners data');
    }
  }

  private async _renderView(): Promise<void> {
    await this.renderAll(this._items);
    winnersView.updateTotalItemsQuantityInfo(this);
    winnersView.updatePageNumberInfo(this);
    View.updatePaginationButtons(winnersView, winners);
  }

  public async renderAll(winners: Winner[]): Promise<void> {
    const resultArray = await Winners._getWinnersFromGarage(winners);
    winnersView.itemsList.replaceChildren();

    resultArray.forEach((winner, index) => {
      const winnerCar = new WinnerItem(
        winner,
        (this.currentPage - 1) * this._itemsPerPage + 1 + index,
      );
      winnersView.itemsList.append(winnerCar.car);
    });
  }

  public async deleteCar(dataId: string): Promise<void> {
    await Winners._safeExecute(async () => {
      await winnersApi.deleteItem(+dataId);
      await this.initialize();
    }, 'Failed to delete the winner');
  }
}
