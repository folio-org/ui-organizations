import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  useList,
} from '@folio/stripes-acq-components';

import { organization } from '../../../test/jest/fixtures';
import { location } from '../../../test/jest/routerMocks';

import OrganizationsList from './OrganizationsList';
import { OrganizationsListContainer } from './OrganizationsListContainer';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useList: jest.fn().mockReturnValue({}),
}));
jest.mock('./OrganizationsList', () => jest.fn().mockReturnValue('OrganizationsList'));

const defaultProps = {
  mutator: {
    organizationsListOrgs: {
      GET: jest.fn(),
    },
  },
  location,
};
const renderOrganizationsListContainer = (props = defaultProps) => render(<OrganizationsListContainer {...props} />);

describe('OrganizationsListContainer', () => {
  it('should display OrganizationsList', () => {
    renderOrganizationsListContainer();

    expect(screen.getByText('OrganizationsList')).toBeDefined();
  });

  it('should pass useList result to OrganizationsList', () => {
    const records = [organization];

    OrganizationsList.mockClear();
    useList.mockClear().mockReturnValue({ records });
    renderOrganizationsListContainer();

    expect(OrganizationsList.mock.calls[0][0].organizations).toBe(records);
  });
});
