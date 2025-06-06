export interface PageInfo {
  currentPage: number;
  hasNextPage: boolean;
  total: number;
  perPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pageInfo: PageInfo;
}