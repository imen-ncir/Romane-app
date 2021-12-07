//@ts-ignore
import axios, {AxiosInstance} from 'axios';
import Config from 'react-native-config';

export abstract class BaseAPI {
  protected baseUrl: string;
  private axiosInstance: AxiosInstance | any = null;
  private logRequestTime: boolean = true; // Attach Timer to requestion nterceptor

  constructor() {
    this.baseUrl = Config.API_SERVER_HOST;
    this.axiosInstance = axios.create({});
    this.enableInterceptors();
  }

  private enableInterceptors(): void {
    this.axiosInstance.interceptors.request.use(this.getRequestLoggerHandler());
    this.axiosInstance.interceptors.response.use(
      this.getSuccessResponseHandler(),
      this.getErrorResponseHandler(),
    );
  }

  private getRequestLoggerHandler() {
    return (request: any) => {
      console.info(
        `[API Request]: ${request.method.toUpperCase()} ${request.url}`,
      );
      if (this.logRequestTime) {
        request.meta = request.meta || {};
        request.meta.requestStartedAt = new Date().getTime();
      }
      return request;
    };
  }

  private getSuccessResponseHandler() {
    return (response: any) => {
      if (this.logRequestTime) {
        const delta =
          new Date().getTime() - response.config.meta.requestStartedAt;
        console.info(`[API Response]: ${delta} ms`);
      }
      console.info('[API Response]: Ok');
      return response;
    };
  }

  private getErrorResponseHandler() {
    return async (error: any) => {
      console.error('[API Error]:', error.message);
      // if (this.didAccessTokenExpire(error.response)) {
      //   const refreshToken = this.authService.getToken('refresh-token');
      //   const hasRefreshToken = !!refreshToken;

      //   if (hasRefreshToken) {
      //     try {
      //       // Get the new access token
      //       const accessToken = await this.regenerateAccessTokenFromRefreshToken();

      //       // Save token
      //       this.authService.setToken('access-token', accessToken);

      //       // Retry request
      //       error.config.headers['authorization'] = accessToken;
      //       return this.axiosInstance.request(error.config);
      //     } catch (err) {
      //       // remove access and refresh tokens
      //       this.authService.removeToken('access-token');
      //       this.authService.removeToken('refresh-token');
      //       console.error(err);
      //     }
      //   }
      // }
      return Promise.reject({...error});
    };
  }

  protected get(url: string, params?: any, headers?: any): Promise<any> {
    return this.axiosInstance({
      method: 'GET',
      url: `${this.baseUrl}/${url}`,
      params: params ? params : null,
      headers: headers ? headers : null,
    });
  }

  protected post(
    url: string,
    data?: any,
    params?: any,
    headers?: any,
  ): Promise<any> {
    return this.axiosInstance({
      method: 'POST',
      url: `${this.baseUrl}/${url}`,
      data: data ? data : null,
      params: params ? params : null,
      headers: headers ? headers : null,
    });
  }

  protected put(
    url: string,
    data?: any,
    params?: any,
    headers?: any,
  ): Promise<any> {
    return this.axiosInstance({
      method: 'PUT',
      url: `${this.baseUrl}/${url}`,
      data: data ? data : null,
      params: params ? params : null,
      headers: headers ? headers : null,
    });
  }

  protected patch(
    url: string,
    data?: any,
    params?: any,
    headers?: any,
  ): Promise<any> {
    return this.axiosInstance({
      method: 'PATCH',
      url: `${this.baseUrl}/${url}`,
      data: data ? data : null,
      params: params ? params : null,
      headers: headers ? headers : null,
    });
  }

  protected copy(
    url: string,
    data?: any,
    params?: any,
    headers?: any,
  ): Promise<any> {
    return this.axiosInstance({
      method: 'COPY',
      url: `${this.baseUrl}/${url}`,
      data: data ? data : null,
      params: params ? params : null,
      headers: headers ? headers : null,
    });
  }

  protected delete(url: string, params?: any, headers?: any): Promise<any> {
    return this.axiosInstance({
      method: 'DELETE',
      url: `${this.baseUrl}/${url}`,
      params: params ? params : null,
      headers: headers ? headers : null,
    });
  }
}
