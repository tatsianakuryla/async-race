import { Api } from './api';
import type { CarWithId, GetResponse } from './api-types';

export class GarageApi extends Api<CarWithId> {
  constructor() {
    super('garage');
  }
  public override async getAll(page = 1, limit = 7): Promise<GetResponse<CarWithId>> {
    return await super.getAll(page, limit);
  }
}
