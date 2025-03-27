import { main } from '../..';
import { createContainer, createElementWithClassId, textToUpperCase } from '../../utils/helpers';

export abstract class View {
  protected _section: HTMLElement;

  constructor(viewModificator: string) {
    this._section = createElementWithClassId('section', ['app__view', `app__view_${viewModificator}`]);
    const container = createContainer();
    container.append(View._getViewTitle(viewModificator));
    this._section.append(container);
  }

  public get section(): HTMLElement {
    return this._section;
  }

  private static _getViewTitle(viewModificator: string): HTMLParagraphElement {
    const title = createElementWithClassId('p', ['app__view-title']);
    title.textContent = textToUpperCase(viewModificator);
    return title;
  }

  public open(sectionToClose: HTMLElement): void {
    if (main.contains(sectionToClose)) {
      sectionToClose.remove();
    }
    main.append(this._section);
  }
}
