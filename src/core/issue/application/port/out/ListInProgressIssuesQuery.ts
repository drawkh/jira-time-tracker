import { Issue } from '@/core/issue/domain/Issue';
import { PaginatedCollection } from '@/core/common/domain/PaginatedCollection';

export interface Pagination {
  page?: number;
}

export interface ListInProgressIssuesQuery {
  listInProgressIssues(
    options?: Pagination
  ): Promise<PaginatedCollection<Issue>>;
}
