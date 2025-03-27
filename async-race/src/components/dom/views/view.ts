import { main } from '../../..';
import { createContainer, createElementWithClassId, textToUpperCase } from '../../../utils/helpers';

export abstract class View {
  protected _section: HTMLElement;

  constructor(viewModificator: string) {
    this._section = createElementWithClassId('section', ['app__view', `app__view_${viewModificator}`]);
    const container = createContainer();
    container.append(View._getViewTitle(viewModificator));
    this._section.append(container);
  }

  private static _getViewTitle(viewModificator: string): HTMLParagraphElement {
    const title = createElementWithClassId('p', ['app__view-title']);
    title.textContent = textToUpperCase(viewModificator);
    return title;
  }

  public open(): void {
    if (!main.contains(this._section)) {
      main.append(this._section);
    }
  }

  public close(): void {
    if (main.contains(this._section)) {
      this._section.remove();
    }
  }
}
