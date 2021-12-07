import {left, right} from '../../../shared/core/Either';
import {Result} from '../../../shared/core/Result';
import {APIResponse, BaseAPI} from '../../../shared/infra/api';
import {tokenService} from '../../../shared/services';

interface IStatsApi {
  getStats: () => Promise<APIResponse<any>>;
}

const endpoint = 'stats';

class StatsApi extends BaseAPI implements IStatsApi {
  async getStats(): Promise<APIResponse<any>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/me`, null, {
        authorization: idToken,
      });
      return right(Result.ok<any>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
}

const statsApi = new StatsApi();
export {statsApi as StatsApi};
