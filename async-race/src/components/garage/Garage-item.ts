import type { Car } from '../../types';
import { createElementWithClassId } from '../../utils/helpers';
import { GarageItemsButtonsFactory } from '../ui/buttons/Garage-items-buttons';
import { CarSvg } from './Car-svg';

export class GarageItem {
  public static createItem(garageItem: Car): HTMLElement {
    const item = createElementWithClassId('li', ['app__garage-item', 'flex']);
    item.setAttribute('data-id', String(garageItem.id));
    item.append(
      this._getItemId(garageItem.id),
      this._getItemTitle(garageItem.name),
      this._getItemSvg(garageItem.color),
      GarageItemsButtonsFactory.getButtons(garageItem.id),
    );
    return item;
  }

  private static _getItemId(id: number): HTMLElement {
    const carId = createElementWithClassId('div', ['app__item-id']);
    carId.textContent = String(id);
    return carId;
  }

  private static _getItemTitle(name: string): HTMLElement {
    const carName = createElementWithClassId('h5', ['app__item-name']);
    carName.textContent = name;
    return carName;
  }

  private static _getItemSvg(color: string): SVGElement {
    const carSvg = new CarSvg(color);
    const svg = carSvg.svg;
    return svg;
  }
}
