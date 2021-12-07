import {left, right} from '../../../../shared/core/Either';
import {Result} from '../../../../shared/core/Result';
import {APIResponse, BaseAPI} from '../../../../shared/infra/api';
import {tokenService} from '../../../../shared/services';
import {FlashcardDTO, FlashcardDetailsDTO} from './dto';

interface AddOrUpdateFlashcardPayload {}
interface MoveFlashcardPayload {
  targetChapterId: string;
}
interface IFlashcardApi {
  addFlashcardToChapter: (
    idChapter: string,
    payload: AddOrUpdateFlashcardPayload,
  ) => Promise<APIResponse<FlashcardDTO>>;
  moveFlashcard: (
    flashcardId: string,
    payload: MoveFlashcardPayload,
  ) => Promise<APIResponse<void>>;
  updateFlashcard: (
    idFlashcard: string,
    payload: AddOrUpdateFlashcardPayload,
  ) => Promise<APIResponse<FlashcardDetailsDTO>>;
  getFlashcard: (
    idFlashcard: string,
  ) => Promise<APIResponse<FlashcardDetailsDTO>>;
  deleteFlashcard: (idFlashcard: string) => Promise<APIResponse<void>>;
}

const endpoint = 'flashcards';

class FlashcardApi extends BaseAPI implements IFlashcardApi {
  async addFlashcardToChapter(
    idChapter: string,
    payload: AddOrUpdateFlashcardPayload,
  ): Promise<APIResponse<FlashcardDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.post(
        `${endpoint}`,
        {...payload, chapterId: idChapter},
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<FlashcardDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async moveFlashcard(
    flashcardId: string,
    payload: MoveFlashcardPayload,
  ): Promise<APIResponse<void>> {
    try {
      const idToken = await tokenService.getIdToken();
      await this.post(`${endpoint}/${flashcardId}/move`, payload, null, {
        authorization: idToken,
      });
      return right(Result.ok<void>());
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async updateFlashcard(
    idFlashcard: string,
    payload: AddOrUpdateFlashcardPayload,
  ): Promise<APIResponse<FlashcardDetailsDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.put(
        `${endpoint}/${idFlashcard}`,
        payload,
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<FlashcardDetailsDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getFlashcard(
    idFlashcard: string,
  ): Promise<APIResponse<FlashcardDetailsDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/${idFlashcard}`, null, {
        authorization: idToken,
      });
      return right(Result.ok<FlashcardDetailsDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async deleteFlashcard(idFlashcard: string): Promise<APIResponse<void>> {
    try {
      const idToken = await tokenService.getIdToken();
      await this.delete(`${endpoint}/${idFlashcard}`, null, {
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

const flashcardApi = new FlashcardApi();
export {flashcardApi as FlashcardApi};
