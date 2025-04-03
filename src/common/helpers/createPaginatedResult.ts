import { PaginatedResult } from '../interfaces/paginated-result.interface';

export function createPaginatedResult<T>(
  result: T[],
  totalCount: number,
  page: number,
): PaginatedResult<T> {
  return { result, totalCount, page };
}
