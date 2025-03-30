import { pagination } from '../../..';
import { createButtonsContainer } from '../../../utils/helpers';
import type { Garage } from '../../garage/Garage';
import type { Winners } from '../../winners/Winners';
import { ButtonFactory } from './Button';

export class PaginationButtonsFactory {
  public static getButtons(carsHolder: Garage | Winners): HTMLElement {
    const buttonsContainer = createButtonsContainer('pagination');
    const previousButton = ButtonFactory.create('prev');
    const nextButton = ButtonFactory.create('next');
    previousButton.addEventListener('click', () => {
      pagination.prevPage();
      carsHolder.initialize();
    });
    nextButton.addEventListener('click', () => {
      pagination.nextPage();
      carsHolder.initialize();
    });

    buttonsContainer.append(previousButton, nextButton);
    return buttonsContainer;
  }
}
