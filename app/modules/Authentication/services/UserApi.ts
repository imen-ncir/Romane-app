import {left, right} from '../../../shared/core/Either';
import {Result} from '../../../shared/core/Result';
import {APIResponse} from '../../../shared/infra/api/APIResponse';
import {BaseAPI} from '../../../shared/infra/api/BaseAPI';

export interface IUserApi {
  registerWithEmailAndPassword(
    email: string,
    username: string,
  ): Promise<APIResponse<void>>;
  registerWithFacebook(
    fbAuthToken: string,
    fbUserId: string,
  ): Promise<APIResponse<void>>;
  registerWithGoogle(googleAuthToken: string): Promise<APIResponse<void>>;
  verifyUsername(username: string): Promise<APIResponse<any>>;
}

const endpoint = 'users';

class UserApi extends BaseAPI implements IUserApi {
  async registerWithEmailAndPassword(
    email: string,
    username: string,
  ): Promise<APIResponse<void>> {
    try {
      const payload = {
        email,
        username,
      };
      await this.post(`${endpoint}/register/email`, payload);
      return right(Result.ok<void>());
    } catch (error) {
      console.log("-------- err rejistttt----"+JSON.stringify(error))
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }

  async registerWithFacebook(
    fbAuthToken: string,
    fbUserId: string,
  ): Promise<APIResponse<void>> {
    try {
      const payload = {
        fbAuthToken,
        fbUserId,
      };
      await this.post(`${endpoint}/register/facebook`, payload);
      return right(Result.ok<void>());
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }

  async registerWithGoogle(
    googleAuthToken: string,
  ): Promise<APIResponse<void>> {
    try {
      const payload = {
        googleAuthToken,
      };
      await this.post(`${endpoint}/register/google`, payload);
      return right(Result.ok<void>());
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }

  async verifyUsername(username: string): Promise<APIResponse<boolean>> {
    try {
      const result = await this.post(`${endpoint}/verify/username`, {username});
      return right(Result.ok<any>(result.data.isValid));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
}

const userApi = new UserApi();
export {userApi as UserApi};
