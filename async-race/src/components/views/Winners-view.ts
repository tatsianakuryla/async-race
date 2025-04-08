import { garageViewSection, winners } from '../..';
import { Views } from '../../types';
import { WinnerItem } from '../car/Winner';
import { RouteButtonsFactory } from '../ui/buttons/Route-buttons-factory';
import { View } from './Base-view';

export class WinnersView extends View {
  constructor() {
    super(Views.Winners);
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
    RouteButtonsFactory.updateRouteButtonStates(Views.Winners);
  }
}
