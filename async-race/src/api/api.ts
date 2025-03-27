import type { CarOrWinner, GetResponse, Views } from './api-types';
import { BASE_URL } from './api-types';

export class Api<T extends CarOrWinner> {
  private _view: Views;
  constructor(view: Views) {
    this._view = view;
  }

  public async getAll(page = 1, limit = 7): Promise<GetResponse<T>> {
    const response = await fetch(`${BASE_URL}/${this._view}?_page=${page}&_limit=${limit}`, {
      method: 'GET',
    });

    if (!response.ok) {
      //TODO open Error Modal
      throw new Error(`Failed to fetch`);
    }

    const results = await response.json();
    const totalCount: number = Number(response.headers.get('X-Total-Count')) || 0;

    return { results, totalCount };
  }

  public async getOne(id: number): Promise<T> {
    const response = await fetch(`${BASE_URL}/${this._view}/${id}`, {
      method: 'GET',
    });
    if (!response.ok) {
      //TODO
    }

    return await response.json();
  }

  public async createItem(item: T): Promise<T> {
    const response = await fetch(`${BASE_URL}/${this._view}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      //TODO
    }

    return await response.json();
  }

  public async deleteItem(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${this._view}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      //TODO open Error Modal
    }
  }

  public async updateItem(item: T): Promise<T> {
    const response = await fetch(`${BASE_URL}/${this._view}/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      //TODO open Error Modal
    }

    return await response.json();
  }
}
