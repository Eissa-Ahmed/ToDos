export interface IAuthenticationModel {
  IsAuthenticated: boolean;
  Message: string
  Id: string;
  Email: string;
  Username: string;
  Token: string;
  TokenExpiration: Date;
  RefreshToken: string;
  RefreshTokenExpiration: Date;
}
