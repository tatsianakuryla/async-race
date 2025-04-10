import {
  carTransform,
  errorNotification,
  garage,
  garageApi,
  garageView,
  pagination,
} from '../..';
import type { Car } from '../../types';
import { ItemsPerPage, Order, Sort, TransformTask } from '../../types';
import { enableButton, getTrimmedInputValue } from '../../utils/helpers';
import { GarageItem } from '../car/Garage-item';
import { BaseCars } from './Base-cars';
import { CarTransform } from '../ui/car-transform/Car-transform';
import { RaceButtonsFactory } from '../ui/buttons/Race-manage-buttons';
import { GarageStorageManager } from './Garage-storage-manager';
import { CarGenerator } from './Cars-generator';
import { RaceManager } from './Race-manager';
import { View } from '../views/Base-view';

export class Garage extends BaseCars<Car> {
  private static readonly EMPTY_CAR: Car = {
    id: 0,
    name: '',
    color: CarTransform.DEFAULT_COLOR_INPUT_VALUE,
  };
  public chosenCar: Car;
  public cars: Record<number, GarageItem> = {};
  private _raceManager: RaceManager = new RaceManager();
  private _newCar: Car = Garage.EMPTY_CAR;

  constructor() {
    super(ItemsPerPage.Garage);
    this.chosenCar = GarageStorageManager.getChosenCar() ?? Garage.EMPTY_CAR;
    const page = GarageStorageManager.getCurrentPage();
    this._currentPage = page ?? BaseCars.DEFAULT_PAGE;
  }

  private static _showError(message: string): void {
    errorNotification.open(message);
    Garage._reportError(message);
  }

  public async initialize(): Promise<void> {
    this._resetLocalState();
    try {
      const response = await garageApi.getAll(
        this._itemsPerPage,
        Sort.Id,
        Order.ASC,
        garage,
      );
      if (!response || !Array.isArray(response.results)) {
        throw new Error('Invalid API response');
      }

      this._items = response.results;
      this._totalItemsCount = response.totalCount;

      this._renderGarageUI();

      const savedCar = GarageStorageManager.getChosenCar();
      if (savedCar && savedCar.id !== 0) {
        this._setChosenCar(savedCar);
      }

      GarageStorageManager.saveCurrentPage(this._currentPage);
      this._updatePagination();
      RaceButtonsFactory.manageButtonsRaceEnd();
    } catch {
      Garage._showError('Failed to load cars');
    }
  }

  public renderAll(cars: Car[]): void {
    garageView.itemsList.replaceChildren();
    this.cars = {};
    cars.forEach((car) => {
      const item = new GarageItem(car);
      this.cars[car.id] = item;
      garageView.itemsList.append(item.element);
    });
  }

  public async createCar(): Promise<void> {
    const { createTitleInput, createColorInput, createButton } = carTransform;
    const title = getTrimmedInputValue(createTitleInput);
    if (!title) return;

    createButton.disabled = true;

    try {
      this._newCar = {
        id: 0,
        name: title,
        color: createColorInput.value,
      };

      await garageApi.createItem(this._newCar);
      await this._reloadAndResetForm(TransformTask.Create);
    } catch {
      Garage._showError('Failed to create car');
    } finally {
      createButton.disabled = false;
    }
  }

  public async updateCar(): Promise<void> {
    const { updateTitleInput, updateColorInput, updateButton } = carTransform;

    if (!this.chosenCar.id) {
      errorNotification.open('Failed to update: No selected car');
      return;
    }

    const title = getTrimmedInputValue(updateTitleInput);
    if (!title) {
      errorNotification.open('Car name cannot be empty');
      return;
    }

    updateButton.disabled = true;

    try {
      this.chosenCar.name = title;
      this.chosenCar.color = updateColorInput.value;

      await garageApi.updateItem(this.chosenCar);
      await this._reloadAndResetForm(TransformTask.Update);
    } catch {
      Garage._showError('Failed to update car');
    } finally {
      updateButton.disabled = false;
    }
  }

  public async deleteCar(dataId: string): Promise<void> {
    if (+dataId === this.chosenCar.id) {
      carTransform.cleanInputs(TransformTask.Update);
    }

    try {
      await garageApi.deleteItem(+dataId);
      await this.initialize();
    } catch {
      Garage._showError('Failed to delete car');
    }
  }

  public selectCar(dataId: string): void {
    this._setChosenCar(
      this._items.find((car) => car.id === +dataId) ?? Garage.EMPTY_CAR,
    );
  }

  public async startRace(): Promise<void> {
    await this._raceManager.startRace(this.cars);
    RaceButtonsFactory.manageButtonsRaceStart();
  }

  public async resetRace(): Promise<void> {
    await this._raceManager.resetRace(this.cars);
    carTransform.enableButtonsForEndRace();
  }

  public async add100RandomCars(): Promise<void> {
    const cars = CarGenerator.generateBatch(100);
    const createPromises = cars.map((car) => garageApi.createItem(car));

    try {
      await Promise.all(createPromises);
      await this.initialize();

      this._updatePagination();
    } catch {
      Garage._showError('Failed to add random cars');
    }
  }

  private _updateTransformFromSelectedCar(): void {
    carTransform.updateTitleInput.value = this.chosenCar.name;
    carTransform.updateColorInput.value = this.chosenCar.color;
  }

  private _resetLocalState(): void {
    this.cars = {};
    this._newCar = Garage.EMPTY_CAR;
  }

  private async _reloadAndResetForm(type: TransformTask): Promise<void> {
    await this.initialize();
    carTransform.cleanInputs(type);
  }

  private _renderGarageUI(): void {
    this.renderAll(this._items);
    garageView.updateTotalItemsQuantityInfo(this);
    garageView.updatePageNumberInfo(this);
    View.updatePaginationButtons(garageView, this);
  }

  private _setChosenCar(car: Car): void {
    this.chosenCar = car;
    GarageStorageManager.saveChosenCar(car);
    this._updateTransformFromSelectedCar();
  }

  private _updatePagination(): void {
    if (!pagination.isLastPage(this)) {
      enableButton(garageView.nextPageButton);
    }
  }
}
