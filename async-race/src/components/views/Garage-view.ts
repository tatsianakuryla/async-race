import { garage, winnersViewSection } from '../..';
import { createButtonsContainer } from '../../utils/helpers';
import { PaginationButtonsFactory } from '../ui/buttons/Pagination-buttons';
import { View } from './Base-view';

export class GarageView extends View {
  constructor() {
    super('garage');
    const buttonsContainer = createButtonsContainer('pagination');
    buttonsContainer.append(
      PaginationButtonsFactory.getPreviousPageButton(garage),
      this.pageNumberInfo,
      PaginationButtonsFactory.getNextPageButton(garage),
    );
    this._container.append(buttonsContainer);
  }

  public override open(): void {
    super.open(winnersViewSection);
    garage.initialize();
  }
}
