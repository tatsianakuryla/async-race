import {
  errorNotification,
  garageApi,
  winners,
  winnersApi,
  winnersView,
} from '../..';
import type { CarAndWinner, Winner } from '../../types';
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

  private static async _createCar(item: Winner): Promise<void> {
    try {
      await winnersApi.createItem(item);
    } catch {
      Winners._handleError('Failed to create the Item');
    }
  }

  private static async _updateCar(item: Winner): Promise<void> {
    try {
      await winnersApi.updateItem(item);
    } catch {
      Winners._handleError('Failed to update the Item');
    }
  }

  public static async saveWinner(winner: {
    id: number;
    time: number;
  }): Promise<void> {
    try {
      const existingWinner: Winner = await winnersApi.getOne(winner.id);

      const updatedWinner: Winner = {
        id: winner.id,
        wins: existingWinner.wins + 1,
        time: Math.min(existingWinner.time, winner.time),
      };

      await Winners._updateCar(updatedWinner);
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'status' in error) {
        if (error.status === 404) {
          const newWinner: Winner = {
            id: winner.id,
            wins: 1,
            time: winner.time,
          };

          await Winners._createCar(newWinner);
          return;
        }
      }

      errorNotification.open('Failed to save the winner');
    }
  }

  private static async _getWinnersFromGarage(
    winners: Winner[],
  ): Promise<CarAndWinner[]> {
    const carAndWinnerPromises = winners.map(async (winner) => {
      const car = await garageApi.getOne(winner.id);
      return {
        ...car,
        wins: winner.wins,
        time: winner.time,
      };
    });

    return await Promise.all(carAndWinnerPromises);
  }

  public async initialize(): Promise<void> {
    try {
      const response = await winnersApi.getAll(
        this._itemsPerPage,
        'time',
        'ASC',
        winners,
      );

      this._items = response.results;
      this._itemsOnServerQuantity = response.totalCount;

      await this.renderAll(this._items);
      winnersView.updateTotalItemsQuantityInfo(this);
      winnersView.updatePageNumberInfo(this);
      View.updatePaginationButtons(winnersView, winners);
    } catch {
      Winners._handleError('Failed to load the Items');
    }
  }

  public async renderAll(winners: Winner[]): Promise<void> {
    const resultArray = await Winners._getWinnersFromGarage(winners);
    winnersView.itemsList.replaceChildren();

    resultArray.forEach((winner, index) => {
      const winnerCar = new WinnerItem(
        winner,
        (this.currentPage - 1) * this._itemsPerPage + 1 + index,
      );
      const winnerLi = winnerCar.car;
      winnersView.itemsList.append(winnerLi);
    });
  }

  public async deleteCar(dataId: string): Promise<void> {
    try {
      await winnersApi.deleteItem(+dataId);
      await this.initialize();
    } catch {
      BaseCars._handleError('Failed to delete the Item');
    }
  }
}
