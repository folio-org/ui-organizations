import React from 'react';
import { render, screen } from '@testing-library/react';
import { queryHelpers } from '@testing-library/dom';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';

import {
  HasCommand,
  expandAllSections,
  collapseAllSections,
} from '@folio/stripes/components';

import { integrationConfig } from '../../../test/jest/fixtures';
import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import {
  useOrganization,
  useIntegrationConfig,
  useIntegrationConfigMutation,
} from '../../common/hooks';
import OrganizationIntegrationView from './OrganizationIntegrationView';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock('@folio/stripes-components/lib/Commander', () => ({
  HasCommand: jest.fn(({ children }) => <div>{children}</div>),
  expandAllSections: jest.fn(),
  collapseAllSections: jest.fn(),
}));
jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useIntegrationConfigs: jest.fn().mockReturnValue({ integrationConfigs: [], isLoading: false }),
}));
jest.mock('../../common/hooks', () => ({
  useAcqMethods: jest.fn().mockReturnValue({ acqMethods: [], isLoading: false }),
  useOrganization: jest.fn(),
  useIntegrationConfig: jest.fn(),
  useIntegrationConfigMutation: jest.fn().mockReturnValue({ mutateIntegrationConfig: jest.fn() }),
}));

const queryAllByClass = queryHelpers.queryAllByAttribute.bind(null, 'class');

const orgId = 'orgId';
const defaultProps = { orgId };
const renderOrganizationIntegrationView = (props = defaultProps) => render(
  <OrganizationIntegrationView {...props} />,
  { wrapper: MemoryRouter },
);

describe('OrganizationIntegrationView', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;

    useParams.mockClear().mockReturnValue({ id: integrationConfig.id });
    useOrganization.mockClear().mockReturnValue({
      organization: { id: defaultProps.orgId, accounts: [] },
      isLoading: false,
    });
    useIntegrationConfigMutation.mockClear().mockReturnValue({ });
    useIntegrationConfig.mockClear().mockReturnValue({ integrationConfig });
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct view structure', () => {
    const { asFragment } = renderOrganizationIntegrationView();

    expect(asFragment()).toMatchSnapshot();
  });

  describe('Sections toggle', () => {
    it('should have all expanded sections by default', () => {
      const { container } = renderOrganizationIntegrationView();

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'true')
          .length,
      ).toBe(sections.length);
    });

    it('should collapse sections when Collapse all button is pressed', () => {
      const { container } = renderOrganizationIntegrationView();

      user.click(screen.getByText('stripes-components.collapseAll'));

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'false')
          .length,
      ).toBe(sections.length);
    });
  });

  describe('Actions', () => {
    it('should open remove confirmation', () => {
      renderOrganizationIntegrationView();

      user.click(screen.getByTestId('remove-integration-action'));

      expect(screen.getByText('ui-organizations.integration.confirmation.heading')).toBeInTheDocument();
    });

    it('should open form', () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderOrganizationIntegrationView();

      user.click(screen.getByTestId('edit-integration-action'));

      expect(pushMock).toHaveBeenCalledWith({
        pathname: `/organizations/${orgId}/integration/${integrationConfig.id}/edit`,
        search: '',
      });
    });
  });

  describe('Shortcuts', () => {
    beforeEach(() => {
      HasCommand.mockClear();
      expandAllSections.mockClear();
      collapseAllSections.mockClear();
    });

    it('should call expandAllSections when expandAllSections shortcut is called', async () => {
      expandAllSections.mockClear();
      renderOrganizationIntegrationView();

      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'expandAllSections').handler();

      expect(expandAllSections).toHaveBeenCalled();
    });

    it('should call collapseAllSections when collapseAllSections shortcut is called', () => {
      collapseAllSections.mockClear();
      renderOrganizationIntegrationView();

      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'collapseAllSections').handler();

      expect(collapseAllSections).toHaveBeenCalled();
    });

    it('should navigate to form when edit shortcut is called', () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderOrganizationIntegrationView();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'edit').handler();

      expect(pushMock).toHaveBeenCalledWith({
        pathname: `/organizations/${orgId}/integration/${integrationConfig.id}/edit`,
        search: '',
      });
    });

    it('should navigate to list view when search shortcut is called', () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderOrganizationIntegrationView();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'search').handler();

      expect(pushMock).toHaveBeenCalledWith(ORGANIZATIONS_ROUTE);
    });
  });

  describe('Loading pane', () => {
    it('should render loading pane', () => {
      useIntegrationConfig.mockClear().mockReturnValue({ isLoading: true });
      renderOrganizationIntegrationView();

      expect(screen.getByTestId('integration-view-loading')).toBeInTheDocument();
    });
  });
});
