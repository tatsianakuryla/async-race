import { carTransform, garage, winnersViewSection } from '../..';
import { Views } from '../../types';
import { RaceButtonsFactory } from '../ui/buttons/Race-manage-buttons';
import { View } from './Base-view';

export class GarageView extends View {
  constructor() {
    super(Views.Garage);
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
    super.open('/garage', winnersViewSection);
    garage.initialize();
  }
}
