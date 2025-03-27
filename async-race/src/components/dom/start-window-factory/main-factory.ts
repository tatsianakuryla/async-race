import { createElementWithClassId } from '../../../utils/helpers';
import { StartSectionFactory } from './start-section-factory';

export class MainFactory {
  public static get(): HTMLElement {
    const main = createElementWithClassId('main', ['app']);
    main.append(StartSectionFactory.get());
    return main;
  }
}
