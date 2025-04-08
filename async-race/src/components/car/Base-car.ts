import type { Car, CarAndWinner } from '../../types';
import { createElementWithClassId } from '../../utils/helpers';
import { CarSvg } from './Car-svg';

export class BaseCar {
  public readonly name: string;
  protected _element: HTMLLIElement;
  protected _svgContainer: HTMLElement;
  protected _svg: SVGElement;

  constructor(item: Car | CarAndWinner, infoTypeClass: string) {
    this.name = item.name;
    this._element = createElementWithClassId('li', ['app__item', 'flex']);
    this._element.setAttribute('data-id', String(item.id));

    this._svgContainer = createElementWithClassId('div', [
      'app__svg-container',
    ]);
    this._svgContainer.setAttribute('data-id', String(item.id));

    this._svg = BaseCar._createCarSvg(item.color);
    this._svg.setAttribute('data-id', String(item.id));

    this._svgContainer.append(this._svg);

    const container = createElementWithClassId('div', [
      'app__item-svg-title',
      'flex',
    ]);
    container.append(
      BaseCar._getItemInfo(item.name, infoTypeClass),
      this._svgContainer,
    );
    this._element.append(container);
  }

  public get svgContainer(): HTMLElement {
    return this._svgContainer;
  }

  public get element(): HTMLLIElement {
    return this._element;
  }

  public get svg(): SVGElement {
    return this._svg;
  }

  protected static _getItemInfo(text: string, type: string): HTMLElement {
    const carId = createElementWithClassId('div', [
      'app__item-title',
      `app__item-title_${type}`,
    ]);
    carId.textContent = text;
    return carId;
  }

  protected static _createCarSvg(color: string): SVGElement {
    const carSvg = new CarSvg(color);
    const svg = carSvg.svg;
    return svg;
  }
}
