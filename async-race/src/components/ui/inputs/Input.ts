import { createElementWithClassId } from '../../../utils/helpers';

export class InputFactory {
  public static create(inputType: string, inputTitle: string): HTMLInputElement {
    const inputClass = inputTitle.split(' ').join('-').toLowerCase();
    const input = createElementWithClassId('input', ['app__input', `app__input_${inputClass}`]);
    input.type = inputType;
    return input;
  }
}
