import { Issue } from '../../../src/core/issue/domain/Issue';

export class IssueBuilder {
  private title = 'Test issue';

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  build(): Issue {
    return new Issue(this.title);
  }
}
