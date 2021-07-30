import { ListInProgressIssuesQueryUsingInMemory } from '@/core/issue/adapter/out/ListInProgressIssuesQueryUsingInMemory';
import { ListInProgressIssues } from '@/core/issue/application/service/ListInProgressIssues';
import { Issue } from '@/core/issue/domain/Issue';
import { PaginatedCollection } from '@/core/common/domain/PaginatedCollection';
import { PageInfo } from '@/core/common/domain/PageInfo';

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
        new ListInProgressIssuesQueryUsingInMemory([new Issue('Issue 1')])
      );

      const response = await service.execute();

      expect(response).toEqual(
        new PaginatedCollection([new Issue('Issue 1')], 1, new PageInfo(1, 1))
      );
    });
  });

  describe('Given several registered issues', () => {
    it('should return a page containing multiple issues', async () => {
      const service = new ListInProgressIssues(
        new ListInProgressIssuesQueryUsingInMemory([
          new Issue('Issue 1'),
          new Issue('Issue 2'),
          new Issue('Issue 3'),
          new Issue('Issue 4'),
          new Issue('Issue 5'),
        ])
      );

      const response = await service.execute();

      expect(response).toEqual(
        new PaginatedCollection(
          [
            new Issue('Issue 1'),
            new Issue('Issue 2'),
            new Issue('Issue 3'),
            new Issue('Issue 4'),
            new Issue('Issue 5'),
          ],
          5,
          new PageInfo(1, 1)
        )
      );
    });

    it('should return the first page containing the first part of the issues', async () => {
      const service = new ListInProgressIssues(
        new ListInProgressIssuesQueryUsingInMemory([
          new Issue('Issue 1'),
          new Issue('Issue 2'),
          new Issue('Issue 3'),
          new Issue('Issue 4'),
          new Issue('Issue 5'),
          new Issue('Issue 6'),
        ])
      );

      const response = await service.execute();

      expect(response).toEqual(
        new PaginatedCollection(
          [
            new Issue('Issue 1'),
            new Issue('Issue 2'),
            new Issue('Issue 3'),
            new Issue('Issue 4'),
            new Issue('Issue 5'),
          ],
          6,
          new PageInfo(1, 2)
        )
      );
    });

    it('should return the second page containing the last part of the issues', async () => {
      const service = new ListInProgressIssues(
        new ListInProgressIssuesQueryUsingInMemory([
          new Issue('Issue 1'),
          new Issue('Issue 2'),
          new Issue('Issue 3'),
          new Issue('Issue 4'),
          new Issue('Issue 5'),
          new Issue('Issue 6'),
        ])
      );

      const response = await service.execute({
        page: 2,
      });

      expect(response).toEqual(
        new PaginatedCollection([new Issue('Issue 6')], 6, new PageInfo(2, 2))
      );
    });
  });
});
