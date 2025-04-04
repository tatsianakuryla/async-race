import type { Car, CarAndWinner } from '../../types';
import { createElementWithClassId } from '../../utils/helpers';
import { CarSvg } from './Car-svg';

export class BaseCar {
  public carName: string;
  protected _car: HTMLLIElement;
  protected _svgContainer: HTMLElement;
  protected _svg: SVGElement;

  constructor(item: Car | CarAndWinner, classModificator: string) {
    this.carName = item.name;
    this._car = createElementWithClassId('li', ['app__item', 'flex']);
    this._car.setAttribute('data-id', String(item.id));

    this._svgContainer = createElementWithClassId('div', [
      'app__svg-container',
    ]);
    this._svgContainer.setAttribute('data-id', String(item.id));

    this._svg = BaseCar._getItemSvg(item.color);
    this._svg.setAttribute('data-id', String(item.id));

    this._svgContainer.append(this._svg);

    const container = createElementWithClassId('div', [
      'app__item-svg-title',
      'flex',
    ]);
    container.append(
      BaseCar._getItemInfo(item.name, classModificator),
      this._svgContainer,
    );
    this._car.append(container);
  }

  public get svgContainer(): HTMLElement {
    return this._svgContainer;
  }

  public get car(): HTMLLIElement {
    return this._car;
  }

  public get svg(): SVGElement {
    return this._svg;
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

  protected static _getItemSvg(color: string): SVGElement {
    const carSvg = new CarSvg(color);
    const svg = carSvg.svg;
    return svg;
  }
}
