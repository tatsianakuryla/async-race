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
import { BaseCars } from './Base-cars';
import { LocalStorage } from '../local-storage/Local-storage';
import './garage.css';

export class Garage extends BaseCars<Car> {
  public chosenCar: Car;

  constructor() {
    super(7);
    this.chosenCar = {
      name: '',
      color: '',
      id: 0,
    };
    const pageNumber =
      LocalStorage.getItemsFromLocalStorage('garage-page-number');
    this._currentPage = pageNumber ? +pageNumber : 1;
  }
  public static renderAll(cars: Car[]): void {
    garageView.itemsList.replaceChildren();
    cars.forEach((car) => {
      const baseCar = new GarageItem(car);
      garageView.itemsList.append(baseCar.car);
    });
  }

  public async initialize(): Promise<void> {
    try {
      await garageApi
        .getAll(this._itemsPerPage, 'id', 'ASC', garage)
        .then((response) => {
          this._items = response.results;
          this._itemsOnServerQuantity = response.totalCount;
          Garage.renderAll(this._items);
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
      BaseCars._handleError('Deleting car process ');
    }
  }

  public selectCar(dataId: string): void {
    this.chosenCar = this._items.find((car) => car.id === +dataId) ?? {
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
