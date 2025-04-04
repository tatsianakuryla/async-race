import { carTransform, garage, garageView, winnersView } from '../../..';
import {
  createButtonsContainer,
  disableButton,
  enableButton,
} from '../../../utils/helpers';
import { ButtonFactory } from './Button';
import { RaceButtonsFactory } from './Race-manage-buttons';

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
      const carsList = Object.entries(garage.cars);
      carsList.forEach(([_, carItem]) => carItem.enableButtonsAfterRace());
      carTransform.enableButtonsForEndRace();
    });

    buttonsContainer.append(visitGarageButton, visitWinnersButton);
    return buttonsContainer;
  }
}
