import { garageApi } from '../..';
import { type Car } from '../../api/api-types';

export class Garage {
  private _items: Car[] = [];
  private _itemsQuantity = 0;

  public get itemsQuantity(): number {
    return this._itemsQuantity;
  }

  public initialize() {
    garageApi.getAll(1, 7).then((response) => {
      this._items = response.results;
      this._itemsQuantity = this._items.length;
      console.log('Cars loaded:', this._items);
      console.log('Cars quantity:', this._itemsQuantity);
    });
  }
}
