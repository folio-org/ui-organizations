import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
  HasCommand,
} from '@folio/stripes/components';

import { organization } from '../../../test/jest/fixtures';

import {
  ORGANIZATIONS_ROUTE,
} from '../../common/constants';
import OrganizationsList from './OrganizationsList';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
}));
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

jest.mock('../OrganizationDetails', () => ({
  OrganizationDetailsContainer: jest.fn().mockReturnValue('OrganizationDetailsContainer'),
}));
jest.mock('./OrganizationsListFilter', () => jest.fn().mockReturnValue('OrganizationsListFilter'));

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
  });

  describe('Shortcuts', () => {
    beforeEach(() => {
      HasCommand.mockClear();
    });

    it('should navigate to list view when search shortcut is called', () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderOrganizationsList();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'new').handler();

      expect(pushMock).toHaveBeenCalledWith(`${ORGANIZATIONS_ROUTE}/create`);
    });
  });
});
