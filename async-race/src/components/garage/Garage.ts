import {
  carTransform,
  garage,
  garageApi,
  garageView,
  RANDOM_CAR_BRANDS,
  RANDOM_CAR_COLORS,
  RANDOM_CAR_MODELS,
} from '../..';
import type { Car } from '../../types';
import { getRandomIndex, textToUpperCase } from '../../utils/helpers';
import { GarageItem } from '../car/Garage-item';
import './garage.css';

export class Garage {
  public chosenCar: Car;
  public _currentPage: number;
  private _cars: Car[] = [];
  private _carsOnServerQuantity = 0;

  constructor() {
    this.chosenCar = {
      name: '',
      color: '',
      id: 0,
    };
    this._currentPage = 1;
  }

  public get currentPage(): number {
    return this._currentPage;
  }

  public get itemsQuantity(): number {
    return this._carsOnServerQuantity;
  }

  public set currentPage(value: number) {
    this._currentPage = value;
  }

  public static renderAll(cars: Car[]): void {
    garageView.itemsList.replaceChildren();
    cars.forEach((car) => {
      const baseCar = new GarageItem(car);
      garageView.itemsList.append(baseCar.car);
    });
  }

  private static _handleError(context: string): void {
    throw new Error(`${context} failed`);
    // TODO: Error modal
  }

  public async initialize(): Promise<void> {
    try {
      await garageApi.getAll(7, 'id', 'ASC', garage).then((response) => {
        this._cars = response.results;
        this._carsOnServerQuantity = response.totalCount;
        Garage.renderAll(this._cars);
        garageView.updateTotalItemsQuantityInfo(garage);
        garageView.updatePageNumberInfo(garage);
        this._resetChosenCar();
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
      if (+dataId === this.chosenCar.id) {
        carTransform.cleanInputs('update');
      }
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

  public async add100RandomCars(): Promise<void> {
    const carPromises: Promise<Car>[] = [];
    for (let i = 1; i <= 100; i++) {
      const randomBrandIndex = getRandomIndex();
      const randomModelIndex = getRandomIndex();
      const randomColorIndex = getRandomIndex();
      const newCar: Car = {
        name:
          textToUpperCase(RANDOM_CAR_BRANDS[randomBrandIndex]) +
          ' ' +
          textToUpperCase(RANDOM_CAR_MODELS[randomModelIndex]),
        color: RANDOM_CAR_COLORS[randomColorIndex],
        id: 0,
      };
      carPromises.push(garageApi.createItem(newCar));
    }
    await Promise.all(carPromises);
    await this.initialize();
  }

  private _resetChosenCar(): void {
    this.chosenCar = { name: '', color: '', id: 0 };
  }

  private async _resetFormAndReload(type: 'create' | 'update'): Promise<void> {
    await this.initialize();
    carTransform.cleanInputs(type);
  }
}
