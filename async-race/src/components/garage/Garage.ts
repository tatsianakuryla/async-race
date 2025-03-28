import { carTransform, garageApi, garageView } from '../..';
import type { Car } from '../../types';
import { GarageItem } from './Garage-item';
import './garage.css';

export class Garage {
  public chosenCar: Car;
  private _cars: Car[] = [];
  private _carsOnServerQuantity = 0;

  constructor() {
    this.chosenCar = {
      name: '',
      color: '',
      id: 0,
    };
  }

  public get itemsQuantity(): number {
    return this._carsOnServerQuantity;
  }

  public get items(): Car[] {
    return this._cars;
  }

  public static renderAll(cars: Car[]): void {
    garageView.itemsList.replaceChildren();
    cars.forEach((car) =>
      garageView.itemsList.append(GarageItem.createItem(car)),
    );
  }

  private static _handleError(context: string): void {
    throw new Error(`${context} failed`);
    // TODO: Error modal
  }

  public async initialize(): Promise<void> {
    try {
      await garageApi.getAll(1, 7).then((response) => {
        this._cars = response.results;
        this._carsOnServerQuantity = response.totalCount;
        Garage.renderAll(this._cars);
        garageView.updateTotalItemsQuantityInfo();
        this._resetChosenCar();
        //Remove console.log
        console.log('Cars loaded:', this._cars);
      });
    } catch {
      Garage._handleError('Loading cars process ');
    }
  }

  public async createCar(): Promise<void> {
    try {
      if (carTransform.createTitleInput.value.trim()) {
        this.chosenCar.name = carTransform.createTitleInput.value;
        this.chosenCar.color = carTransform.createColorInput.value;
        await garageApi.createItem(this.chosenCar);
        this._resetFormAndReload('create');
      }
    } catch {
      Garage._handleError('Creating car process ');
    }
  }

  public async updateCar(): Promise<void> {
    try {
      if (!this.chosenCar.id) {
        // TODO: Show error modal
        return;
      }

      if (carTransform.updateTitleInput.value.trim()) {
        this.chosenCar.name = carTransform.updateTitleInput.value;
      } else {
        //TODO ERROR MODAL
      }
      if (this.chosenCar.color !== carTransform.updateColorInput.value) {
        this.chosenCar.color = carTransform.updateColorInput.value;
      }
      await garageApi.updateItem(this.chosenCar);
      this._resetFormAndReload('update');
    } catch {
      Garage._handleError('Updating car process ');
    }
  }

  public async deleteCar(dataId: string): Promise<void> {
    try {
      await garageApi.deleteItem(+dataId);
      await this.initialize();
    } catch {
      Garage._handleError('Deleting car process ');
    }
  }

  public selectCar(dataId: string): void {
    this.chosenCar = this._cars.find((car) => car.id === +dataId) ?? {
      name: '',
      color: '',
      id: 0,
    };
    carTransform.updateTitleInput.value = this.chosenCar.name;
    carTransform.updateColorInput.value = this.chosenCar.color;
  }

  private _resetChosenCar(): void {
    this.chosenCar = { name: '', color: '', id: 0 };
  }

  private async _resetFormAndReload(type: 'create' | 'update'): Promise<void> {
    await this.initialize();
    carTransform.cleanInputs(type);
  }
}
