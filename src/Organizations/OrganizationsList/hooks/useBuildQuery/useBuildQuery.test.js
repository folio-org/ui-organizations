import { renderHook } from '@folio/jest-config-stripes/testing-library/react';
import { useStripes } from '@folio/stripes/core';
import {
  SEARCH_INDEX_PARAMETER,
  SEARCH_PARAMETER,
} from '@folio/stripes-acq-components';

import { useBuildQuery } from './useBuildQuery';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useStripes: jest.fn(),
}));

const stripesStub = {
  hasPerm: jest.fn(() => true),
};

describe('useBuildQuery', () => {
  beforeEach(() => {
    stripesStub.hasPerm.mockClear();

    useStripes
      .mockClear()
      .mockReturnValue(stripesStub);
  });

  it('should return function, that return query', () => {
    const { result } = renderHook(() => useBuildQuery());

    expect(result.current({
      [SEARCH_PARAMETER]: 'bar',
      [SEARCH_INDEX_PARAMETER]: 'foo',
    })).toBe('(((foo=bar*))) sortby name/sort.ascending');
  });

  describe('Banking information', () => {
    const params = {
      [SEARCH_PARAMETER]: 'qwerty',
    };

    it('should include banking information index in the query if a user has the appropriate permission', () => {
      const { result } = renderHook(() => useBuildQuery());

      expect(result.current(params)).toContain('bankingInformation.bankAccountNumber="qwerty*"');
    });

    it('should NOT include banking information index in the query if a user does not have the appropriate permission', async () => {
      stripesStub.hasPerm.mockReturnValue(false);

      const { result } = renderHook(() => useBuildQuery());

      expect(result.current(params)).not.toContain('bankingInformation.bankAccountNumber="qwerty*"');
    });
  });
});
