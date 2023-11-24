import queryString from 'query-string';

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

    expect(result.current(queryString.parse('?foo=bar'))).toBe('(foo=="bar") sortby name/sort.ascending');
  });

  describe('Banking information', () => {
    const params = {
      [SEARCH_PARAMETER]: 'qwerty',
      [SEARCH_INDEX_PARAMETER]: 'name',
    };

    it('should include banking information index in the query if a user has the appropriate permission', () => {
      const { result } = renderHook(() => useBuildQuery());

      expect(result.current(params)).toEqual(expect.stringContaining('bankingInformation.bankAccountNumber="qwerty*"'));
    });

    it('should NOT include banking information index in the query if a user does not have the appropriate permission', async () => {
      stripesStub.hasPerm.mockReturnValue(false);

      const { result } = renderHook(() => useBuildQuery());

      expect(result.current(params)).toEqual(expect.not.stringContaining('bankingInformation.bankAccountNumber="qwerty*"'));
    });
  });
});
