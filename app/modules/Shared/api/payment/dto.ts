export interface CustomerDTO {
  email: string;
  customerId: string;
  cards: CardDTO[];
}

export interface VendorDTO {
  email: string;
  vendorId: string;
  status: string; // 'onboarding' | 'completed'
}

export interface CardDTO {
  id: string;
  last4: string;
  brand: string;
  holder: string;
  exp_month: number;
  exp_year: number;
}

export interface BalanceDTO {
  pending: number;
  current: number;
  currency: string;
}
