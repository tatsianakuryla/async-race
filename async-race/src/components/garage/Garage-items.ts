import { carForm, garageApi, garageView } from '../..';
import type { Car } from '../../types';
import { GarageItem } from './Garage-item';
import './garage.css';

export class GarageItems {
  public chosenCar: Car;
  private _items: Car[] = [];
  private _itemsQuantity = 0;

  constructor() {
    this.chosenCar = {
      name: '',
      color: '',
      id: 0,
    };
  }

  public get itemsQuantity(): number {
    return this._itemsQuantity;
  }

  public get items(): Car[] {
    return this._items;
  }

  public static renderCar(car: Car): void {
    garageView.itemsList.append(GarageItem.createItem(car));
    garageView.updateTotalItemsQuantityInfo();
  }

  public initialize(): void {
    garageApi.getAll(1, 7).then((response) => {
      this._items = response.results;
      this._itemsQuantity = this._items.length;
      this.renderAllCars(this._items);
      this.chosenCar = {
        name: '',
        color: '',
        id: 0,
      };
      //Remove and console.log
      console.log('Cars loaded:', this._items);
    });
  }

  public renderAllCars(cars: Car[]): void {
    garageView.itemsList.replaceChildren('');
    cars.forEach((car) =>
      garageView.itemsList.append(GarageItem.createItem(car)),
    );
    garageView.totalItemsQuantityInfo.textContent = String(this._itemsQuantity);
  }

  public createCar(): void {
    // garageApi.createItem();
  }

  public updateCar(): void {
    if (carForm.updateTitleInput.value.trim()) {
      this.chosenCar.name = carForm.updateTitleInput.value;
    } else {
      //TODO ERROR MODAL
    }
    if (this.chosenCar.color !== carForm.updateColorInput.value) {
      this.chosenCar.color = carForm.updateColorInput.value;
    }
    garageApi.updateItem(this.chosenCar);
    this.initialize();
    carForm.cleanInputs('update');
  }

  public selectCar(dataId: string): void {
    this._items.forEach((car) => {
      if (car.id === +dataId) {
        this.chosenCar = car;
      }
    });
    carForm.updateTitleInput.value = this.chosenCar.name;
    carForm.updateColorInput.value = this.chosenCar.color;
  }

  public deleteCar(dataId: string): void {
    garageApi.deleteItem(+dataId);
    this.initialize();
  }
}
