import { pagination } from '..';
import type { Garage } from '../components/garage-and-winners/Garage';
import type { Winners } from '../components/garage-and-winners/Winners';
import {
  Order,
  CarOrWinner,
  Sort,
  EngineDataResponse,
  EngineToDriveModeResponse,
  EngineStatus,
} from '../types';
import type { GetResponse, Views } from '../types';
import { BASE_URL } from '../types';

export class Api<T extends CarOrWinner> {
  private _view: Views;

  constructor(view: Views) {
    this._view = view;
  }

  public static async manageCarEngine(
    id: number,
    status: EngineStatus,
  ): Promise<EngineDataResponse> {
    const parameters = new URLSearchParams({ id: String(id), status });
    const response = await fetch(
      `${BASE_URL}/engine?${parameters.toString()}`,
      {
        method: 'PATCH',
      },
    );
    return response.json();
  }

  public static async switchEngineToDriveMode(
    id: number,
  ): Promise<EngineToDriveModeResponse> {
    const parameters = new URLSearchParams({ id: String(id), status: 'drive' });
    const response = await fetch(
      `${BASE_URL}/engine?${parameters.toString()}`,
      {
        method: 'PATCH',
      },
    );
    return await response.json();
  }

  public async getAll(
    limit = 7,
    sort: Sort = Sort.Id,
    order: Order = Order.ASC,
    viewHolder: Winners | Garage,
  ): Promise<GetResponse<T>> {
    const page = viewHolder.currentPage;
    const response = await fetch(
      `${BASE_URL}/${this._view}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
      {
        method: 'GET',
      },
    );

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

    return await response.json();
  }

  public async createItem(item: T): Promise<T> {
    const response = await fetch(`${BASE_URL}/${this._view}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    return await response.json();
  }

  public async deleteItem(id: number): Promise<void> {
    await fetch(`${BASE_URL}/${this._view}/${id}`, {
      method: 'DELETE',
    });
  }

  public async updateItem(item: T): Promise<T> {
    const response = await fetch(`${BASE_URL}/${this._view}/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  }
}
