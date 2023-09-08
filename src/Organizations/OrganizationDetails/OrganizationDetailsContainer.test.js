import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import { organizationTypes } from 'fixtures';

import { match, location, history } from '../../../test/jest/routerMocks';
import { useTypes } from '../../common/hooks';
import OrganizationDetails from './OrganizationDetails';
import { OrganizationDetailsContainer } from './OrganizationDetailsContainer';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useIntegrationConfigs: jest.fn().mockReturnValue({ integrationConfigs: [], isLoading: false }),
}));
jest.mock('../../common/hooks', () => ({
  ...jest.requireActual('../../common/hooks'),
  useTypes: jest.fn(),
}));
jest.mock('./OrganizationDetails', () => jest.fn(() => 'OrganizationDetails'));

const organization = {
  id: 'orgUId',
  name: 'Amazon',
};

const mutatorMock = {
  organizationDetailsOrg: {
    GET: jest.fn(),
  },
  organizationDetailsCategories: {
    GET: jest.fn().mockReturnValue(Promise.resolve([])),
  },
};
const historyMock = {
  ...history,
  push: jest.fn(),
};
const refreshListMock = jest.fn();
const renderOrganizationDetailsContainer = () => render(
  <OrganizationDetailsContainer
    mutator={mutatorMock}
    location={location}
    history={historyMock}
    match={match}
    refreshList={refreshListMock}
  />,
);

describe('OrganizationDetailsContainer', () => {
  beforeEach(() => {
    mutatorMock.organizationDetailsOrg.GET.mockClear().mockReturnValue(Promise.resolve(organization));
    useTypes
      .mockClear()
      .mockReturnValue({ orgTypes: { organizationTypes, totalRecords: organizationTypes.length } });

    historyMock.push.mockClear();
  });

  it('should display OrganizationDetails', async () => {
    renderOrganizationDetailsContainer();

    await screen.findByText('OrganizationDetails');

    expect(screen.getByText('OrganizationDetails')).toBeDefined();
  });

  it('should redirect to list when close action is called', async () => {
    renderOrganizationDetailsContainer();

    await screen.findByText('OrganizationDetails');

    OrganizationDetails.mock.calls[0][0].onClose();

    expect(historyMock.push.mock.calls[0][0].pathname).toBe('/organizations');
  });

  it('should redirect to edit view when edit action is called', async () => {
    renderOrganizationDetailsContainer();

    await screen.findByText('OrganizationDetails');

    OrganizationDetails.mock.calls[0][0].onEdit();

    expect(historyMock.push.mock.calls[0][0].pathname).toBe('/organizations/id/edit');
  });

  it('should redirect to export log view when view log action is called', async () => {
    renderOrganizationDetailsContainer();

    await screen.findByText('OrganizationDetails');

    OrganizationDetails.mock.calls[0][0].onViewExportLog();

    expect(historyMock.push.mock.calls[0][0].pathname).toBe('/export-manager/edi-jobs');
  });
});
