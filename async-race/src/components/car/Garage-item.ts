import type { Car } from '../../types';
import { GarageItemsButtonsFactory } from '../ui/buttons/Garage-items-buttons';
import { BaseCar } from './Base-car';

export class GarageItem extends BaseCar {
  constructor(item: Car) {
    super(item);
    this._car.append(GarageItemsButtonsFactory.getButtons(item.id));
  }
}
