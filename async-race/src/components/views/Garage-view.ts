import { carTransform, garage, winnersViewSection } from '../..';
import { RaceButtonsFactory } from '../ui/buttons/Race-manage-buttons';
import { View } from './Base-view';

export class GarageView extends View {
  constructor() {
    super('garage');
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
