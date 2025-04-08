import {
  carTransform,
  errorNotification,
  garage,
  garageApi,
  garageView,
  pagination,
  RANDOM_CAR_BRANDS,
  RANDOM_CAR_COLORS,
  RANDOM_CAR_MODELS,
} from '../..';
import { Car, TransformTask } from '../../types';
import {
  enableButton,
  getRandomIndex,
  textToUpperCase,
} from '../../utils/helpers';
import { GarageItem } from '../car/Garage-item';
import { BaseCars } from './Base-cars';
import { LocalStorage } from '../local-storage/Local-storage';
import type { AnimationManager } from '../animation/Animation';
import { View } from '../views/Base-view';
import { RaceButtonsFactory } from '../ui/buttons/Race-manage-buttons';
import { Modal } from '../ui/modal/modal';
import { Winners } from './Winners';
import { CarTransform } from '../ui/car-transform/Car-transform';

export class Garage extends BaseCars<Car> {
  public chosenCar: Car;
  public cars: Record<number, GarageItem> = {};
  public carsAnimations: AnimationManager[] = [];
  public raceDurations: { id: number; time: number; name: string }[] = [];

  constructor() {
    super(7);
    this.chosenCar = LocalStorage.getChosenCarFromLocalStorage() ?? {
      name: '',
      color: CarTransform.DEFAULT_COLOR_INPUT_VALUE,
      id: 0,
    };
    const pageNumber =
      LocalStorage.getItemsFromLocalStorage('garage-page-number');
    this._currentPage = pageNumber ? +pageNumber : 1;
  }

  public renderAll(cars: Car[]): void {
    garageView.itemsList.replaceChildren();
    cars.forEach((car) => {
      const baseCar = new GarageItem(car);
      this.cars[car.id] = baseCar;
      this.carsAnimations.push(baseCar.animation);
      garageView.itemsList.append(baseCar.car);
    });
  }

  public async initialize(): Promise<void> {
    this.cars = {};
    this.carsAnimations = [];
    this.raceDurations = [];
    try {
      await garageApi
        .getAll(this._itemsPerPage, 'id', 'ASC', garage)
        .then((response) => {
          this._items = response.results;
          this._itemsOnServerQuantity = response.totalCount;
          this.renderAll(this._items);
          garageView.updateTotalItemsQuantityInfo(garage);
          garageView.updatePageNumberInfo(garage);
          View.updatePaginationButtons(garageView, garage);
          const savedCar = LocalStorage.getChosenCarFromLocalStorage();
          if (savedCar && savedCar.id !== 0) {
            this.chosenCar = savedCar;
            carTransform.updateTitleInput.value = savedCar.name;
            carTransform.updateColorInput.value = savedCar.color;
          }
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
        this._resetFormAndReload(TransformTask.Create);
      }
    } catch {
      Garage._handleError('Creating car process ');
    }
  }

  public async updateCar(): Promise<void> {
    try {
      if (!this.chosenCar.id) {
        errorNotification.open('Failed to update the Item');
        return;
      }

      if (carTransform.updateTitleInput.value.trim()) {
        this.chosenCar.name = carTransform.updateTitleInput.value;
      } else {
        errorNotification.open('Failed to update the Item');
      }
      if (this.chosenCar.color !== carTransform.updateColorInput.value) {
        this.chosenCar.color = carTransform.updateColorInput.value;
      }
      await garageApi.updateItem(this.chosenCar);
      this._resetFormAndReload(TransformTask.Update);
    } catch {
      Garage._handleError('Failed to update the Item');
    }
  }

  public async deleteCar(dataId: string): Promise<void> {
    try {
      if (+dataId === this.chosenCar.id) {
        carTransform.cleanInputs(TransformTask.Update);
      }
      await garageApi.deleteItem(+dataId);
      await this.initialize();
    } catch {
      BaseCars._handleError('Failed to update the Car');
    }
  }

  public selectCar(dataId: string): void {
    this.chosenCar = this._items.find((car) => car.id === +dataId) ?? {
      name: '',
      color: '',
      id: 0,
    };
    LocalStorage.saveChosenCarToLocalStorage('chosenCar', this.chosenCar);
    carTransform.updateTitleInput.value = this.chosenCar.name;
    carTransform.updateColorInput.value = this.chosenCar.color;
  }

  public async startRace(): Promise<void> {
    const carsList = Object.entries(this.cars);
    carsList.forEach(([_, carItem]) => carItem.disableButtonsForRace());
    carTransform.disableButtonsForStartRace();
    await Promise.all(
      carsList.map(([id, carItem]) =>
        carItem.animation.prepareForStart(
          +id,
          carItem.svgContainer,
          carItem.svg,
        ),
      ),
    );
    requestAnimationFrame(() => {
      carsList.forEach(([id, carItem]) => {
        carItem.animation.runAnimation(+id, carItem.svg);
        carItem.raceTime = carItem.animation.duration;
        this.raceDurations.push({
          id: +id,
          time: +carItem.raceTime,
          name: carItem.carName,
        });
      });
      RaceButtonsFactory.manageButtonsRaceStart();
      this._manageRaceWinner();
    });
  }

  public async resetRace(): Promise<void> {
    const carsList = Object.entries(this.cars);
    carsList.forEach(([_, carItem]) => carItem.enableButtonsAfterRace());
    carTransform.enableButtonsForEndRace();
    await Promise.all(
      carsList.map(([id, carItem]) => {
        carItem.animation.stopAnimation(+id, carItem.svg);
      }),
    );
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
    if (!pagination.isLastPage(garage)) {
      enableButton(garageView.nextPageButton);
    }
  }

  private async _resetFormAndReload(type: TransformTask): Promise<void> {
    await this.initialize();
    carTransform.cleanInputs(type);
  }

  private async _manageRaceWinner(): Promise<void> {
    const winner = this.raceDurations.sort((a, b) => a.time - b.time)[0];
    const looser = this.raceDurations.sort((a, b) => b.time - a.time)[0];
    const maxTime = looser.time;
    const winnerTime = (winner.time / 1000).toFixed(2);
    const modal = new Modal(
      `The winner: ${winner.name}! Id: ${winner.id}, Time: ${winnerTime}s`,
    );
    setTimeout(() => {
      modal.open();
    }, maxTime + 1000);
    await Winners.saveWinner({ id: winner.id, time: +winnerTime });
  }
}
