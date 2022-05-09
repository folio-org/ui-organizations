import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import OrganizationsListFilter from './OrganizationsListFilter';
import { organizationTypes } from '../../../../test/jest/fixtures';

import { useTypes } from '../../../common/hooks';

jest.mock('../../../common/hooks', () => ({
  useTypes: jest.fn(),
}));

const defaultProps = {
  activeFilters: {},
  applyFilters: jest.fn(),
  disabled: false,
};
const renderOrganizationsListFilter = (props = defaultProps) => render(
  <OrganizationsListFilter {...props} />,
  { wrapper: MemoryRouter },
);

describe('OrganizationsListFilter', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
    useTypes
      .mockClear()
      .mockReturnValue({ organizationTypes, totalRecords: organizationTypes.length });
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct structure', async () => {
    const { container, asFragment } = renderOrganizationsListFilter();

    container.querySelector('#org-list-filters-accordion-set').removeAttribute('aria-multiselectable');

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct structure when disabled', async () => {
    const { container, asFragment } = renderOrganizationsListFilter({ ...defaultProps, disabled: true });

    container.querySelector('#org-list-filters-accordion-set').removeAttribute('aria-multiselectable');

    expect(asFragment()).toMatchSnapshot();
  });
});
