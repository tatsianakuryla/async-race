import {
  createContainer,
  createElementWithClassId,
} from '../../../utils/helpers';
import { RouteButtonsFactory } from '../buttons/Route-buttons-factory';

export class StartScreenComponentsFactory {
  public static get(): HTMLElement {
    const section = createElementWithClassId('section', [
      'start-window-section',
      'flex',
    ]);
    const container = createContainer('start-window');
    container.append(RouteButtonsFactory.getButtons());

    section.append(container);
    return section;
  }
}
