import React from 'react';
import { render, screen } from '@testing-library/react';
import queryString from 'query-string';

import {
  useList,
} from '@folio/stripes-acq-components';

import { organization } from '../../../test/jest/fixtures';
import { location } from '../../../test/jest/routerMocks';

import OrganizationsList from './OrganizationsList';
import { OrganizationsListContainer, buildOrgsQuery } from './OrganizationsListContainer';

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

  it('should load organizations in useList', () => {
    defaultProps.mutator.organizationsListOrgs.GET.mockClear();
    useList.mockClear();

    renderOrganizationsListContainer();

    useList.mock.calls[0][1](5);

    expect(defaultProps.mutator.organizationsListOrgs.GET).toHaveBeenCalledWith({
      params: {
        limit: 30,
        offset: 5,
        query: '(cql.allRecords=1) sortby name/sort.ascending',
      },
    });
  });

  describe('search query', () => {
    it('should build query when search is active', () => {
      const expectedQuery = '((name="Amazon*" or code="Amazon*" or language="Amazon*" or aliases="Amazon*" or erpCode="Amazon*" or taxId="Amazon*")) sortby name/sort.ascending';

      expect(buildOrgsQuery(queryString.parse('?query=Amazon'))).toBe(expectedQuery);
    });

    it('should build query when search by field is active', () => {
      const expectedQuery = '(((name=Amazon*))) sortby name/sort.ascending';

      expect(buildOrgsQuery(queryString.parse('?qindex=name&query=Amazon'))).toBe(expectedQuery);
    });
  });
});
