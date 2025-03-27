import { createContainer, createElementWithClassId } from '../../../utils/helpers';
import { RouteButtonsFactory } from '../buttons/route-buttons-factory';
import { CarTransformBlock } from '../car-transform-block/car-transform-block';

export class StartSectionFactory {
  public static get(): HTMLElement {
    const section = createElementWithClassId('section', ['start-window-section', 'flex']);
    const container = createContainer();
    const carTransformSection = new CarTransformBlock();
    container.append(RouteButtonsFactory.getButtons(), carTransformSection.block);

    section.append(container);
    return section;
  }
}
