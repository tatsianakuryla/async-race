import type { CarAndWinner } from '../../types';
import { createElementWithClassId } from '../../utils/helpers';
import { BaseCar } from './Base-car';

export class WinnerItem extends BaseCar {
  constructor(item: CarAndWinner, index: number) {
    super(item, 'winners');
    this._car.classList.add('app__item_winners');
    this._car.prepend(BaseCar._getItemInfo(String(index), 'winners-number'));
    this._svgContainer.classList.add('app__svg-container_winners');
    this._car.append(
      BaseCar._getItemInfo(String(item.wins), 'winners-wins'),
      BaseCar._getItemInfo(String(item.time), 'winners-time'),
    );
  }

  public static getWinnersListTitle(): HTMLElement {
    const winnersTitle = createElementWithClassId('div', [
      'app__winners-list-title',
      'flex',
    ]);
    winnersTitle.append(
      BaseCar._getItemInfo('№', 'winners-number'),
      BaseCar._getItemInfo('Name', 'winners-name'),
      BaseCar._getItemInfo('Wins', 'winners-wins'),
      BaseCar._getItemInfo('Best time, sec', 'winners-time'),
    );
    return winnersTitle;
  }
}
