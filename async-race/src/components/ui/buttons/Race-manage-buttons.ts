import { createButtonsContainer } from '../../../utils/helpers';
import { ButtonFactory } from './Button';

export class RaceButtonsFactory {
  public static getButtons(): HTMLElement {
    const buttonsContainer = createButtonsContainer('manage');
    const raceAllButton = ButtonFactory.create('race all');
    const resetRaceButton = ButtonFactory.create('reset race');
    const generateCarsButton = ButtonFactory.create('generate cars');

    buttonsContainer.append(raceAllButton, resetRaceButton, generateCarsButton);
    return buttonsContainer;
  }
}
