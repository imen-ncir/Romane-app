import {left, right} from '../../../shared/core/Either';
import {Result} from '../../../shared/core/Result';
import {APIResponse, BaseAPI} from '../../../shared/infra/api';
import {tokenService} from '../../../shared/services';
import {SubjectFullDTO, TestDTO, TestRunDTO} from './dto';

interface ITestApi {
  getSubjectDetails: (
    subjectId?: string,
  ) => Promise<APIResponse<SubjectFullDTO[]>>;
  generateTest: (chaptersIds: string[]) => Promise<APIResponse<TestRunDTO>>;
  updateCardScore: (
    flashcardId: string,
    scoreValue: number,
  ) => Promise<APIResponse<void>>;
  saveTestResult: (
    testId: string,
    payload: SaveResultPayload,
  ) => Promise<APIResponse<void>>;
  removeTest: (testId: string) => Promise<APIResponse<void>>;
  getRecommendedTests: () => Promise<APIResponse<TestDTO[]>>;
}

interface SaveResultPayload {
  score: number;
}

const endpoint = 'tests';

class TestApi extends BaseAPI implements ITestApi {
  async getSubjectDetails(
    subjectId?: string,
  ): Promise<APIResponse<SubjectFullDTO[]>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(
        `${endpoint}/subjects/${subjectId || ''}`,
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<SubjectFullDTO[]>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async generateTest(
    chapterIds: string[],
    testId?: string,
  ): Promise<APIResponse<TestRunDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.post(
        `${endpoint}/generate`,
        {chapterIds, testId},
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<TestRunDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getRecommendedTests(): Promise<APIResponse<TestDTO[]>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/test/recommended`, null, {
        authorization: idToken,
      });
      return right(Result.ok<TestDTO[]>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async updateCardScore(
    flashcardId: string,
    scoreValue: number,
  ): Promise<APIResponse<void>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.put(
        `${endpoint}/flashcard/${flashcardId}`,
        {scoreValue},
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<void>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async saveTestResult(
    testId: string,
    payload: SaveResultPayload,
  ): Promise<APIResponse<void>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.put(`${endpoint}/${testId}/`, payload, null, {
        authorization: idToken,
      });
      return right(Result.ok<void>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async removeTest(testId: string): Promise<APIResponse<void>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.delete(`${endpoint}/${testId}/`, null, {
        authorization: idToken,
      });
      return right(Result.ok<void>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
}

const testApi = new TestApi();
export {testApi as TestApi};
