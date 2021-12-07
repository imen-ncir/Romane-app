import {left, right} from '../../../../shared/core/Either';
import {Result} from '../../../../shared/core/Result';
import {APIResponse, BaseAPI} from '../../../../shared/infra/api';
import {tokenService} from '../../../../shared/services';
import {MemberDTO} from './dto';

interface ISocialApi {
  searchMember: (criteria?: string) => Promise<APIResponse<MemberDTO[]>>;
  getMemberProfile: (memberId: string) => Promise<APIResponse<MemberDTO>>;
}

const endpoint = 'socials';

class SocialApi extends BaseAPI implements ISocialApi {
  async searchMember(criteria?: string): Promise<APIResponse<MemberDTO[]>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(
        `${endpoint}/members/search/${criteria}`,
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<MemberDTO[]>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getMemberProfile(memberId: string): Promise<APIResponse<MemberDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(
        `${endpoint}/members/profile/${memberId}`,
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<MemberDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
}

const socialApi = new SocialApi();
export {socialApi as SocialApi};
