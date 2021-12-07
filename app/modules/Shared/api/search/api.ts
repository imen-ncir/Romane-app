import {left, right} from '../../../../shared/core/Either';
import {Result} from '../../../../shared/core/Result';
import {APIResponse, BaseAPI} from '../../../../shared/infra/api';
import {tokenService} from '../../../../shared/services';
import {GlobalSearchResultsDTO} from './dto';

interface ISearchApi {
  searchGlobal: (
    searchText?: string,
  ) => Promise<APIResponse<GlobalSearchResultsDTO>>;
}

const endpoint = 'search';

class SearchApi extends BaseAPI implements ISearchApi {
  async searchGlobal(
    searchText?: string,
  ): Promise<APIResponse<GlobalSearchResultsDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/${searchText}`, null, {
        authorization: idToken,
      });
      return right(Result.ok<GlobalSearchResultsDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
}

const searchApi = new SearchApi();
export {searchApi as SearchApi};
