export interface IPaginationInfo<T> {
  TotalCount: number;
  PageNumber: number;
  PageSize: number;
  TotalPages: number;
  HasPreviousPage: boolean;
  HasNextPage: boolean;
  Data: T;
}
