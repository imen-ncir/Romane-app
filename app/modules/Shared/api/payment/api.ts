import {left, right} from '../../../../shared/core/Either';
import {Result} from '../../../../shared/core/Result';
import {APIResponse, BaseAPI} from '../../../../shared/infra/api';
import {tokenService} from '../../../../shared/services';
import {BalanceDTO, CardDTO, CustomerDTO, VendorDTO} from './dto';

interface IPaymentApi {
  getCustomerAccount: () => Promise<APIResponse<CustomerDTO>>;
  addCard: (PaymentMethodId: string) => Promise<APIResponse<void>>;
  getCard: () => Promise<APIResponse<CardDTO | null>>;
  removeCard: (paymentMethodId: string) => Promise<APIResponse<void>>;

  getAccountLink: (accountId: string) => Promise<APIResponse<string>>;
  completeOnBoarding: (accountId: string) => Promise<APIResponse<void>>;
}

const endpoint = 'payment';

class PaymentApi extends BaseAPI implements IPaymentApi {
  // Customer Part
  async getCustomerAccount(): Promise<APIResponse<CustomerDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/customer/myaccount`, null, {
        authorization: idToken,
      });
      return right(Result.ok<CustomerDTO>(response.data));
    } catch (error) {
      //console.log("errrr log: "+JSON.stringify(error))
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async addCard(paymentMethodId: string): Promise<APIResponse<void>> {
    try {
      const idToken = await tokenService.getIdToken();
      await this.post(`${endpoint}/customer/card`, {paymentMethodId}, null, {
        authorization: idToken,
      });
      return right(Result.ok<void>());
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getCard(): Promise<APIResponse<CardDTO | null>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/customer/card`, null, {
        authorization: idToken,
      });
      return right(
        Result.ok<CardDTO | null>(
          response.data === 'OK' ? null : response.data,
        ),
      );
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async removeCard(paymentMethodId: string): Promise<APIResponse<void>> {
    try {
      const idToken = await tokenService.getIdToken();
      await this.delete(`${endpoint}/customer/card/${paymentMethodId}`, null, {
        authorization: idToken,
      });
      return right(Result.ok<void>());
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async canBuy(): Promise<boolean> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/customer/verify`, null, {
        authorization: idToken,
      });
      return !!response.data && response.data === true;
    } catch (error) {
      return false;
    }
  }

  // Vendor Part
  async getVendorAccount(): Promise<APIResponse<VendorDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/vendor/myaccount`, null, {
        authorization: idToken,
      });
      return right(Result.ok<VendorDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getAccountLink(accountId: string): Promise<APIResponse<string>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(
        `${endpoint}/vendor/${accountId}/account-link`,
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<string>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async completeOnBoarding(): Promise<APIResponse<void>> {
    try {
      const idToken = await tokenService.getIdToken();
      await this.get(`${endpoint}/vendor/onboarding/complete`, null, {
        authorization: idToken,
      });
      return right(Result.ok<void>());
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async getVendorBalance(accountId: string): Promise<APIResponse<BalanceDTO>> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(
        `${endpoint}/vendor/${accountId}/balance`,
        null,
        {
          authorization: idToken,
        },
      );
      return right(Result.ok<BalanceDTO>(response.data));
    } catch (error) {
      return left(
        error.response ? error.response.data.message : 'Connection failed',
      );
    }
  }
  async canSell(): Promise<boolean> {
    try {
      const idToken = await tokenService.getIdToken();
      const response = await this.get(`${endpoint}/vendor/verify`, null, {
        authorization: idToken,
      });
      return !!response.data && response.data === true;
    } catch (error) {
      return false;
    }
  }
}

const paymentApi = new PaymentApi();
export {paymentApi as PaymentApi};
