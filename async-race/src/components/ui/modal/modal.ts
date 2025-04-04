import {
  createButtonsContainer,
  createElementWithClassId,
} from '../../../utils/helpers';
import { ButtonFactory } from '../buttons/Button';
import './modals.css';

export class Modal {
  private _modal: HTMLElement;
  private _infoText: HTMLElement;

  constructor(textContent: string) {
    this._modal = createElementWithClassId('dialog', ['app__modal-winner']);
    this._infoText = createElementWithClassId('p', ['app__modal-text']);
    this._infoText.textContent = textContent;
    this._modal.append(this._infoText, this._createCancelButton());
    this._addModalEventListeners();
  }

  public get modal(): HTMLElement {
    return this._modal;
  }

  public open(): void {
    if (this._modal instanceof HTMLDialogElement) {
      if (this._modal.open) return;
      document.body.prepend(this._modal);
      this._modal.showModal();
      document.body.style.overflow = 'hidden';
    }
  }

  public close(): void {
    if (this._modal instanceof HTMLDialogElement) {
      if (!this._modal.open) return;
      this._modal.close();
      this._modal.remove();
      document.body.style.overflow = '';
    }
  }

  protected _createCancelButton(): HTMLButtonElement {
    const closeModalButton = ButtonFactory.create('Close');
    closeModalButton.addEventListener('click', () => {
      this.close();
    });
    return closeModalButton;
  }

  protected _addModalEventListeners(): void {
    this._modal.addEventListener('cancel', () => {
      this.close();
    });

    this._modal.addEventListener('click', (event) => {
      if (event.target === this._modal) {
        this.close();
      }
    });
  }
}
