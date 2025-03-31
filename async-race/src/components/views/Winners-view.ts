import { garageViewSection, main, startScreenComponents, winners } from '../..';
import { WinnerItem } from '../car/Winner';
import { PaginationButtonsFactory } from '../ui/buttons/Pagination-buttons';
import { ItemsListFactory } from '../ui/items-list/Items-list';
import { View } from './Base-view';

export class WinnersView extends View {
  public itemsList: HTMLOListElement;

  constructor() {
    super('winners');
    const title = WinnerItem.getWinnersListTitle();
    this.itemsList = ItemsListFactory.getOl();
    this.updatePageNumberInfo(winners);
    this._container.append(
      title,
      this.itemsList,
      PaginationButtonsFactory.getPreviousPageButton(winners),
      this.pageNumberInfo,
      PaginationButtonsFactory.getNextPageButton(winners),
    );
  }

  public override open(): void {
    super.open(garageViewSection);
    if (main.contains(startScreenComponents.section)) {
      startScreenComponents.section.remove();
    }
    winners.initialize();
  }
}
