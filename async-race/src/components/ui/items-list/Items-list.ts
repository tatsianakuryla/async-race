import { createElementWithClassId } from '../../../utils/helpers';

export class ItemsListFactory {
  public static getUl(): HTMLUListElement {
    return createElementWithClassId('ul', ['app__items-list', 'flex']);
  }

  public static getOl(): HTMLOListElement {
    return createElementWithClassId('ol', ['app__items-list', 'flex']);
  }
}
