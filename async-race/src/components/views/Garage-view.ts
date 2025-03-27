import { winnersViewSection } from '../..';
import { View } from './Base-view';

export class GarageView extends View {
  constructor() {
    super('garage');
  }

  public override open(): void {
    super.open(winnersViewSection);
  }
}
