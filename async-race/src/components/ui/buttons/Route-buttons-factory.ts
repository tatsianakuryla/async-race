import { garageView, winnersView } from '../../..';
import {
  createButtonsContainer,
  disableButton,
  enableButton,
} from '../../../utils/helpers';
import { ButtonFactory } from './Button';

export class RouteButtonsFactory {
  public static getButtons(): HTMLElement {
    const buttonsContainer = createButtonsContainer('route');
    const visitGarageButton = ButtonFactory.create('visit garage');
    disableButton(visitGarageButton);
    visitGarageButton.addEventListener('click', () => {
      garageView.open();
      enableButton(visitWinnersButton);
      disableButton(visitGarageButton);
    });

    const visitWinnersButton = ButtonFactory.create('visit winners');

    visitWinnersButton.addEventListener('click', () => {
      winnersView.open();
      enableButton(visitGarageButton);
      disableButton(visitWinnersButton);
    });

    buttonsContainer.append(visitGarageButton, visitWinnersButton);
    return buttonsContainer;
  }
}
