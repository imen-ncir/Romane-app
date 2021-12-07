import {left, right} from '../../../shared/core/Either';
import {Result} from '../../../shared/core/Result';
import {APIResponse, BaseAPI} from '../../../shared/infra/api';
import {ToastService, tokenService} from '../../../shared/services';
import {ProfileDTO} from './dto';

interface UpdateProfilePayload {
  username: string;
  bio?: string;
  pictureUrl?: string;
}

interface IProfileApi {
  getProfile: () => Promise<APIResponse<ProfileDTO>>;
  updateProfile: (
    payload: UpdateProfilePayload,
  ) => Promise<APIResponse<ProfileDTO>>;
}

const endpoint = 'me';

class ProfileApi extends BaseAPI implements IProfileApi {
  async getProfile(): Promise<APIResponse<ProfileDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}`, null, {
        authorization: idToken,
      });
      return right(Result.ok<ProfileDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async updateProfile(
    payload: UpdateProfilePayload,
  ): Promise<APIResponse<ProfileDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.put(`${endpoint}`, payload, null, {
        authorization: idToken,
      });
      return right(Result.ok<ProfileDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
}

const profileApi = new ProfileApi();
export {profileApi as ProfileApi};
