import { Api } from './api';
import type { GetResponse, Winner } from './api-types';

export class WinnersApi extends Api<Winner> {
  constructor() {
    super('winners');
  }

  public override async getAll(page = 1, limit = 10): Promise<GetResponse<Winner>> {
    return await super.getAll(page, limit);
  }
}
