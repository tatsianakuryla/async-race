import { startScreenComponents } from '../../..';
import { createElementWithClassId } from '../../../utils/helpers';

export class MainFactory {
  public static get(): HTMLElement {
    const main = createElementWithClassId('main', ['app']);
    main.append(startScreenComponents.section);
    return main;
  }
}
