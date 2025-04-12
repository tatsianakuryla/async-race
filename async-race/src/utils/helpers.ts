export function createElementWithClassId<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  classes?: string[],
  id?: string,
): HTMLElementTagNameMap[T] {
  const element = document.createElement(tag);
  if (classes) {
    element.classList.add(...classes);
  }
  if (id) {
    element.id = id;
  }

  return element;
}

export function textToUpperCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function createContainer(containerClass: string): HTMLElement {
  return createElementWithClassId('div', [
    'container',
    'flex',
    `${containerClass}-container`,
  ]);
}

export function createButtonsContainer(containerClass: string): HTMLElement {
  const buttonsContainer = createElementWithClassId('div', [
    'app__buttons-contaiter',
    `app__buttons-contaiter_${containerClass}`,
    'flex',
  ]);
  return buttonsContainer;
}

export function getRandomIndex(): number {
  return Math.floor(Math.random() * 100);
}

export function enableButton(button: HTMLButtonElement): void {
  button.disabled = false;
}

export function disableButton(button: HTMLButtonElement): void {
  button.disabled = true;
}

export function getTrimmedInputValue(input: HTMLInputElement): string {
  return input.value.trim();
}
