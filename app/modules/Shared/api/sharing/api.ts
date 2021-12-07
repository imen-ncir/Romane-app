import {left, right} from '../../../../shared/core/Either';
import {Result} from '../../../../shared/core/Result';
import {APIResponse, BaseAPI} from '../../../../shared/infra/api';
import {tokenService} from '../../../../shared/services';

export interface ShareSubjectPayload {
  targetId: string;
  subjectId: string;
  chapterIds: string[];
}

interface IShareApi {
  shareSubject: (payload: ShareSubjectPayload) => Promise<APIResponse<void>>;
}

const endpoint = 'share';

class ShareApi extends BaseAPI implements IShareApi {
  async shareSubject(payload: ShareSubjectPayload): Promise<APIResponse<void>> {
    try {
      const idToken = await tokenService.getIdToken();
      await this.post(`${endpoint}/subject`, payload, null, {
        authorization: idToken,
      });
      return right(Result.ok<void>());
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
}

const shareApi = new ShareApi();
export {shareApi as ShareApi};
