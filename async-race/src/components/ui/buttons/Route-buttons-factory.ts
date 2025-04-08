import { carTransform, garage, garageView, winnersView } from '../../..';
import { RouteButtonType, Views } from '../../../types';
import {
  createButtonsContainer,
  disableButton,
  enableButton,
} from '../../../utils/helpers';
import { ButtonFactory } from './Button';

export class RouteButtonsFactory {
  private static _visitGarageButton: HTMLButtonElement | null = null;
  private static _visitWinnersButton: HTMLButtonElement | null = null;

  public static get visitGarageButton(): HTMLButtonElement {
    if (!this._visitGarageButton) {
      throw new Error(
        'visitGarageButton not initialized. Call getButtons() first.',
      );
    }
    return this._visitGarageButton;
  }

  public static get visitWinnersButton(): HTMLButtonElement {
    if (!this._visitWinnersButton) {
      throw new Error(
        'visitWinnersButton not initialized. Call getButtons() first.',
      );
    }
    return this._visitWinnersButton;
  }

  public static getButtons(): HTMLElement {
    const buttonsContainer = createButtonsContainer('route');

    this._visitGarageButton = ButtonFactory.create(RouteButtonType.Garage);
    this._visitWinnersButton = ButtonFactory.create(RouteButtonType.Winners);

    this._visitGarageButton.addEventListener('click', () => {
      garageView.open();
      RouteButtonsFactory.toggleRouteButtons(Views.Garage);
    });

    this._visitWinnersButton.addEventListener('click', () => {
      winnersView.open();
      RouteButtonsFactory.toggleRouteButtons(Views.Winners);
      const carsList = Object.entries(garage.cars);
      carsList.forEach(([, carItem]) => carItem.enableButtonsAfterRace());
      carTransform.enableButtonsForEndRace();
    });

    buttonsContainer.append(this._visitGarageButton, this._visitWinnersButton);
    return buttonsContainer;
  }

  public static toggleRouteButtons(active: Views): void {
    if (active === Views.Garage) {
      enableButton(this.visitWinnersButton);
      disableButton(this.visitGarageButton);
    } else {
      enableButton(this.visitGarageButton);
      disableButton(this.visitWinnersButton);
    }
  }
}
