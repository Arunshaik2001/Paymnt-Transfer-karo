export interface LoginResponse {
  id: string;
  bankAccount: number;
  balance: number;
  upiId: number;
  userName: string;
  emailId: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};
