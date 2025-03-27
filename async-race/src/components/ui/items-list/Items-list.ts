import { createElementWithClassId } from '../../../utils/helpers';

export class ItemsListFactory {
  public static get(): HTMLUListElement {
    return createElementWithClassId('ul', ['app__items-list', 'flex']);
  }
}
