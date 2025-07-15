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
  return createElementWithClassId('div', [
    'app__buttons-container',
    `app__buttons-container_${containerClass}`,
    'flex',
  ]);
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
