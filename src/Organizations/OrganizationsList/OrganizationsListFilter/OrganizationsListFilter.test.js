import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import OrganizationsListFilter from './OrganizationsListFilter';

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
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct structure', async () => {
    const { asFragment } = renderOrganizationsListFilter();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct structure when disabled', async () => {
    const { asFragment } = renderOrganizationsListFilter({ ...defaultProps, disabled: true });

    expect(asFragment()).toMatchSnapshot();
  });
});
