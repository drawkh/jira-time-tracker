import { ListInProgressIssuesQueryUsingInMemory } from '@/core/issue/adapter/out/ListInProgressIssuesQueryUsingInMemory';
import { ListInProgressIssues } from '@/core/issue/application/service/ListInProgressIssues';
import { PaginatedCollection } from '@/core/common/domain/PaginatedCollection';
import { PageInfo } from '@/core/common/domain/PageInfo';
import { IssueBuilder } from '../../../../utils/builders/IssueBuilder';

describe('ListInProgressIssues', () => {
  describe('Given no registered issues', () => {
    it('should return an empty page', async () => {
      const service = new ListInProgressIssues(
        new ListInProgressIssuesQueryUsingInMemory()
      );

      const response = await service.execute();

      expect(response).toEqual(
        new PaginatedCollection([], 0, new PageInfo(1, 1))
      );
    });
  });

  describe('Given a registered issue', () => {
    it('should return a page containing the issue', async () => {
      const service = new ListInProgressIssues(
        new ListInProgressIssuesQueryUsingInMemory([
          new IssueBuilder().withTitle('Issue 1').build(),
        ])
      );

      const response = await service.execute();

      expect(response).toEqual(
        new PaginatedCollection(
          [new IssueBuilder().withTitle('Issue 1').build()],
          1,
          new PageInfo(1, 1)
        )
      );
    });
  });

  describe('Given several registered issues', () => {
    it('should return a page containing multiple issues', async () => {
      const service = new ListInProgressIssues(
        new ListInProgressIssuesQueryUsingInMemory([
          new IssueBuilder().withTitle('Issue 1').build(),
          new IssueBuilder().withTitle('Issue 2').build(),
          new IssueBuilder().withTitle('Issue 3').build(),
          new IssueBuilder().withTitle('Issue 4').build(),
          new IssueBuilder().withTitle('Issue 5').build(),
        ])
      );

      const response = await service.execute();

      expect(response).toEqual(
        new PaginatedCollection(
          [
            new IssueBuilder().withTitle('Issue 1').build(),
            new IssueBuilder().withTitle('Issue 2').build(),
            new IssueBuilder().withTitle('Issue 3').build(),
            new IssueBuilder().withTitle('Issue 4').build(),
            new IssueBuilder().withTitle('Issue 5').build(),
          ],
          5,
          new PageInfo(1, 1)
        )
      );
    });

    it('should return the first page containing the first part of the issues', async () => {
      const service = new ListInProgressIssues(
        new ListInProgressIssuesQueryUsingInMemory([
          new IssueBuilder().withTitle('Issue 1').build(),
          new IssueBuilder().withTitle('Issue 2').build(),
          new IssueBuilder().withTitle('Issue 3').build(),
          new IssueBuilder().withTitle('Issue 4').build(),
          new IssueBuilder().withTitle('Issue 5').build(),
          new IssueBuilder().withTitle('Issue 6').build(),
        ])
      );

      const response = await service.execute();

      expect(response).toEqual(
        new PaginatedCollection(
          [
            new IssueBuilder().withTitle('Issue 1').build(),
            new IssueBuilder().withTitle('Issue 2').build(),
            new IssueBuilder().withTitle('Issue 3').build(),
            new IssueBuilder().withTitle('Issue 4').build(),
            new IssueBuilder().withTitle('Issue 5').build(),
          ],
          6,
          new PageInfo(1, 2)
        )
      );
    });

    it('should return the second page containing the last part of the issues', async () => {
      const service = new ListInProgressIssues(
        new ListInProgressIssuesQueryUsingInMemory([
          new IssueBuilder().withTitle('Issue 1').build(),
          new IssueBuilder().withTitle('Issue 2').build(),
          new IssueBuilder().withTitle('Issue 3').build(),
          new IssueBuilder().withTitle('Issue 4').build(),
          new IssueBuilder().withTitle('Issue 5').build(),
          new IssueBuilder().withTitle('Issue 6').build(),
        ])
      );

      const response = await service.execute({
        page: 2,
      });

      expect(response).toEqual(
        new PaginatedCollection(
          [new IssueBuilder().withTitle('Issue 6').build()],
          6,
          new PageInfo(2, 2)
        )
      );
    });
  });
});
