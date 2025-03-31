import {
  createElementWithClassId,
  textToUpperCase,
} from '../../../utils/helpers';

export class ButtonFactory {
  public static create(buttonTitle: string): HTMLButtonElement {
    const buttonClass = buttonTitle.split(' ').join('-').toLowerCase();
    const button = createElementWithClassId('button', [
      'app__button',
      `app__button_${buttonClass}`,
    ]);
    button.textContent = textToUpperCase(buttonTitle);
    return button;
  }
}
