export interface Response<T> {
  data: T;
  succeeded: boolean;
  errors: any;
  message: string;
}

export interface PageResponse<T> extends Response<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}
