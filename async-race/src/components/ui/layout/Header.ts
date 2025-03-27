import { createContainer, createElementWithClassId } from '../../../utils/helpers';

export class HeaderFactory {
  private static _APP_HEADING = 'START YOUR RACE';
  private static _APP_TITLE = 'Create a car, race it and win!';

  public static get(): HTMLHeadElement {
    const header = createElementWithClassId('header', ['header']);
    const container = createContainer('header');

    const heading = createElementWithClassId('h1', ['app__heading']);
    heading.textContent = this._APP_HEADING;

    const title = createElementWithClassId('h2', ['app__title']);
    title.textContent = this._APP_TITLE;

    container.append(heading, title);
    header.append(container);
    return header;
  }
}
