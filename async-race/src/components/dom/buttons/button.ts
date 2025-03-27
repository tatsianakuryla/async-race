import { createElementWithClassId, textToUpperCase } from '../../../utils/helpers';

export class ButtonFactory {
  // private static readonly BUTTONS_TITLES = new Set(['visit garage', 'visit winners', 'add', 'update', 'race all', 'reset race', 'generate cars', 'select', 'delete', 'start', 'stop', 'next', 'prev']);

  public static create(buttonTitle: string): HTMLButtonElement {
    const buttonClass = buttonTitle.split(' ').join('-').toLowerCase();
    const button = createElementWithClassId('button', ['app__button', `app__button_${buttonClass}`]);
    button.textContent = textToUpperCase(buttonTitle);
    return button;
  }
}
