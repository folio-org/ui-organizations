import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { organization } from '../../../test/jest/fixtures';
import { history, location } from '../../../test/jest/routerMocks';

import {
  useOrganization,
  useIntegrationConfigMutation,
} from '../../common/hooks';

import { OrganizationIntegrationForm } from '../OrganizationIntegrationForm';
import { OrganizationIntegrationCreate } from './OrganizationIntegrationCreate';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
  useLocation: jest.fn(),
}));
jest.mock('../../common/hooks', () => ({
  useAcqMethods: jest.fn().mockReturnValue({ acqMethods: [], isLoading: false }),
  useOrganization: jest.fn(),
  useIntegrationConfigs: jest.fn().mockReturnValue({ integrationConfigs: [], isLoading: false }),
  useIntegrationConfigMutation: jest.fn(),
}));
jest.mock('../OrganizationIntegrationForm', () => ({
  OrganizationIntegrationForm: jest.fn().mockReturnValue('OrganizationIntegrationForm'),
}));

const defaultProps = {
  orgId: 'orgId',
};
const renderOrganizationIntegrationCreate = (props = defaultProps) => render(
  <OrganizationIntegrationCreate {...props} />,
);

describe('OrganizationIntegrationCreate', () => {
  beforeEach(() => {
    useHistory.mockClear().mockReturnValue(history);
    useLocation.mockClear().mockReturnValue(location);

    useOrganization.mockClear().mockReturnValue({ organization, isLoading: false });
    useIntegrationConfigMutation.mockClear().mockReturnValue({ });

    OrganizationIntegrationForm.mockClear();
  });

  it('should display OrganizationIntegrationForm', async () => {
    renderOrganizationIntegrationCreate();

    await screen.findByText('OrganizationIntegrationForm');

    expect(screen.getByText('OrganizationIntegrationForm')).toBeDefined();
  });

  it('should redirect to org details when form is closed', async () => {
    const pushMock = jest.fn();

    useHistory.mockClear().mockReturnValue({ ...history, push: pushMock });
    renderOrganizationIntegrationCreate();

    await screen.findByText('OrganizationIntegrationForm');

    OrganizationIntegrationForm.mock.calls[0][0].onClose();

    expect(pushMock).toHaveBeenCalled();
  });

  it('should save integration', async () => {
    const saveIntegrationConfigMock = jest.fn();

    useIntegrationConfigMutation.mockClear().mockReturnValue({ saveIntegrationConfig: saveIntegrationConfigMock });
    renderOrganizationIntegrationCreate();

    await screen.findByText('OrganizationIntegrationForm');

    OrganizationIntegrationForm.mock.calls[0][0].onSubmit({});

    expect(saveIntegrationConfigMock).toHaveBeenCalled();
  });
});
