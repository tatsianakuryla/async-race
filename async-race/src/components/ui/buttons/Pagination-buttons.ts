import { pagination } from '../../..';
import type { Garage } from '../../garage/Garage';
import type { Winners } from '../../winners/Winners';
import { ButtonFactory } from './Button';

export class PaginationButtonsFactory {
  public static getNextPageButton(
    carsHolder: Garage | Winners,
  ): HTMLButtonElement {
    const nextButton = ButtonFactory.create('next');
    nextButton.addEventListener('click', async () => {
      pagination.nextPage(carsHolder);
      await carsHolder.initialize();
    });
    return nextButton;
  }

  public static getPreviousPageButton(
    carsHolder: Garage | Winners,
  ): HTMLButtonElement {
    const previousButton = ButtonFactory.create('prev');
    previousButton.addEventListener('click', async () => {
      pagination.prevPage(carsHolder);
      await carsHolder.initialize();
    });
    return previousButton;
  }
}
