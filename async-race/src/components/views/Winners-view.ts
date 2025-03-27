import { garageViewSection } from '../..';
import { View } from './Base-view';

export class WinnersView extends View {
  constructor() {
    super('winners');
  }

  public override open(): void {
    super.open(garageViewSection);
  }
}
