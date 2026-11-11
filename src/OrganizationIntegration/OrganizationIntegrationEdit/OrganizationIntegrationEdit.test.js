import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import {
  useIntegrationConfigs,
  useOrganization,
} from '@folio/stripes-acq-components';

import { integrationConfig, organization } from 'fixtures';
import { history, location } from '../../../test/jest/routerMocks';

import {
  useIntegrationConfig,
  useIntegrationConfigMutation,
} from '../../common/hooks';

import { OrganizationIntegrationForm } from '../OrganizationIntegrationForm';
import { OrganizationIntegrationEdit } from './OrganizationIntegrationEdit';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
  useLocation: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useIntegrationConfigs: jest.fn().mockReturnValue({ integrationConfigs: [], isFetching: false }),
  useOrganization: jest.fn(),
}));
jest.mock('../../common/hooks', () => ({
  useAcqMethods: jest.fn().mockReturnValue({ acqMethods: [], isLoading: false }),
  useIntegrationConfigMutation: jest.fn(),
  useIntegrationConfig: jest.fn(),
}));
jest.mock('../OrganizationIntegrationForm', () => ({
  OrganizationIntegrationForm: jest.fn().mockReturnValue('OrganizationIntegrationForm'),
}));

const defaultProps = {
  orgId: 'orgId',
};
const renderOrganizationIntegrationEdit = (props = defaultProps) => render(
  <OrganizationIntegrationEdit {...props} />,
);

describe('OrganizationIntegrationEdit', () => {
  beforeEach(() => {
    useHistory.mockClear().mockReturnValue(history);
    useLocation.mockClear().mockReturnValue(location);
    useParams.mockClear().mockReturnValue({ id: 'integId' });

    useOrganization.mockClear().mockReturnValue({ organization, isLoading: false });
    useIntegrationConfigMutation.mockClear().mockReturnValue({ });
    useIntegrationConfig.mockClear().mockReturnValue({ integrationConfig: { id: 'integration' } });

    OrganizationIntegrationForm.mockClear();
  });

  it('should display OrganizationIntegrationForm', async () => {
    renderOrganizationIntegrationEdit();

    await screen.findByText('OrganizationIntegrationForm');

    expect(screen.getByText('OrganizationIntegrationForm')).toBeDefined();
  });

  it('should show the loading pane while integration configs are fetching', () => {
    useIntegrationConfigs.mockReturnValueOnce({ integrationConfigs: [], isFetching: true });

    renderOrganizationIntegrationEdit();

    expect(screen.queryByText('OrganizationIntegrationForm')).not.toBeInTheDocument();
  });

  it('should redirect to org details when form is closed', async () => {
    const pushMock = jest.fn();

    useHistory.mockClear().mockReturnValue({ ...history, push: pushMock });
    renderOrganizationIntegrationEdit();

    await screen.findByText('OrganizationIntegrationForm');

    OrganizationIntegrationForm.mock.calls[0][0].onClose();

    expect(pushMock).toHaveBeenCalled();
  });

  it('should save integration', async () => {
    const saveIntegrationConfigMock = jest.fn();

    useIntegrationConfigMutation.mockClear().mockReturnValue({ mutateIntegrationConfig: saveIntegrationConfigMock });
    renderOrganizationIntegrationEdit();

    await screen.findByText('OrganizationIntegrationForm');

    OrganizationIntegrationForm.mock.calls[0][0].onSubmit({});

    expect(saveIntegrationConfigMock).toHaveBeenCalled();
  });

  it.each([undefined, 'Outdated vendor name'])('should initialize vendorName with the current name when it was %s', (vendorName) => {
    const config = {
      ...integrationConfig,
      exportTypeSpecificParameters: {
        ...integrationConfig.exportTypeSpecificParameters,
        vendorEdiOrdersExportConfig: {
          ...integrationConfig.exportTypeSpecificParameters.vendorEdiOrdersExportConfig,
          vendorName,
        },
      },
    };

    useIntegrationConfig.mockReturnValue({ integrationConfig: config });
    renderOrganizationIntegrationEdit();

    const initialValues = OrganizationIntegrationForm.mock.calls[0][0].initialValues;

    expect(initialValues.exportTypeSpecificParameters.vendorEdiOrdersExportConfig).toEqual({
      ...config.exportTypeSpecificParameters.vendorEdiOrdersExportConfig,
      vendorName: organization.name,
    });
    expect(config.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.vendorName).toBe(vendorName);
  });

  it('should initialize the config and vendor name after they load', () => {
    useIntegrationConfig.mockReturnValue({ isLoading: true });
    useOrganization.mockReturnValue({ isLoading: true });

    const { rerender } = renderOrganizationIntegrationEdit();

    expect(OrganizationIntegrationForm).not.toHaveBeenCalled();

    useIntegrationConfig.mockReturnValue({ integrationConfig, isLoading: false });
    useOrganization.mockReturnValue({ organization, isLoading: false });
    rerender(<OrganizationIntegrationEdit {...defaultProps} />);

    const initialValues = OrganizationIntegrationForm.mock.calls[0][0].initialValues;

    expect(initialValues.id).toBe(integrationConfig.id);
    expect(initialValues.exportTypeSpecificParameters.vendorEdiOrdersExportConfig).toEqual({
      ...integrationConfig.exportTypeSpecificParameters.vendorEdiOrdersExportConfig,
      vendorName: organization.name,
    });
  });
});
