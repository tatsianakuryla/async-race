import { garage } from '../../..';
import type { TransformCarTasks } from '../../../types';
import { createElementWithClassId } from '../../../utils/helpers';
import { ButtonFactory } from '../buttons/Button';
import { InputFactory } from '../inputs/Input';

export class CarTransform {
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
    this.updateTitleInput = CarTransform._getTitleInput('update');
    this.updateColorInput = CarTransform._getColorInput('update');
    this.createTitleInput = CarTransform._getTitleInput('create');
    this.createColorInput = CarTransform._getColorInput('create');
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
      this.createTitleInput.value = CarTransform._DEFAULT_TITLE_INPUT_VALUE;
      this.createColorInput.value = CarTransform._DEFAULT_COLOR_INPUT_VALUE;
    } else if (transformTask === 'update') {
      this.updateTitleInput.value = CarTransform._DEFAULT_TITLE_INPUT_VALUE;
      this.updateColorInput.value = CarTransform._DEFAULT_COLOR_INPUT_VALUE;
    }
  }

  private _getUpdateOption(): HTMLElement {
    const option = createElementWithClassId('div', [
      'app__transform-option',
      'flex',
    ]);
    const updateButton = CarTransform._getTransformButton('update');
    updateButton.dataset.id = 'update';
    updateButton.addEventListener('click', () => {
      garage.updateCar();
    });
    option.append(this.updateTitleInput, this.updateColorInput, updateButton);
    return option;
  }

  private _getCreateOption(): HTMLElement {
    const option = createElementWithClassId('div', [
      'app__transform-option',
      'flex',
    ]);
    const createButton = CarTransform._getTransformButton('create');
    createButton.dataset.id = 'create';
    createButton.addEventListener('click', () => {
      garage.createCar();
    });
    option.append(this.createTitleInput, this.createColorInput, createButton);
    return option;
  }
}
