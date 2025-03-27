import { main } from '../..';
import { type Views } from '../../types';
import { createContainer, createElementWithClassId, textToUpperCase } from '../../utils/helpers';
import { ItemsListFactory } from '../ui/items-list/Items-list';
import './views.css';

export abstract class View {
  public totalItemsQuantityInfo: HTMLSpanElement;
  public itemsList: HTMLUListElement;
  protected _section: HTMLElement;
  protected _TOTAL_INFO_TEXT = 'Total quantity: ';

  constructor(viewModificator: Views) {
    this._section = createElementWithClassId('section', ['app__view', `app__view_${viewModificator}`]);
    const container = createContainer('view');
    this.totalItemsQuantityInfo = createElementWithClassId('span', ['app__items-quantity-info']);
    this.itemsList = ItemsListFactory.get();
    container.append(View._getViewTitle(viewModificator), this._createTotalItemsInfoBlock(), this.itemsList);
    this._section.append(container);
  }

  public get section(): HTMLElement {
    return this._section;
  }

  private static _getViewTitle(viewModificator: Views): HTMLElement {
    const title = createElementWithClassId('h3', ['app__view-title']);
    title.textContent = textToUpperCase(viewModificator);
    return title;
  }

  public open(sectionToClose: HTMLElement): void {
    if (main.contains(sectionToClose)) {
      sectionToClose.remove();
    }
    main.append(this._section);
  }

  protected _createTotalItemsInfoBlock(): HTMLElement {
    const title = createElementWithClassId('h4', ['app__view-total-info']);
    title.textContent = textToUpperCase(this._TOTAL_INFO_TEXT);
    title.append(this.totalItemsQuantityInfo);
    return title;
  }
}
