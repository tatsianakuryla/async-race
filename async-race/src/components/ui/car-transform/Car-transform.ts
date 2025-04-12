import { garage } from '../../..';
import { StorageKey, TransformTask } from '../../../types';
import {
  createElementWithClassId,
  disableButton,
  enableButton,
} from '../../../utils/helpers';
import { LocalStorage } from '../../local-storage/Local-storage';
import { ButtonFactory } from '../buttons/Button';
import { InputFactory } from '../inputs/Input';

const INPUT_PLACEHOLDER = 'Enter car title...';

export class CarTransform {
  public static readonly DEFAULT_COLOR_INPUT_VALUE = '#ffcc00';
  private static readonly _DEFAULT_TITLE_INPUT_VALUE = '';

  public updateTitleInput = CarTransform._createTitleInput(
    TransformTask.Update,
  );

  public updateColorInput = CarTransform._createColorInput(
    TransformTask.Update,
  );

  public createTitleInput = CarTransform._createTitleInput(
    TransformTask.Create,
  );

  public createColorInput = CarTransform._createColorInput(
    TransformTask.Create,
  );

  public updateButton = CarTransform._createTransformButton(
    TransformTask.Update,
  );

  public createButton = CarTransform._createTransformButton(
    TransformTask.Create,
  );

  private _component: HTMLElement;

  constructor() {
    this._component = createElementWithClassId('div', [
      'app__transform-block',
      'flex',
    ]);

    this._attachUpdateInputListeners();
    this._attachCreateInputListeners();

    this._component.append(
      CarTransform._createFormSection(
        TransformTask.Update,
        this.updateTitleInput,
        this.updateColorInput,
        this.updateButton,
        () => garage.updateCar(),
      ),
      CarTransform._createFormSection(
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

  private static _createTitleInput(task: TransformTask): HTMLInputElement {
    const input = InputFactory.create('text', 'car-title');
    input.placeholder = INPUT_PLACEHOLDER;
    input.value =
      task === TransformTask.Update
        ? garage.chosenCar.name
        : (LocalStorage.getItemsFromLocalStorage(StorageKey.CreateTitle) ?? '');
    input.dataset.id = task;
    return input;
  }

  private static _createColorInput(task: TransformTask): HTMLInputElement {
    const input = InputFactory.create('color', 'color');
    const color =
      task === TransformTask.Update
        ? garage.chosenCar.color
        : LocalStorage.getItemsFromLocalStorage(StorageKey.CreateColor);
    input.value = color ?? CarTransform.DEFAULT_COLOR_INPUT_VALUE;
    input.dataset.id = task;
    return input;
  }

  private static _createTransformButton(
    task: TransformTask,
  ): HTMLButtonElement {
    return ButtonFactory.create(task);
  }

  private static _createFormSection(
    task: TransformTask,
    titleInput: HTMLInputElement,
    colorInput: HTMLInputElement,
    button: HTMLButtonElement,
    onClick: () => void,
  ): HTMLElement {
    const section = createElementWithClassId('div', [
      'app__transform-option',
      'flex',
    ]);
    button.dataset.id = task;
    button.addEventListener('click', onClick);
    section.append(titleInput, colorInput, button);
    return section;
  }

  public cleanInputs(task: TransformTask): void {
    const isCreate = task === TransformTask.Create;
    const titleInput = isCreate ? this.createTitleInput : this.updateTitleInput;
    const colorInput = isCreate ? this.createColorInput : this.updateColorInput;

    titleInput.value = CarTransform._DEFAULT_TITLE_INPUT_VALUE;
    colorInput.value = CarTransform.DEFAULT_COLOR_INPUT_VALUE;

    if (!isCreate) {
      garage.chosenCar = {
        id: 0,
        name: '',
        color: CarTransform.DEFAULT_COLOR_INPUT_VALUE,
      };
      LocalStorage.saveChosenCarToLocalStorage(
        StorageKey.ChosenCar,
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

  private _attachUpdateInputListeners(): void {
    this.updateTitleInput.addEventListener('input', () => {
      garage.chosenCar.name = this.updateTitleInput.value;
      LocalStorage.saveChosenCarToLocalStorage(
        StorageKey.ChosenCar,
        garage.chosenCar,
      );
    });

    this.updateColorInput.addEventListener('change', () => {
      garage.chosenCar.color = this.updateColorInput.value;
      LocalStorage.saveChosenCarToLocalStorage(
        StorageKey.ChosenCar,
        garage.chosenCar,
      );
    });
  }

  private _attachCreateInputListeners(): void {
    this.createTitleInput.addEventListener('input', () =>
      LocalStorage.setItemsToLocalStorage(
        StorageKey.CreateTitle,
        this.createTitleInput.value,
      ),
    );

    this.createColorInput.addEventListener('change', () =>
      LocalStorage.setItemsToLocalStorage(
        StorageKey.CreateColor,
        this.createColorInput.value,
      ),
    );
  }
}
