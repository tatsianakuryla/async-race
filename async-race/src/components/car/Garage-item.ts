import { carTransform, garage, winners } from '../..';
import { ButtonType, type Car } from '../../types';
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
  public readonly startRaceButton = ButtonFactory.create(ButtonType.Start);
  public readonly stopRaceButton = ButtonFactory.create(ButtonType.Stop);
  public readonly deleteItemButton = ButtonFactory.create(ButtonType.Delete);
  public readonly selectItemButton = ButtonFactory.create(ButtonType.Select);
  public readonly animation = new AnimationManager();
  public raceTime = this.animation.duration;

  constructor(item: Car) {
    super(item, 'garage');
    const garageButtons = createButtonsContainer('garage');
    this._svgContainer.classList.add('app__svg-container_garage');
    garageButtons.append(
      this._createMainButtons(item.id),
      this._createRaceButtons(item.id),
    );
    this._element.append(garageButtons);
  }

  private static _setButtonId(button: HTMLButtonElement, id: number): void {
    button.dataset.id = String(id);
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
  }

  private _enableButtonsAfterIndividualRace(): void {
    disableButton(this.stopRaceButton);
    enableButton(this.startRaceButton);
    enableButton(this.deleteItemButton);
    enableButton(this.selectItemButton);
  }

  private _startCarAnimation(id: number): void {
    this.animation
      .prepareAnimation(id, this._svgContainer, this._svg)
      .then(() => {
        this.animation.runAnimation(id, this._svg);
        this.disableButtonsForIndividualRace();
      })
      .catch((error) => {
        throw new Error(`${error}`);
      });
  }

  private _stopCarAnimation(id: number): void {
    this.animation.stopAnimation(id, this._svg);
  }

  private _createRaceButtons(id: number): HTMLElement {
    const container = createButtonsContainer('garage-race');

    GarageItem._setButtonId(this.startRaceButton, id);
    GarageItem._setButtonId(this.stopRaceButton, id);

    disableButton(this.stopRaceButton);

    this.startRaceButton.addEventListener('click', () => {
      this._startCarAnimation(id);
    });

    this.stopRaceButton.addEventListener('click', () => {
      this._stopCarAnimation(id);
      this._enableButtonsAfterIndividualRace();
    });

    container.append(this.startRaceButton, this.stopRaceButton);
    return container;
  }

  private _createMainButtons(id: number): HTMLElement {
    const buttonsContainer = createButtonsContainer('garage-main');
    this.selectItemButton.dataset.id = String(id);

    this.selectItemButton.addEventListener('click', () => {
      garage.selectCar(String(id));
      LocalStorage.setItemsToLocalStorage(
        'update-title',
        carTransform.updateTitleInput.value,
      );
    });

    this.deleteItemButton.dataset.id = String(id);

    this.deleteItemButton.addEventListener('click', async () => {
      const stringId = String(id);
      garage.deleteCar(stringId);
      if (winners.items.some((winner) => winner.id === id)) {
        winners.deleteCar(stringId);
      }
    });

    buttonsContainer.append(this.selectItemButton, this.deleteItemButton);
    return buttonsContainer;
  }
}
