import { createElementWithClassId } from '../../../utils/helpers';
import { ButtonFactory } from '../buttons/Button';
import { InputFactory } from '../inputs/Input';

export class CarForm {
  private static _DEFAULT_CAR_COLOR = '#ffcc00';
  private _component: HTMLElement;

  constructor() {
    this._component = createElementWithClassId('div', ['app__transform-block', 'flex']);
    this._component.append(CarForm._getTransformOption('update'), CarForm._getTransformOption('create'));
  }

  public get block(): HTMLElement {
    return this._component;
  }

  private static _getTransformOption(transformTask: string): HTMLElement {
    const option = createElementWithClassId('div', ['app__transform-option', 'flex']);
    option.append(CarForm._getTitleInput(), CarForm._getColorInput(), CarForm._getConfirmButton(transformTask));
    return option;
  }

  private static _getTitleInput(): HTMLInputElement {
    const titleInput = InputFactory.create('text', 'car-title');
    titleInput.placeholder = 'Enter car title...';
    return titleInput;
  }

  private static _getColorInput(): HTMLInputElement {
    const colorInput = InputFactory.create('color', 'color');
    colorInput.value = this._DEFAULT_CAR_COLOR;
    return colorInput;
  }

  private static _getConfirmButton(transformTask: string): HTMLButtonElement {
    const confirmButton = ButtonFactory.create(transformTask);
    return confirmButton;
  }
}
