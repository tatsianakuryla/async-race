import type { Car, CarAndWinner } from '../../types';
import { createElementWithClassId } from '../../utils/helpers';
import { CarSvg } from './Car-svg';

export class BaseCar {
  protected _car: HTMLLIElement;
  constructor(item: Car | CarAndWinner, classModificator: string) {
    this._car = createElementWithClassId('li', ['app__item', 'flex']);
    this._car.setAttribute('data-id', String(item.id));
    this._car.append(
      BaseCar._getItemInfo(item.name, classModificator),
      BaseCar._getItemSvg(item.color),
    );
  }

  public get car(): HTMLLIElement {
    return this._car;
  }

  protected static _getItemInfo(
    infoType: string,
    classModificator: string,
  ): HTMLElement {
    const carId = createElementWithClassId('div', [
      'app__item-title',
      `app__item-title_${classModificator}`,
    ]);
    carId.textContent = infoType;
    return carId;
  }

  protected static _getItemSvg(color: string): HTMLElement {
    const svgContainer = createElementWithClassId('div', [
      'app__svg-container',
    ]);
    const carSvg = new CarSvg(color);
    const svg = carSvg.svg;
    svgContainer.append(svg);
    return svgContainer;
  }
}
