import type { CarAndWinner } from '../../types';
import { createElementWithClassId } from '../../utils/helpers';
import { BaseCar } from './Base-car';

export class WinnerItem extends BaseCar {
  constructor(item: CarAndWinner) {
    super(item);
    this._car.append(
      BaseCar._getItemInfo(String(item.wins)),
      BaseCar._getItemInfo(String(item.time)),
    );
  }

  public static getWinnersListTitle(): HTMLElement {
    const winnersTitle = createElementWithClassId('div', [
      'app__winners-list-title',
      'flex',
    ]);
    winnersTitle.append(
      BaseCar._getItemInfo('№'),
      BaseCar._getItemInfo('Name'),
      BaseCar._getItemInfo('Color'),
      BaseCar._getItemInfo('Wins'),
      BaseCar._getItemInfo('Best time, sec'),
    );
    return winnersTitle;
  }
}
