import { carTransform } from '../../..';
import {
  createContainer,
  createElementWithClassId,
} from '../../../utils/helpers';
import { RaceButtonsFactory } from '../buttons/Race-manage-buttons';
import { RouteButtonsFactory } from '../buttons/Route-buttons-factory';
import './start-screen-components.css';

export class StartScreenComponents {
  public section: HTMLElement;

  constructor() {
    this.section = createElementWithClassId('section', [
      'start-window-section',
      'flex',
    ]);
    const container = createContainer('start-window');
    container.append(
      RouteButtonsFactory.getButtons(),
      carTransform.block,
      RaceButtonsFactory.getButtons(),
    );

    this.section.append(container);
  }
}
