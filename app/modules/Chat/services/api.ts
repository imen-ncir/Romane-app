import {left, right} from '../../../shared/core/Either';
import {Result} from '../../../shared/core/Result';
import {APIResponse, BaseAPI} from '../../../shared/infra/api';
import {tokenService} from '../../../shared/services';
import {ConversationDTO, MessageDTO} from './dto';

export interface AddMessagePayload {
  text: string;
}

interface IChatApi {
  createConversation: (
    memberId: string,
  ) => Promise<APIResponse<ConversationDTO>>;
  getConversations: () => Promise<APIResponse<ConversationDTO[]>>;
  addMessage: (
    conversationId: string,
    payload: AddMessagePayload,
  ) => Promise<APIResponse<MessageDTO>>;
  getConversation: (
    conversationId: string,
  ) => Promise<APIResponse<ConversationDTO>>;
  deleteConversation: (conversationId: string) => Promise<APIResponse<void>>;
  getMessages: (conversationId: string) => Promise<APIResponse<MessageDTO[]>>;
}

const endpoint = 'socials/chat';

class ChatApi extends BaseAPI implements IChatApi {
  async createConversation(
    memberId: string,
  ): Promise<APIResponse<ConversationDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.post(
        `${endpoint}`,
        {
          memberId,
        },
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<ConversationDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getConversations(): Promise<APIResponse<ConversationDTO[]>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}`, null, {
        authorization: idToken,
      });
      return right(Result.ok<ConversationDTO[]>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getConversation(
    conversationId: string,
  ): Promise<APIResponse<ConversationDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/${conversationId}`, null, {
        authorization: idToken,
      });
      return right(Result.ok<ConversationDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async addMessage(
    conversationId: string,
    payload: AddMessagePayload,
  ): Promise<APIResponse<MessageDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.post(
        `${endpoint}/${conversationId}/messages`,
        payload,
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<MessageDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getMessages(
    conversationId: string,
  ): Promise<APIResponse<MessageDTO[]>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(
        `${endpoint}/${conversationId}/messages`,
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<MessageDTO[]>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async deleteConversation(conversationId: string): Promise<APIResponse<void>> {
    try {
      const idToken = await tokenService.getIdToken();
      await this.delete(`${endpoint}/${conversationId}`, null, {
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

const chatApi = new ChatApi();
export {chatApi as ChatApi};
