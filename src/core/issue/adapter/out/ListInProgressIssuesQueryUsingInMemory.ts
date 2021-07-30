import {
  ListInProgressIssuesQuery,
  Pagination,
} from '@/core/issue/application/port/out/ListInProgressIssuesQuery';
import { Issue } from '@/core/issue/domain/Issue';
import { PaginatedCollection } from '@/core/common/domain/PaginatedCollection';
import { PageInfo } from '@/core/common/domain/PageInfo';

const DEFAULT_PAGE_SIZE = 5;

export class ListInProgressIssuesQueryUsingInMemory
  implements ListInProgressIssuesQuery
{
  constructor(private issues: Issue[] = []) {}

  listInProgressIssues(
    options?: Pagination
  ): Promise<PaginatedCollection<Issue>> {
    const pageCount = Math.max(
      Math.ceil(this.issues.length / DEFAULT_PAGE_SIZE),
      1
    );
    const page = Math.min(options?.page ?? 1, pageCount);

    return Promise.resolve(
      new PaginatedCollection(
        this.issues.slice(
          (page - 1) * DEFAULT_PAGE_SIZE,
          (page - 1) * DEFAULT_PAGE_SIZE + DEFAULT_PAGE_SIZE
        ),
        this.issues.length,
        new PageInfo(page, pageCount)
      )
    );
  }
}
