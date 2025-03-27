import { createElementWithClassId } from '../../../utils/helpers';

export class ContainerFactory {
  public static getContainer() {
    return createElementWithClassId('div', ['app', 'flex'], 'app');
  }
}
