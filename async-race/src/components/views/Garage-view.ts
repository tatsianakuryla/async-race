import { carTransform, garage, winnersViewSection } from '../..';
import { createButtonsContainer } from '../../utils/helpers';
import { PaginationButtonsFactory } from '../ui/buttons/Pagination-buttons';
import { RaceButtonsFactory } from '../ui/buttons/Race-manage-buttons';
import { ItemsListFactory } from '../ui/items-list/Items-list';
import { View } from './Base-view';

export class GarageView extends View {
  public itemsList: HTMLUListElement;
  constructor() {
    super('garage');
    this.itemsList = ItemsListFactory.getUl();
    const buttonsContainer = createButtonsContainer('pagination');
    this.updatePageNumberInfo(garage);
    buttonsContainer.append(
      PaginationButtonsFactory.getPreviousPageButton(garage),
      this.pageNumberInfo,
      PaginationButtonsFactory.getNextPageButton(garage),
    );
    this._container.append(this.itemsList, buttonsContainer);
    this._container.prepend(
      carTransform.block,
      RaceButtonsFactory.getButtons(),
    );
  }

  public override open(): void {
    super.open(winnersViewSection);
    garage.initialize();
  }
}
