import { createElementWithClassId } from '../../../utils/helpers';
import { ButtonFactory } from './Button';

export class RaceButtonsFactory {
  public static getButtons(): HTMLElement {
    const buttonsContainer = createElementWithClassId('div', ['app__manage-buttons-container', 'flex']);
    const raceAllButton = ButtonFactory.create('race all');
    const resetRaceButton = ButtonFactory.create('reset race');
    const generateCarsButton = ButtonFactory.create('generate cars');

    buttonsContainer.append(raceAllButton, resetRaceButton, generateCarsButton);
    return buttonsContainer;
  }
}
