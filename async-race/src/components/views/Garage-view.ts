import { garage, winnersViewSection } from '../..';
import { PaginationButtonsFactory } from '../ui/buttons/Pagination-buttons';
import { View } from './Base-view';

export class GarageView extends View {
  constructor() {
    super('garage');
    this._container.append(
      PaginationButtonsFactory.getButtons(garage),
      this.pageNumberInfo,
    );
  }

  public override open(): void {
    super.open(winnersViewSection);
    garage.initialize();
  }
}
