import { garage } from '../../..';
import { TransformTask } from '../../../types';
import {
  createElementWithClassId,
  disableButton,
  enableButton,
} from '../../../utils/helpers';
import { LocalStorage } from '../../local-storage/Local-storage';
import { ButtonFactory } from '../buttons/Button';
import { InputFactory } from '../inputs/Input';

export class CarTransform {
  public static DEFAULT_COLOR_INPUT_VALUE = '#ffcc00';

  private static _DEFAULT_TITLE_INPUT_VALUE = '';
  private static _CREATE_TITLE_KEY = 'create-title';
  private static _CREATE_COLOR_KEY = 'create-color';
  private static _CHOSEN_CAR_KEY = 'chosenCar';

  public updateTitleInput = CarTransform._getTitleInput(TransformTask.Update);
  public updateColorInput = CarTransform._getColorInput(TransformTask.Update);
  public createTitleInput = CarTransform._getTitleInput(TransformTask.Create);
  public createColorInput = CarTransform._getColorInput(TransformTask.Create);
  public updateButton = CarTransform._getTransformButton(TransformTask.Update);
  public createButton = CarTransform._getTransformButton(TransformTask.Create);

  private _component: HTMLElement;

  constructor() {
    this._component = createElementWithClassId('div', [
      'app__transform-block',
      'flex',
    ]);

    this._addUpdateInputListeners();
    this._addCreateInputListeners();

    this._component.append(
      CarTransform._getTransformOption(
        TransformTask.Update,
        this.updateTitleInput,
        this.updateColorInput,
        this.updateButton,
        () => garage.updateCar(),
      ),
      CarTransform._getTransformOption(
        TransformTask.Create,
        this.createTitleInput,
        this.createColorInput,
        this.createButton,
        () => garage.createCar(),
      ),
    );
  }

  public get block(): HTMLElement {
    return this._component;
  }

  private static _getTitleInput(task: TransformTask): HTMLInputElement {
    const titleInput = InputFactory.create('text', 'car-title');
    titleInput.placeholder = 'Enter car title...';
    const value =
      task === TransformTask.Update
        ? garage.chosenCar.name
        : LocalStorage.getItemsFromLocalStorage(CarTransform._CREATE_TITLE_KEY);

    if (value !== null) {
      titleInput.value = value;
    }

    titleInput.dataset.id = task;
    return titleInput;
  }

  private static _getColorInput(task: TransformTask): HTMLInputElement {
    const colorInput = InputFactory.create('color', 'color');
    const value =
      task === TransformTask.Update
        ? garage.chosenCar.color
        : LocalStorage.getItemsFromLocalStorage(CarTransform._CREATE_COLOR_KEY);

    colorInput.value =
      value !== null ? value : CarTransform.DEFAULT_COLOR_INPUT_VALUE;

    colorInput.dataset.id = task;
    return colorInput;
  }

  private static _getTransformButton(task: TransformTask): HTMLButtonElement {
    return ButtonFactory.create(task);
  }

  private static _getTransformOption(
    task: TransformTask,
    titleInput: HTMLInputElement,
    colorInput: HTMLInputElement,
    button: HTMLButtonElement,
    action: () => void,
  ): HTMLElement {
    const option = createElementWithClassId('div', [
      'app__transform-option',
      'flex',
    ]);
    button.dataset.id = task;
    button.addEventListener('click', action);
    option.append(titleInput, colorInput, button);
    return option;
  }

  public cleanInputs(transformTask: TransformTask): void {
    if (transformTask === 'create') {
      this.createTitleInput.value = CarTransform._DEFAULT_TITLE_INPUT_VALUE;
      this.createColorInput.value = CarTransform.DEFAULT_COLOR_INPUT_VALUE;
    } else if (transformTask === TransformTask.Update) {
      this.updateTitleInput.value = CarTransform._DEFAULT_TITLE_INPUT_VALUE;
      this.updateColorInput.value = CarTransform.DEFAULT_COLOR_INPUT_VALUE;

      garage.chosenCar = {
        name: '',
        color: CarTransform.DEFAULT_COLOR_INPUT_VALUE,
        id: 0,
      };

      LocalStorage.saveChosenCarToLocalStorage(
        CarTransform._CHOSEN_CAR_KEY,
        garage.chosenCar,
      );
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

  private _addUpdateInputListeners(): void {
    this.updateTitleInput.addEventListener('input', () => {
      garage.chosenCar.name = this.updateTitleInput.value;
      LocalStorage.saveChosenCarToLocalStorage(
        CarTransform._CHOSEN_CAR_KEY,
        garage.chosenCar,
      );
    });

    this.updateColorInput.addEventListener('change', () => {
      garage.chosenCar.color = this.updateColorInput.value;
      LocalStorage.saveChosenCarToLocalStorage(
        CarTransform._CHOSEN_CAR_KEY,
        garage.chosenCar,
      );
    });
  }

  private _addCreateInputListeners(): void {
    this.createTitleInput.addEventListener('input', () =>
      LocalStorage.setItemsToLocalStorage(
        CarTransform._CREATE_TITLE_KEY,
        this.createTitleInput.value,
      ),
    );

    this.createColorInput.addEventListener('change', () =>
      LocalStorage.setItemsToLocalStorage(
        CarTransform._CREATE_COLOR_KEY,
        this.createColorInput.value,
      ),
    );
  }
}
