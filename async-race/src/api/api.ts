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
  private static readonly DEFAULT_LIMIT = 7;
  private static readonly TOTAL_COUNT_HEADER = 'X-Total-Count';

  constructor(private readonly view: Views) {}

  private get baseViewUrl(): string {
    return `${BASE_URL}/${this.view}`;
  }

  public static async manageCarEngine(
    id: number,
    status: EngineStatus,
  ): Promise<EngineDataResponse> {
    const params = new URLSearchParams({ id: String(id), status });
    const response = await fetch(`${BASE_URL}/engine?${params}`, {
      method: 'PATCH',
    });
    return response.json();
  }

  public static async switchEngineToDriveMode(
    id: number,
  ): Promise<EngineToDriveModeResponse> {
    const params = new URLSearchParams({ id: String(id), status: 'drive' });
    const response = await fetch(`${BASE_URL}/engine?${params}`, {
      method: 'PATCH',
    });
    return response.json();
  }

  public async getAll(
    limit = Api.DEFAULT_LIMIT,
    sort: Sort = Sort.Id,
    order: Order = Order.ASC,
    viewHolder: Winners | Garage,
  ): Promise<GetResponse<T>> {
    const page = viewHolder.currentPage;
    const url = `${this.baseViewUrl}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;

    const response = await fetch(url);
    const results = await response.json();
    const totalCount =
      Number(response.headers.get(Api.TOTAL_COUNT_HEADER)) || 0;

    pagination.totalItems = totalCount;

    return { results, totalCount };
  }

  public async getOne(id: number): Promise<T> {
    const response = await fetch(`${this.baseViewUrl}/${id}`);
    return response.json();
  }

  public async createItem(item: T): Promise<T> {
    const response = await fetch(this.baseViewUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    return response.json();
  }

  public async deleteItem(id: number): Promise<void> {
    await fetch(`${this.baseViewUrl}/${id}`, {
      method: 'DELETE',
    });
  }

  public async updateItem(item: T): Promise<T> {
    const response = await fetch(`${this.baseViewUrl}/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    return response.json();
  }
}
