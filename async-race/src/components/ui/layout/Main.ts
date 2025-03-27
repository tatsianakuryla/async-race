import { createElementWithClassId } from '../../../utils/helpers';
import { StartScreenComponentsFactory } from './Start-screen-components';

export class MainFactory {
  public static get(): HTMLElement {
    const main = createElementWithClassId('main', ['app']);
    main.append(StartScreenComponentsFactory.get());
    return main;
  }
}
