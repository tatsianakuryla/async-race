import { garageViewSection, winners } from '../..';
import { WinnerItem } from '../car/Winner';
import { View } from './Base-view';

export class WinnersView extends View {
  constructor() {
    super('winners');
    const title = WinnerItem.getWinnersListTitle();

    this._container.append(
      title,
      this.itemsList,
      this._getPaginationButtonsContainer(winners),
    );
  }

  public override open(): void {
    super.open('/winners', garageViewSection);
    winners.initialize();
  }
}
