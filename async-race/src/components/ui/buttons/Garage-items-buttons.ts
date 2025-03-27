import { createButtonsContainer } from '../../../utils/helpers';
import { ButtonFactory } from './Button';

export class GarageItemsButtonsFactory {
  public static getButtons(): HTMLElement {
    const buttonsContainer = createButtonsContainer('garage');
    buttonsContainer.append(this._getMainButtons(), this._getRaceButtons());
    return buttonsContainer;
  }
  private static _getMainButtons(): HTMLElement {
    const buttonsContainer = createButtonsContainer('garage-main');
    const selectItemButton = ButtonFactory.create('select');
    const deleteItemButton = ButtonFactory.create('delete');

    buttonsContainer.append(selectItemButton, deleteItemButton);
    return buttonsContainer;
  }

  private static _getRaceButtons(): HTMLElement {
    const buttonsContainer = createButtonsContainer('garage-race');
    const startRaceButton = ButtonFactory.create('start');
    const stopraceButton = ButtonFactory.create('stop');

    buttonsContainer.append(startRaceButton, stopraceButton);
    return buttonsContainer;
  }
}
