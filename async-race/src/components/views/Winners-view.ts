import { garageViewSection, winners } from '../..';
import { CarHolders, RouteValues } from '../../types';
import { WinnerItem } from '../garage-winners-item/Winner';
import { RouteButtonsFactory } from '../ui/buttons/Route-buttons-factory';
import { View } from './Base-view';

export class WinnersView extends View {
  constructor() {
    super(CarHolders.Winners);
    const title = WinnerItem.getWinnersListTitle();

    this._container.append(
      title,
      this.itemsList,
      this._getPaginationButtonsContainer(winners),
    );
  }

  public override open(): void {
    super.open(RouteValues.WINNERS, garageViewSection);
    winners.initialize().then(() => {});
    RouteButtonsFactory.updateRouteButtonStates(CarHolders.Winners);
  }
}
