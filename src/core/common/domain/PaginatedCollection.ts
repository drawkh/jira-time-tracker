import { PageInfo } from '@/core/common/domain/PageInfo';

export class PaginatedCollection<T> {
  constructor(
    private items: T[],
    private count: number,
    private pageInfo: PageInfo
  ) {}
}
