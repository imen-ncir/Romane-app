import {left, right} from '../../../shared/core/Either';
import {Result} from '../../../shared/core/Result';
import {APIResponse, BaseAPI} from '../../../shared/infra/api';
import {tokenService} from '../../../shared/services';
import {SubjectDTO} from '../../Courses/services';
import {PackDetailsDTO, PackDTO} from './dto';

export interface SellPackPayload {
  subjectId: string;
  chapterIds: string[];
  description: string;
  category: string;
  level: string;
  isFree: boolean;
}

interface IShopApi {
  sellPack: (payload: SellPackPayload) => Promise<APIResponse<PackDTO>>;
  buyPack: (packId: string) => Promise<APIResponse<SubjectDTO>>;
  getAllPacks: () => Promise<APIResponse<PackDTO[]>>;
  getLearnerPacks: (learnerId: string) => Promise<APIResponse<PackDTO[]>>;
  getPackInfo: (packId: string) => Promise<APIResponse<PackDetailsDTO>>;
}

const endpoint = 'shop';

class ShopApi extends BaseAPI implements IShopApi {
  async sellPack(payload: SellPackPayload): Promise<APIResponse<PackDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.post(
        `${endpoint}/sell/packs`,
        payload,
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<PackDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async buyPack(packId: string): Promise<APIResponse<SubjectDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.post(
        `${endpoint}/buy/packs/${packId}`,
        {},
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<SubjectDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getAllPacks(): Promise<APIResponse<PackDTO[]>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/packs`, null, {
        authorization: idToken,
      });
      return right(Result.ok<PackDTO[]>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getLearnerPacks(learnerId: string): Promise<APIResponse<PackDTO[]>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(
        `${endpoint}/learner/${learnerId}/packs`,
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<PackDTO[]>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getPackInfo(packId: string): Promise<APIResponse<PackDetailsDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/packs/${packId}`, null, {
        authorization: idToken,
      });
      return right(Result.ok<PackDetailsDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
}

const shopApi = new ShopApi();
export {shopApi as ShopApi};
