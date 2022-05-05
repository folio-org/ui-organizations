import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { screen, render } from '@testing-library/react';

import { noop } from 'lodash';

import { TypeFilter } from './TypeFilter';
import { organizationTypes } from '../../../../../test/jest/fixtures';

import { useTypes } from '../../../../common/hooks';

jest.mock('../../../../common/hooks', () => ({
  useTypes: jest.fn(),
}));

const filterAccordionTitle = 'ui-organizations.filterConfig.types';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const renderFilter = () => render(
  <TypeFilter
    activeFilters={[]}
    closedByDefault
    disabled
    id="types-filter"
    labelId={filterAccordionTitle}
    name="organizationTypes"
    onChange={noop}
  />,
  { wrapper },
);

describe('TypeFilter component', () => {
  beforeEach(() => {
    useTypes
      .mockClear()
      .mockReturnValue({ organizationTypes, totalRecords: organizationTypes.length });
  });

  it('should display passed title', () => {
    renderFilter();

    expect(screen.getByText(filterAccordionTitle)).toBeDefined();
  });

  it('should be closed by default', () => {
    const { getByLabelText } = renderFilter();

    expect(getByLabelText(`${filterAccordionTitle} filter list`).getAttribute('aria-expanded') || 'false').toBe('false');
  });

  it('should render all passed options', async () => {
    renderFilter();

    expect(document.querySelectorAll('#multiselect-option-list-types-filter > li').length).toEqual(2);
  });
});
