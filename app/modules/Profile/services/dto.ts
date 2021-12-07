export interface ProfileDTO {
  username: string;
  email: string;
  experience: number;
  credits: number;
  bio?: string;
  photoURL?: string;
  badges: any[];
  stripeCustomerId?: string;
  stripeAccountId?: string;
}

export interface BadgeDTO {
  id: string;
  enabled: boolean;
  color?: string;
}
