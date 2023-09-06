import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import { organization } from 'fixtures';

import { OrganizationsListContainer } from './OrganizationsListContainer';
import { useOrganizations } from './hooks';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  usePagination: () => ({}),
}));
jest.mock('./OrganizationsList', () => jest.fn().mockReturnValue('OrganizationsList'));
jest.mock('./hooks/useOrganizations', () => ({
  useOrganizations: jest.fn(),
}));

const renderOrganizationsListContainer = (props = {}) => render(
  <OrganizationsListContainer
    {...props}
  />,
);

describe('OrganizationsListContainer', () => {
  beforeEach(() => {
    useOrganizations
      .mockClear()
      .mockReturnValue({ organization, totalRecords: organization.length });
  });

  it('should display OrganizationsList', () => {
    renderOrganizationsListContainer();

    expect(screen.getByText('OrganizationsList')).toBeDefined();
  });

  it('should load organizations list via \'useOrganizations\'', () => {
    renderOrganizationsListContainer();

    expect(useOrganizations).toHaveBeenCalled();
  });
});
