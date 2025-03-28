import { garageItems } from '../../..';
import type { TransformCarTasks } from '../../../types';
import { createElementWithClassId } from '../../../utils/helpers';
import { ButtonFactory } from '../buttons/Button';
import { InputFactory } from '../inputs/Input';

export class CarForm {
  private static _DEFAULT_COLOR_INPUT_VALUE = '#ffcc00';
  private static _DEFAULT_TITLE_INPUT_VALUE = '';

  public updateTitleInput: HTMLInputElement;
  public updateColorInput: HTMLInputElement;
  public createTitleInput: HTMLInputElement;
  public createColorInput: HTMLInputElement;

  private _component: HTMLElement;

  constructor() {
    this._component = createElementWithClassId('div', [
      'app__transform-block',
      'flex',
    ]);
    this.updateTitleInput = CarForm._getTitleInput('update');
    this.updateColorInput = CarForm._getColorInput('update');
    this.createTitleInput = CarForm._getTitleInput('create');
    this.createColorInput = CarForm._getColorInput('create');
    this._component.append(this._getUpdateOption(), this._getCreateOption());
  }

  public get block(): HTMLElement {
    return this._component;
  }

  private static _getTitleInput(
    transformTask: TransformCarTasks,
  ): HTMLInputElement {
    const titleInput = InputFactory.create('text', 'car-title');
    titleInput.placeholder = 'Enter car title...';
    titleInput.dataset.id = transformTask;
    return titleInput;
  }

  private static _getColorInput(
    transformTask: TransformCarTasks,
  ): HTMLInputElement {
    const colorInput = InputFactory.create('color', 'color');
    colorInput.value = this._DEFAULT_COLOR_INPUT_VALUE;
    colorInput.dataset.id = transformTask;
    return colorInput;
  }

  private static _getTransformButton(
    transformTask: TransformCarTasks,
  ): HTMLButtonElement {
    const confirmButton = ButtonFactory.create(transformTask);
    return confirmButton;
  }

  public cleanInputs(transformTask: TransformCarTasks): void {
    if (transformTask === 'create') {
      this.createTitleInput.value = CarForm._DEFAULT_TITLE_INPUT_VALUE;
      this.createColorInput.value = CarForm._DEFAULT_COLOR_INPUT_VALUE;
    } else if (transformTask === 'update') {
      this.updateTitleInput.value = CarForm._DEFAULT_TITLE_INPUT_VALUE;
      this.updateColorInput.value = CarForm._DEFAULT_COLOR_INPUT_VALUE;
    }
  }

  private _getUpdateOption(): HTMLElement {
    const option = createElementWithClassId('div', [
      'app__transform-option',
      'flex',
    ]);
    const updateButton = CarForm._getTransformButton('update');
    updateButton.dataset.id = 'update';
    updateButton.addEventListener('click', () => {
      garageItems.updateCar();
    });
    option.append(this.updateTitleInput, this.updateColorInput, updateButton);
    return option;
  }

  private _getCreateOption(): HTMLElement {
    const option = createElementWithClassId('div', [
      'app__transform-option',
      'flex',
    ]);
    const createButton = CarForm._getTransformButton('create');
    createButton.dataset.id = 'create';
    createButton.addEventListener('click', () => {
      garageItems.createCar();
    });
    option.append(this.createTitleInput, this.createColorInput, createButton);
    return option;
  }
}
