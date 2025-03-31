import type { Car, CarAndWinner } from '../../types';
import { createElementWithClassId } from '../../utils/helpers';
import { CarSvg } from './Car-svg';

export class BaseCar {
  protected _car: HTMLLIElement;
  constructor(item: Car | CarAndWinner) {
    this._car = createElementWithClassId('li', ['app__winner-item', 'flex']);
    this._car.setAttribute('data-id', String(item.id));
    this._car.append(
      BaseCar._getItemInfo(item.name),
      BaseCar._getItemSvg(item.color),
    );
  }

  public get car(): HTMLLIElement {
    return this._car;
  }

  protected static _getItemInfo(infoType: string): HTMLElement {
    const carId = createElementWithClassId('div', ['app__item-info']);
    carId.textContent = infoType;
    return carId;
  }

  protected static _getItemSvg(color: string): SVGElement {
    const carSvg = new CarSvg(color);
    const svg = carSvg.svg;
    return svg;
  }
}
