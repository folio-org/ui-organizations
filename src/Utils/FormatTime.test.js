import FormatTime from './FormatTime';

import { organization } from '../../test/jest/fixtures';

describe('FormatTime', () => {
  it('should return false when org is not edi', () => {
    expect(FormatTime({})).toBe(false);
  });

  it('should return formatted time for form', () => {
    expect(FormatTime(organization, 'post')).toBe('2021-06-16T11:59:00.000+00:00');
  });

  it('should return formatted time for details', () => {
    expect(FormatTime(organization, 'get')).toBe('7:59 AM.+0000');
  });
});
