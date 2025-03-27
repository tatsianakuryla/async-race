import { createElementWithClassId } from '../../../utils/helpers';
import { ButtonFactory } from './button';

export class RouteButtonsFactory {
  public static getButtons(): HTMLElement {
    const buttonsContainer = createElementWithClassId('div', ['app__route-buttons-container']);
    const visitGarageButton = ButtonFactory.create('visit garage');
    const visitWinnersButton = ButtonFactory.create('visit winners');
    buttonsContainer.append(visitGarageButton, visitWinnersButton);
    return buttonsContainer;
  }
}
