import {left, right} from '../../../../shared/core/Either';
import {Result} from '../../../../shared/core/Result';
import {APIResponse, BaseAPI} from '../../../../shared/infra/api';
import {tokenService} from '../../../../shared/services';
import {SubjectDetailsDTO, SubjectDTO} from './dto';

interface AddOrUpdateSubjectPayload {
  title: string;
  color: string;
  pictureUrl?: string;
}

interface ISubjectApi {
  addSubject: (
    payload: AddOrUpdateSubjectPayload,
  ) => Promise<APIResponse<SubjectDTO>>;
  updateSubject: (
    id: string,
    payload: AddOrUpdateSubjectPayload,
  ) => Promise<APIResponse<SubjectDetailsDTO>>;
  getSubject: (id: string) => Promise<APIResponse<SubjectDetailsDTO>>;
  getAllSubjects: () => Promise<APIResponse<SubjectDTO[]>>;
  deleteSubject: (id: string) => Promise<APIResponse<void>>;
}

const endpoint = 'subjects';

class SubjectApi extends BaseAPI implements ISubjectApi {
  async addSubject(
    payload: AddOrUpdateSubjectPayload,
  ): Promise<APIResponse<SubjectDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.post(`${endpoint}`, payload, null, {
        authorization: idToken,
      });
      return right(Result.ok<SubjectDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async updateSubject(
    id: string,
    payload: AddOrUpdateSubjectPayload,
  ): Promise<APIResponse<SubjectDetailsDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.put(`${endpoint}/${id}`, payload, null, {
        authorization: idToken,
      });
      return right(Result.ok<SubjectDetailsDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getSubject(id: string): Promise<APIResponse<SubjectDetailsDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/${id}`, null, {
        authorization: idToken,
      });
      return right(Result.ok<SubjectDetailsDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getAllSubjects(): Promise<APIResponse<SubjectDTO[]>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}`, null, {
        authorization: idToken,
      });
      return right(Result.ok<SubjectDTO[]>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async deleteSubject(id: string): Promise<APIResponse<void>> {
    try {
      const idToken = await tokenService.getIdToken();
      await this.delete(`${endpoint}/${id}`, null, {
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

const subjectApi = new SubjectApi();
export {subjectApi as SubjectApi};
