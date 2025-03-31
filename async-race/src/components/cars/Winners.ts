import { garageApi, winners, winnersApi, winnersView } from '../..';
import type { CarAndWinner, Winner } from '../../types';
import { WinnerItem } from '../car/Winner';
import '../cars/garage.css';
import { BaseCars } from './Base-cars';

export class Winners extends BaseCars<Winner> {
  constructor() {
    super(10);
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
    } catch {
      Winners._handleError('Loading winners process');
    }
  }

  public async renderAll(winners: Winner[]): Promise<void> {
    const resultArray = await Winners._getWinnersFromGarage(winners);
    winnersView.itemsList.replaceChildren();

    resultArray.forEach((winner, index) => {
      const winnerCar = new WinnerItem(winner);
      const winnerLi = winnerCar.car;
      if (index === 0) {
        winnerLi.value = (this.currentPage - 1) * this._itemsPerPage + 1;
      }
      winnersView.itemsList.append(winnerLi);
    });
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

  public async createCar(item: Winner): Promise<void> {
    try {
      await winnersApi.createItem(item);
    } catch {
      Winners._handleError('Creating car process ');
    }
  }

  public async updateCar(item: Winner): Promise<void> {
    try {
      await winnersApi.updateItem(item);
    } catch {
      Winners._handleError('Updating car process ');
    }
  }

  public async deleteCar(dataId: string): Promise<void> {
    try {
      await winnersApi.deleteItem(+dataId);
      await this.initialize();
    } catch {
      BaseCars._handleError('Deleting car process ');
    }
  }
}
