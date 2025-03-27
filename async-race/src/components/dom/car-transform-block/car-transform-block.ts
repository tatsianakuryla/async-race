import { createElementWithClassId } from '../../../utils/helpers';
import { ButtonFactory } from '../buttons/button';
import { InputFactory } from '../inputs/input';

export class CarTransformBlock {
  private static _DEFAULT_CAR_COLOR = '#ffcc00';
  private _block: HTMLElement;

  constructor() {
    this._block = createElementWithClassId('div', ['app__transform-block', 'flex']);
    this._block.append(CarTransformBlock._getTransformOption('update'), CarTransformBlock._getTransformOption('create'));
  }

  public get block(): HTMLElement {
    return this._block;
  }

  private static _getTransformOption(transformTask: string): HTMLElement {
    const option = createElementWithClassId('div', ['app__transform-option', 'flex']);
    option.append(CarTransformBlock._getTitleInput(), CarTransformBlock._getColorInput(), CarTransformBlock._getConfirmButton(transformTask));
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
