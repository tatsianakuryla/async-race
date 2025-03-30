import type { CarAndWinner } from '../../types';
import { BaseCar } from './Base-car';

export class Winner extends BaseCar {
  constructor(item: CarAndWinner) {
    super(item);
    this._car.append(
      BaseCar._getItemInfo(String(item.wins)),
      BaseCar._getItemInfo(String(item.time)),
    );
  }
}
