import { createContainer, createElementWithClassId } from '../../../utils/helpers';
import { RouteButtonsFactory } from '../buttons/Route-buttons-factory';
import { CarForm } from '../car-form/Car-form';

export class StartScreenComponentsFactory {
  public static get(): HTMLElement {
    const section = createElementWithClassId('section', ['start-window-section', 'flex']);
    const container = createContainer();
    const carTransformSection = new CarForm();
    container.append(RouteButtonsFactory.getButtons(), carTransformSection.block);

    section.append(container);
    return section;
  }
}
