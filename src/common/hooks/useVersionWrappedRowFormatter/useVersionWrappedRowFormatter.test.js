import { renderHook } from '@folio/jest-config-stripes/testing-library/react';

import { VersionViewContext } from '@folio/stripes-acq-components';

import { useVersionWrappedRowFormatter } from './useVersionWrappedRowFormatter';

const versionViewContext = { paths: ['testName[0]'] };

const getWrapper = (contextValue = {}) => ({ children }) => (
  <VersionViewContext.Provider value={{ ...versionViewContext, ...contextValue }}>
    {children}
  </VersionViewContext.Provider>
);

const mockBaseRowFormatter = ({ rowClass }) => ({ rowClass });

describe('useVersionWrappedRowFormatter', () => {
  it('should return version wrapped row formatter if versionContext and name are provided', () => {
    const { result } = renderHook(() => useVersionWrappedRowFormatter({
      baseRowFormatter: mockBaseRowFormatter,
      name: 'testName',
    }), { wrapper: getWrapper() });

    const rowFormatter = result.current;
    const row = { rowClass: 'testClass', rowIndex: 0 };

    expect(rowFormatter(row).rowClass.includes('mark')).toBeTruthy();
  });

  it('should not add mark class if row is not updated', () => {
    const { result } = renderHook(() => useVersionWrappedRowFormatter({
      baseRowFormatter: mockBaseRowFormatter,
      name: 'testName',
    }), { wrapper: getWrapper({ paths: ['otherName[0]'] }) });

    const rowFormatter = result.current;
    const row = { rowClass: 'testClass', rowIndex: 0 };

    expect(rowFormatter(row).rowClass.includes('mark')).toBeFalsy();
  });
});
