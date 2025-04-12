import { garageView, winnersView } from '../../..';
import { ButtonType, RouteButtonType, CarHolders } from '../../../types';
import {
  createButtonsContainer,
  disableButton,
  enableButton,
} from '../../../utils/helpers';
import { ButtonFactory } from './Button';

export class RouteButtonsFactory {
  private static _visitGarageButton: HTMLButtonElement;
  private static _visitWinnersButton: HTMLButtonElement;

  public static get visitGarageButton(): HTMLButtonElement {
    return this._visitGarageButton;
  }

  public static get visitWinnersButton(): HTMLButtonElement {
    return this._visitWinnersButton;
  }

  public static createRouteButtons(): HTMLElement {
    const buttonsContainer = createButtonsContainer(ButtonType.Route);

    this._visitGarageButton = ButtonFactory.create(RouteButtonType.Garage);
    this._visitWinnersButton = ButtonFactory.create(RouteButtonType.Winners);

    this._visitGarageButton.addEventListener('click', () => {
      garageView.open();
      this.updateRouteButtonStates(CarHolders.Garage);
    });

    this._visitWinnersButton.addEventListener('click', () => {
      winnersView.open();
      this.updateRouteButtonStates(CarHolders.Winners);
    });

    buttonsContainer.append(this._visitGarageButton, this._visitWinnersButton);
    return buttonsContainer;
  }

  public static updateRouteButtonStates(active: CarHolders): void {
    if (active === CarHolders.Garage) {
      enableButton(this.visitWinnersButton);
      disableButton(this.visitGarageButton);
    } else {
      enableButton(this.visitGarageButton);
      disableButton(this.visitWinnersButton);
    }
  }
}
