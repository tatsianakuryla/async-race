import { garage } from '../../..';
import {
  createButtonsContainer,
  disableButton,
  enableButton,
} from '../../../utils/helpers';
import { ButtonFactory } from './Button';

export class RaceButtonsFactory {
  private static _raceAllButton = ButtonFactory.create('race all');
  private static _resetRaceButton = ButtonFactory.create('reset race');
  private static _generateCarsButton = ButtonFactory.create('generate cars');

  public static getButtons(): HTMLElement {
    const buttonsContainer = createButtonsContainer('manage');
    disableButton(this._resetRaceButton);
    this._raceAllButton.addEventListener('click', () => {
      garage.startRace();
      disableButton(this._raceAllButton);
      disableButton(this._generateCarsButton);
    });

    this._resetRaceButton.addEventListener('click', () => {
      garage.resetRace();
      RaceButtonsFactory.manageButtonsRaceEnd();
    });

    this._generateCarsButton.addEventListener('click', () => {
      garage.add100RandomCars();
    });

    buttonsContainer.append(
      this._raceAllButton,
      this._resetRaceButton,
      this._generateCarsButton,
    );
    return buttonsContainer;
  }

  public static manageButtonsRaceStart(): void {
    disableButton(this._raceAllButton);
    disableButton(this._generateCarsButton);
    enableButton(this._resetRaceButton);
  }

  public static manageButtonsRaceEnd(): void {
    disableButton(this._resetRaceButton);
    enableButton(this._raceAllButton);
    enableButton(this._generateCarsButton);
  }
}
