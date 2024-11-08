export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  user: {
    id: string;
    email: string;
  }
  access_token: string;
  refresh_token: string;
}

export interface AuthSignUpRequest {
  email: string;
  password: string;
}

export interface AuthSignUpResponse {
  user: {
    id: string;
    email: string;
  };
  wallet: {
    id: string;
    user_id: string;
    address: string;
  }
  access_token: string;
  refresh_token: string;
}