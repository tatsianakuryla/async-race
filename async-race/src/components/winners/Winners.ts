import { garageApi, winners, winnersApi, winnersView } from '../..';
import type { CarAndWinner, Winner } from '../../types';
import { WinnerItem } from '../car/Winner';
import '../garage/garage.css';

export class Winners {
  private _winners: Winner[] = [];
  private _winnersOnServerQuantity = 0;
  private _currentPage: number;
  private _itemsPerPage: number = 10;

  constructor() {
    this._currentPage = 1;
  }

  public get currentPage(): number {
    return this._currentPage;
  }

  public get itemsQuantity(): number {
    return this._winnersOnServerQuantity;
  }

  public get items(): Winner[] {
    return this._winners;
  }

  public set currentPage(value: number) {
    this._currentPage = value;
  }

  public async renderAll(winners: Winner[]): Promise<void> {
    const scrollY = window.scrollY;
    winnersView.itemsList.replaceChildren();
    const resultArray = await Winners._getWinnersFromGarage(winners);
    resultArray.forEach((winner, index) => {
      const winnerCar = new WinnerItem(winner);
      const winnerLi = winnerCar.car;
      if (index === 0) {
        winnerLi.value = (this.currentPage - 1) * this._itemsPerPage + 1;
      }
      winnersView.itemsList.append(winnerLi);
    });

    window.scrollTo({ top: scrollY });
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

  private static _handleError(context: string): void {
    throw new Error(`${context} failed`);
    // TODO: Error modal
  }

  public async initialize(): Promise<void> {
    try {
      await winnersApi
        .getAll(this._itemsPerPage, 'time', 'ASC', winners)
        .then((response) => {
          this._winners = response.results;
          this._winnersOnServerQuantity = response.totalCount;
          this.renderAll(this._winners);
          winnersView.updateTotalItemsQuantityInfo(winners);
          winnersView.updatePageNumberInfo(winners);
        });
    } catch {
      Winners._handleError('Loading cars process ');
    }
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
      Winners._handleError('Deleting car process ');
    }
  }
}
