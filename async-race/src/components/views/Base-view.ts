import { garage, main, pagination } from '../..';
import { type Views } from '../../types';
import {
  createContainer,
  createElementWithClassId,
  textToUpperCase,
} from '../../utils/helpers';
import { ItemsListFactory } from '../ui/items-list/Items-list';
import './views.css';

export abstract class View {
  public _itemsList: HTMLUListElement;
  protected _totalItemsQuantityInfo: HTMLSpanElement;
  protected _section: HTMLElement;
  protected _container: HTMLElement;
  protected _pageNumberInfo: HTMLElement;
  protected _TOTAL_INFO_TEXT = 'Total quantity: ';

  constructor(viewModificator: Views) {
    this._section = createElementWithClassId('section', [
      'app__view',
      `app__view_${viewModificator}`,
    ]);
    this._container = createContainer('view');
    this._totalItemsQuantityInfo = createElementWithClassId('span', [
      'app__items-quantity-info',
    ]);
    this._itemsList = ItemsListFactory.getUl();
    this._pageNumberInfo = createElementWithClassId('span', [
      'app__page-number',
    ]);
    this._container.append(
      View._getViewTitle(viewModificator),
      this._createTotalItemsInfoBlock(),
      this._itemsList,
    );
    this._section.append(this._container);
  }

  public get section(): HTMLElement {
    return this._section;
  }

  public get pageNumberInfo(): HTMLElement {
    this.updatePageNumberInfo();
    return this._pageNumberInfo;
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

  public updateTotalItemsQuantityInfo(): void {
    this._totalItemsQuantityInfo.textContent = String(garage.itemsQuantity);
  }

  public updatePageNumberInfo(): void {
    this._pageNumberInfo.textContent = String(pagination.currentPage);
  }

  protected _createTotalItemsInfoBlock(): HTMLElement {
    const title = createElementWithClassId('h4', ['app__view-total-info']);
    title.textContent = textToUpperCase(this._TOTAL_INFO_TEXT);
    title.append(this._totalItemsQuantityInfo);
    return title;
  }
}
