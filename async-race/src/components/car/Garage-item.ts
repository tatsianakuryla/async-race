import { carTransform, garage, winners } from '../..';
import type { Car } from '../../types';
import {
  createButtonsContainer,
  disableButton,
  enableButton,
} from '../../utils/helpers';
import { AnimationManager } from '../animation/Animation';
import { LocalStorage } from '../local-storage/Local-storage';
import { ButtonFactory } from '../ui/buttons/Button';
import { BaseCar } from './Base-car';

export class GarageItem extends BaseCar {
  public startRaceButton = ButtonFactory.create('start');
  public stopRaceButton = ButtonFactory.create('stop');
  public deleteItemButton = ButtonFactory.create('delete');
  public selectItemButton = ButtonFactory.create('select');
  public animation = new AnimationManager();
  public raceTime = this.animation.duration;

  constructor(item: Car) {
    super(item, 'garage');
    const garageButtons = createButtonsContainer('garage');
    this._svgContainer.classList.add('app__svg-container_garage');
    garageButtons.append(
      this._getMainButtons(item.id),
      this._getRaceButtons(item.id),
    );
    this._car.append(garageButtons);
  }

  public disableButtonsForRace(): void {
    disableButton(this.startRaceButton);
    disableButton(this.stopRaceButton);
    disableButton(this.deleteItemButton);
    disableButton(this.selectItemButton);
  }

  public enableButtonsAfterRace(): void {
    enableButton(this.startRaceButton);
    enableButton(this.deleteItemButton);
    enableButton(this.selectItemButton);
  }

  public disableButtonsForIndividualRace(): void {
    enableButton(this.stopRaceButton);
    disableButton(this.startRaceButton);
    disableButton(this.deleteItemButton);
    disableButton(this.selectItemButton);
    carTransform.disableButtonsForStartRace();
  }

  private _enableButtonsForIndividualRace(): void {
    disableButton(this.stopRaceButton);
    enableButton(this.startRaceButton);
    enableButton(this.deleteItemButton);
    enableButton(this.selectItemButton);
    carTransform.enableButtonsForEndRace();
  }

  private _startAnimation(id: number): void {
    this.animation
      .prepareForStart(id, this._svgContainer, this._svg)
      .then(() => {
        this.animation.runAnimation(id, this._svg);
        this.disableButtonsForIndividualRace();
      })
      .catch((error) => {
        throw new Error(`${error}`);
      });
  }

  private _stopAnimation(id: number): void {
    this.animation.stopAnimation(id, this._svg);
  }

  private _getRaceButtons(id: number): HTMLElement {
    const buttonsContainer = createButtonsContainer('garage-race');
    this.startRaceButton.dataset.id = String(id);
    this.startRaceButton.addEventListener('click', () => {
      this._startAnimation(id);
    });

    this.stopRaceButton.dataset.id = String(id);
    disableButton(this.stopRaceButton);
    this.stopRaceButton.addEventListener('click', () => {
      const id = this.stopRaceButton.getAttribute('data-id');
      if (id) {
        this._stopAnimation(+id);
      }
      this._enableButtonsForIndividualRace();
    });

    buttonsContainer.append(this.startRaceButton, this.stopRaceButton);
    return buttonsContainer;
  }

  private _getMainButtons(id: number): HTMLElement {
    const buttonsContainer = createButtonsContainer('garage-main');
    this.selectItemButton.dataset.id = String(id);

    this.selectItemButton.addEventListener('click', () => {
      const dataId = this.selectItemButton.getAttribute('data-id');
      if (dataId) {
        garage.selectCar(dataId);
      }
      LocalStorage.setItemsToLocalStorage(
        'update-title',
        carTransform.updateTitleInput.value,
      );
    });

    this.deleteItemButton.dataset.id = String(id);

    this.deleteItemButton.addEventListener('click', async () => {
      const dataId = this.deleteItemButton.getAttribute('data-id');
      if (dataId) {
        garage.deleteCar(dataId);
        if (winners.items.some((winner) => winner.id === +dataId)) {
          winners.deleteCar(dataId);
        }
      }
    });

    buttonsContainer.append(this.selectItemButton, this.deleteItemButton);
    return buttonsContainer;
  }
}
