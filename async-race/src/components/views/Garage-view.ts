import { carTransform, garage, winnersViewSection } from '../..';
import { CarHolders, RouteValues } from '../../types';
import { RaceButtonsFactory } from '../ui/buttons/Race-manage-buttons';
import { RouteButtonsFactory } from '../ui/buttons/Route-buttons-factory';
import { View } from './Base-view';

export class GarageView extends View {
  constructor() {
    super(CarHolders.Garage);
    this._container.append(
      this.itemsList,
      this._getPaginationButtonsContainer(garage),
    );
    this._container.prepend(
      carTransform.block,
      RaceButtonsFactory.getButtons(),
    );
  }

  public override open(): void {
    super.open(RouteValues.GARAGE, winnersViewSection);
    garage.initialize().then(() => {});
    RouteButtonsFactory.updateRouteButtonStates(CarHolders.Garage);
  }
}
