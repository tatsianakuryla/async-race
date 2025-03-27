import { garageView, winnersView } from '../../..';
import { createButtonsContainer } from '../../../utils/helpers';
import { ButtonFactory } from './Button';

export class RouteButtonsFactory {
  public static getButtons(): HTMLElement {
    const buttonsContainer = createButtonsContainer('route');
    const visitGarageButton = ButtonFactory.create('visit garage');

    visitGarageButton.addEventListener('click', () => {
      garageView.open();
    });

    const visitWinnersButton = ButtonFactory.create('visit winners');

    visitWinnersButton.addEventListener('click', () => {
      winnersView.open();
    });

    buttonsContainer.append(visitGarageButton, visitWinnersButton);
    return buttonsContainer;
  }
}
