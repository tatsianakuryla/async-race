import { garage } from '../../..';
import type { TransformCarTasks } from '../../../types';
import {
  createElementWithClassId,
  disableButton,
  enableButton,
} from '../../../utils/helpers';
import { LocalStorage } from '../../local-storage/Local-storage';
import { ButtonFactory } from '../buttons/Button';
import { InputFactory } from '../inputs/Input';

export class CarTransform {
  private static _DEFAULT_COLOR_INPUT_VALUE = '#ffcc00';
  private static _DEFAULT_TITLE_INPUT_VALUE = '';

  public updateTitleInput = CarTransform._getTitleInput('update');
  public updateColorInput = CarTransform._getColorInput('update');
  public createTitleInput = CarTransform._getTitleInput('create');
  public createColorInput = CarTransform._getColorInput('create');
  public updateButton = CarTransform._getTransformButton('update');
  public createButton = CarTransform._getTransformButton('create');
  private _component: HTMLElement;

  constructor() {
    this._component = createElementWithClassId('div', [
      'app__transform-block',
      'flex',
    ]);
    this.updateTitleInput.addEventListener('input', () => {
      garage.chosenCar.name = this.updateTitleInput.value;
      LocalStorage.saveChosenCarToLocalStorage('chosenCar', garage.chosenCar);
    });
    this.updateColorInput.addEventListener('change', () => {
      garage.chosenCar.color = this.updateColorInput.value;
      LocalStorage.saveChosenCarToLocalStorage('chosenCar', garage.chosenCar);
    });
    this.createTitleInput.addEventListener('input', () =>
      LocalStorage.setItemsToLocalStorage(
        'create-title',
        this.createTitleInput.value,
      ),
    );
    this.createColorInput.addEventListener('change', () =>
      LocalStorage.setItemsToLocalStorage(
        'create-color',
        this.createColorInput.value,
      ),
    );
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
    const value = garage.chosenCar.name;
    if (value !== null) {
      titleInput.value = value;
    }
    titleInput.dataset.id = transformTask;
    return titleInput;
  }

  private static _getColorInput(
    transformTask: TransformCarTasks,
  ): HTMLInputElement {
    const colorInput = InputFactory.create('color', 'color');
    const value = garage.chosenCar.color;
    if (value !== null) {
      colorInput.value = value;
    } else {
      colorInput.value = this._DEFAULT_COLOR_INPUT_VALUE;
    }
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
      garage.chosenCar.name = this.updateTitleInput.value;
      garage.chosenCar.color = this.updateColorInput.value;
      garage.chosenCar.id = 0;
      LocalStorage.saveChosenCarToLocalStorage('chosenCar', garage.chosenCar);
    }
  }

  public disableButtonsForStartRace(): void {
    disableButton(this.updateButton);
    disableButton(this.createButton);
  }

  public enableButtonsForEndRace(): void {
    enableButton(this.updateButton);
    enableButton(this.createButton);
  }

  private _getUpdateOption(): HTMLElement {
    const option = createElementWithClassId('div', [
      'app__transform-option',
      'flex',
    ]);
    this.updateButton.dataset.id = 'update';
    this.updateButton.addEventListener('click', () => {
      garage.updateCar();
    });
    option.append(
      this.updateTitleInput,
      this.updateColorInput,
      this.updateButton,
    );
    return option;
  }

  private _getCreateOption(): HTMLElement {
    const option = createElementWithClassId('div', [
      'app__transform-option',
      'flex',
    ]);
    this.createButton.dataset.id = 'create';
    this.createButton.addEventListener('click', () => {
      garage.createCar();
    });
    option.append(
      this.createTitleInput,
      this.createColorInput,
      this.createButton,
    );
    return option;
  }
}
