import user from '@folio/jest-config-stripes/testing-library/user-event';
import { act, screen, render, waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
  HasCommand,
} from '@folio/stripes/components';

import { organization } from 'fixtures';

import {
  ORGANIZATIONS_ROUTE,
} from '../../common/constants';
import OrganizationsList from './OrganizationsList';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
}));
jest.mock('react-virtualized-auto-sizer', () => jest.fn(
  (props) => <div>{props.children({ width: 123 })}</div>,
));
jest.mock('@folio/stripes/smart-components', () => ({
  ...jest.requireActual('@folio/stripes/smart-components'),
  // eslint-disable-next-line react/prop-types
  PersistedPaneset: (props) => <div>{props.children}</div>,
}));
jest.mock('@folio/stripes-components/lib/Commander', () => ({
  HasCommand: jest.fn(({ children }) => <div>{children}</div>),
}));
jest.mock('@folio/stripes-acq-components', () => {
  return {
    ...jest.requireActual('@folio/stripes-acq-components'),
    useFiltersToogle: jest.fn().mockReturnValue({ isFiltersOpened: true, toggleFilters: jest.fn() }),
    ResetButton: () => <span>ResetButton</span>,
    SingleSearchForm: () => <span>SingleSearchForm</span>,
    useItemToView: () => ({}),
  };
});
jest.mock('@folio/plugin-find-organization', () => ({
  ...jest.requireActual('@folio/plugin-find-organization'),
  OrganizationsListFilter: jest.fn(() => 'OrganizationsListFilter'),
}));

jest.mock('../OrganizationDetails', () => ({
  OrganizationDetailsContainer: jest.fn().mockReturnValue('OrganizationDetailsContainer'),
}));

const defaultProps = {
  onNeedMoreData: jest.fn(),
  resetData: jest.fn(),
  refreshList: jest.fn(),
  organizationsCount: 1,
  organizations: [organization],
  isLoading: false,
};
const renderOrganizationsList = (props = defaultProps) => (render(
  <OrganizationsList {...props} />,
  { wrapper: MemoryRouter },
));

describe('OrganizationsList', () => {
  describe('Filters section', () => {
    it('should display search control', () => {
      const { getByText } = renderOrganizationsList();

      expect(getByText('SingleSearchForm')).toBeDefined();
    });

    it('should display reset filters control', () => {
      const { getByText } = renderOrganizationsList();

      expect(getByText('ResetButton')).toBeDefined();
    });

    it('should display org filters', () => {
      const { getByText } = renderOrganizationsList();

      expect(getByText('OrganizationsListFilter')).toBeDefined();
    });

    it('should display org results list', async () => {
      const { getByText } = renderOrganizationsList();

      screen.debug(undefined, 200000);
      const orgName = await screen.findByText(defaultProps.organizations[0].name);

      expect(orgName).toBeInTheDocument();

      await act(async () => {
        await user.click(orgName);
      });

      expect(getByText('ui-organizations.main.name')).toBeInTheDocument();
      expect(getByText('ui-organizations.main.code')).toBeInTheDocument();
      expect(getByText('ui-organizations.main.vendorStatus')).toBeInTheDocument();
    });
  });

  describe('Shortcuts', () => {
    beforeEach(() => {
      HasCommand.mockClear();
    });

    it('should navigate to list view when search shortcut is called', async () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderOrganizationsList();
      HasCommand.mock.calls[0]?.[0].commands.find(c => c.name === 'new').handler();

      await waitFor(() => expect(pushMock).toHaveBeenCalledWith(`${ORGANIZATIONS_ROUTE}/create`));
    });
  });
});
