import type { Car } from '../../types';
import { createButtonsContainer } from '../../utils/helpers';
import { AnimationManager } from '../animation/Animation';
import { ButtonFactory } from '../ui/buttons/Button';
import { GarageItemsButtonsFactory } from '../ui/buttons/Garage-items-buttons';
import { BaseCar } from './Base-car';

export class GarageItem extends BaseCar {
  public animation = new AnimationManager();
  constructor(item: Car) {
    super(item, 'garage');
    const garageButtons = GarageItemsButtonsFactory.getButtonsContainer(
      item.id,
    );
    this._svgContainer.classList.add('app__svg-container_garage');
    garageButtons.append(this._getRaceButtons(item.id));
    this._car.append(garageButtons);
  }

  private _startAnimation(id: number): void {
    this.animation
      .prepareForStart(id, this._svgContainer)
      .then(() => {
        this.animation.runAnimation(id, this._svg);
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
    const startRaceButton = ButtonFactory.create('start');
    startRaceButton.dataset.id = String(id);
    startRaceButton.addEventListener('click', () => {
      this._startAnimation(id);
    });

    const stopRaceButton = ButtonFactory.create('stop');
    stopRaceButton.dataset.id = String(id);

    stopRaceButton.addEventListener('click', () => {
      const id = stopRaceButton.getAttribute('data-id');
      if (id) {
        this._stopAnimation(+id);
      }
    });

    buttonsContainer.append(startRaceButton, stopRaceButton);
    return buttonsContainer;
  }
}
