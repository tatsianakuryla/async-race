import type { TransformCarTasks } from '../../../types';
import { createElementWithClassId } from '../../../utils/helpers';
import { ButtonFactory } from '../buttons/Button';
import { InputFactory } from '../inputs/Input';

export class CarForm {
  private static _DEFAULT_CAR_COLOR = '#ffcc00';

  public updateTitleInput: HTMLInputElement;
  public createTitleInput: HTMLInputElement;
  public updateColorInput: HTMLInputElement;
  public createColorInput: HTMLInputElement;

  private _component: HTMLElement;

  constructor() {
    this._component = createElementWithClassId('div', ['app__transform-block', 'flex']);
    this.updateTitleInput = CarForm._getTitleInput('update');
    this.updateColorInput = CarForm._getColorInput('update');
    this.createTitleInput = CarForm._getTitleInput('create');
    this.createColorInput = CarForm._getColorInput('create');
    this._component.append(this._getUpdateOption(), this._getCreateOption());
  }

  public get block(): HTMLElement {
    return this._component;
  }

  private static _getTitleInput(transformTask: TransformCarTasks): HTMLInputElement {
    const titleInput = InputFactory.create('text', 'car-title');
    titleInput.placeholder = 'Enter car title...';
    titleInput.dataset.id = transformTask;
    return titleInput;
  }

  private static _getColorInput(transformTask: TransformCarTasks): HTMLInputElement {
    const colorInput = InputFactory.create('color', 'color');
    colorInput.value = this._DEFAULT_CAR_COLOR;
    colorInput.dataset.id = transformTask;
    return colorInput;
  }

  private static _getTransformButton(transformTask: TransformCarTasks): HTMLButtonElement {
    const confirmButton = ButtonFactory.create(transformTask);
    return confirmButton;
  }

  private _getUpdateOption(): HTMLElement {
    const option = createElementWithClassId('div', ['app__transform-option', 'flex']);
    const updateButton = CarForm._getTransformButton('update');
    updateButton.dataset.id = 'update';
    option.append(this.updateTitleInput, this.updateColorInput, updateButton);
    return option;
  }

  private _getCreateOption(): HTMLElement {
    const option = createElementWithClassId('div', ['app__transform-option', 'flex']);
    const createButton = CarForm._getTransformButton('create');
    createButton.dataset.id = 'create';
    option.append(this.createTitleInput, this.createColorInput, createButton);
    return option;
  }
}
