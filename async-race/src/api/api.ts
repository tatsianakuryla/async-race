import { pagination } from '..';
import type { Garage } from '../components/cars/Garage';
import type { Winners } from '../components/cars/Winners';
import type { Order, CarOrWinner, Sort } from '../types';
import type { GetResponse, Views } from '../types';
import { BASE_URL } from '../types';

export class Api<T extends CarOrWinner> {
  private _view: Views;
  constructor(view: Views) {
    this._view = view;
  }

  public async getAll(
    limit = 7,
    sort: Sort = 'id',
    order: Order = 'ASC',
    viewHolder: Winners | Garage,
  ): Promise<GetResponse<T>> {
    const page = viewHolder.currentPage;
    const response = await fetch(
      `${BASE_URL}/${this._view}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch`);
    }

    const results = await response.json();
    const totalCount: number =
      Number(response.headers.get('X-Total-Count')) || 0;

    pagination.totalItems = totalCount;
    return { results, totalCount };
  }

  public async getOne(id: number): Promise<T> {
    const response = await fetch(`${BASE_URL}/${this._view}/${id}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch the Item`);
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
      throw new Error(`Failed to create the Item`);
    }

    return await response.json();
  }

  public async deleteItem(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${this._view}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete the Item`);
    }
  }

  public async updateItem(item: T): Promise<T> {
    const response = await fetch(`${BASE_URL}/${this._view}/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to update the Item`);
    }

    return await response.json();
  }
}
