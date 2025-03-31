import { garage, winners } from '../../..';
import { createButtonsContainer } from '../../../utils/helpers';
import { ButtonFactory } from './Button';

export class GarageItemsButtonsFactory {
  public static getButtons(id: number): HTMLElement {
    const buttonsContainer = createButtonsContainer('garage');
    buttonsContainer.append(this._getMainButtons(id), this._getRaceButtons(id));
    return buttonsContainer;
  }
  private static _getMainButtons(id: number): HTMLElement {
    const buttonsContainer = createButtonsContainer('garage-main');
    const selectItemButton = ButtonFactory.create('select');
    selectItemButton.dataset.id = String(id);

    selectItemButton.addEventListener('click', () => {
      const dataId = selectItemButton.getAttribute('data-id');
      if (dataId) {
        garage.selectCar(dataId);
      }
    });

    const deleteItemButton = ButtonFactory.create('delete');
    deleteItemButton.dataset.id = String(id);

    deleteItemButton.addEventListener('click', () => {
      const dataId = deleteItemButton.getAttribute('data-id');
      if (dataId) {
        garage.deleteCar(dataId);
        winners.deleteCar(dataId);
      }
    });

    buttonsContainer.append(selectItemButton, deleteItemButton);
    return buttonsContainer;
  }

  private static _getRaceButtons(id: number): HTMLElement {
    const buttonsContainer = createButtonsContainer('garage-race');
    const startRaceButton = ButtonFactory.create('start');
    startRaceButton.dataset.id = String(id);

    const stopRaceButton = ButtonFactory.create('stop');
    stopRaceButton.dataset.id = String(id);

    buttonsContainer.append(startRaceButton, stopRaceButton);
    return buttonsContainer;
  }
}
