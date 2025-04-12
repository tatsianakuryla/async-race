import { winners } from '../..';
import type { CarAndWinner} from '../../types';
import { ButtonType, Sort } from '../../types';
import { createElementWithClassId } from '../../utils/helpers';
import { ButtonFactory } from '../ui/buttons/Button';
import { BaseCar } from './Base-car';

export class WinnerItem extends BaseCar {
  constructor(item: CarAndWinner, index: number) {
    super(item, 'winners');
    this._element.classList.add('app__item_winners');
    this._element.prepend(
      BaseCar._getItemInfo(String(index), 'winners-number'),
    );
    this._svgContainer.classList.add('app__svg-container_winners');
    this._element.append(
      BaseCar._getItemInfo(String(item.wins), 'winners-wins'),
      BaseCar._getItemInfo(String(item.time), 'winners-time'),
    );
  }

  public static getWinnersListTitle(): HTMLElement {
    const winnersTitle = createElementWithClassId('div', [
      'app__winners-list-title',
      'flex',
    ]);
    const winsBlock = BaseCar._getItemInfo('Wins', 'winners-wins');
    winsBlock.append(WinnerItem._getSortButton(Sort.Wins));
    const timeBlock = BaseCar._getItemInfo('Best time, sec', 'winners-time');
    timeBlock.append(WinnerItem._getSortButton(Sort.Time));
    winnersTitle.append(
      BaseCar._getItemInfo('№', 'winners-number'),
      BaseCar._getItemInfo('Name', 'winners-name'),
      winsBlock,
      timeBlock,
    );
    return winnersTitle;
  }

  private static _getSortButton(sort: Sort): HTMLButtonElement {
    const button = ButtonFactory.create(ButtonType.Sort);
    button.textContent = '';
    button.addEventListener('click', () => {
      winners.toggleOrder(sort);
      winners.initialize();
    });
    return button;
  }
}
