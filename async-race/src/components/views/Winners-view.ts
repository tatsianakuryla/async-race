import { garageViewSection, winners } from '../..';
import { CarHolders } from '../../types';
import { WinnerItem } from '../car/Winner';
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
    super.open('/winners', garageViewSection);
    winners.initialize();
    RouteButtonsFactory.updateRouteButtonStates(CarHolders.Winners);
  }
}
