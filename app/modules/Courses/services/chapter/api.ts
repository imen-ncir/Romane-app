import {left, right} from '../../../../shared/core/Either';
import {Result} from '../../../../shared/core/Result';
import {APIResponse, BaseAPI} from '../../../../shared/infra/api';
import {tokenService} from '../../../../shared/services';
import {ChapterDetailsDTO, ChapterDTO} from './dto';

interface AddOrUpdateChapterPayload {
  title: string;
}

interface MoveChapterPayload {
  targetSubjectId: string;
}

interface IChapterApi {
  addChapterToSubject: (
    idSubject: string,
    payload: AddOrUpdateChapterPayload,
  ) => Promise<APIResponse<ChapterDTO>>;
  moveChapter: (
    chapterId: string,
    payload: MoveChapterPayload,
  ) => Promise<APIResponse<void>>;
  updateChapter: (
    idChapter: string,
    payload: AddOrUpdateChapterPayload,
  ) => Promise<APIResponse<ChapterDetailsDTO>>;
  getChapter: (idChapter: string) => Promise<APIResponse<ChapterDetailsDTO>>;
  deleteChapter: (idChapter: string) => Promise<APIResponse<void>>;
}

const endpoint = 'chapters';

class ChapterApi extends BaseAPI implements IChapterApi {
  async addChapterToSubject(
    idSubject: string,
    payload: AddOrUpdateChapterPayload,
  ): Promise<APIResponse<ChapterDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.post(
        `${endpoint}`,
        {...payload, subjectId: idSubject},
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<ChapterDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async moveChapter(
    chapterId: string,
    payload: MoveChapterPayload,
  ): Promise<APIResponse<void>> {
    try {
      const idToken = await tokenService.getIdToken();
      await this.post(`${endpoint}/${chapterId}/move`, payload, null, {
        authorization: idToken,
      });
      return right(Result.ok<void>());
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async updateChapter(
    idChapter: string,
    payload: AddOrUpdateChapterPayload,
  ): Promise<APIResponse<ChapterDetailsDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.put(
        `${endpoint}/${idChapter}`,
        payload,
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<ChapterDetailsDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getChapter(idChapter: string): Promise<APIResponse<ChapterDetailsDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/${idChapter}`, null, {
        authorization: idToken,
      });
      return right(Result.ok<ChapterDetailsDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async deleteChapter(idChapter: string): Promise<APIResponse<void>> {
    try {
      const idToken = await tokenService.getIdToken();
      await this.delete(`${endpoint}/${idChapter}`, null, {
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

const chapterApi = new ChapterApi();
export {chapterApi as ChapterApi};
