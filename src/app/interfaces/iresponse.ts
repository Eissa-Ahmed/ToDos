export interface IResponse<T> {
  Success: boolean;
  StatusCode: number;
  Message: string;
  Data: T | null;
}
