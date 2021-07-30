import { ListInProgressIssuesQuery } from '@/core/issue/application/port/out/ListInProgressIssuesQuery';
import { Issue } from '@/core/issue/domain/Issue';
import { PaginatedCollection } from '@/core/common/domain/PaginatedCollection';

interface ListInProgressIssuesRequest {
  page: number;
}

export class ListInProgressIssues {
  constructor(private query: ListInProgressIssuesQuery) {}

  async execute(
    request?: ListInProgressIssuesRequest
  ): Promise<PaginatedCollection<Issue>> {
    return await this.query.listInProgressIssues({
      page: request?.page,
    });
  }
}
