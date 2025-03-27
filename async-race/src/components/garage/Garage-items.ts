import { garageApi, garageView } from '../..';
import type { Car } from '../../types';
import { GarageItem } from './Garage-item';
import './garage.css';

export class GarageItems {
  private _items: Car[] = [];
  private _itemsQuantity = 0;

  public get itemsQuantity(): number {
    return this._itemsQuantity;
  }

  public get items(): Car[] {
    return this._items;
  }

  public initialize(): void {
    garageApi.getAll(1, 7).then((response) => {
      this._items = response.results;
      this._itemsQuantity = this._items.length;
      this.render(this._items);
      //Remove and console.log
      console.log('Cars loaded:', this._items);
      console.log('Cars quantity:', this._itemsQuantity);
    });
  }

  public render(cars: Car[]): void {
    garageView.itemsList.replaceChildren('');
    cars.forEach((car) => garageView.itemsList.append(GarageItem.createItem(car)));
    garageView.totalItemsQuantityInfo.textContent = String(this._itemsQuantity);
  }
}
