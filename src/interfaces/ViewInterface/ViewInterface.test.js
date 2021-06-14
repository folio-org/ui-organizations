import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
  HasCommand,
  expandAllSections,
  collapseAllSections,
} from '@folio/stripes/components';

import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import ViewInterface from './ViewInterface';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
}));
jest.mock('@folio/stripes-components/lib/Commander', () => ({
  HasCommand: jest.fn(({ children }) => <div>{children}</div>),
  expandAllSections: jest.fn(),
  collapseAllSections: jest.fn(),
}));
jest.mock('../../Organizations', () => ({ OrganizationInterface: () => 'OrganizationInterface' }));

const defaultProps = {
  item: { id: 'interfaceId' },
  baseUrl: '/interfaces',
  onClose: jest.fn(),
  unassign: jest.fn(),
  deleteInterface: jest.fn(),
  getCreds: jest.fn(),
};
const renderViewInterface = (props = defaultProps) => render(
  <ViewInterface {...props} />,
  { wrapper: MemoryRouter },
);

describe('ViewInterface', () => {
  it('should display OrganizationInterface', () => {
    renderViewInterface();

    expect(screen.getByText('OrganizationInterface')).toBeDefined();
  });

  describe('Actions', () => {
    it('should call unassign prop when unassign action is pressed', () => {
      const unassign = jest.fn();

      renderViewInterface({
        ...defaultProps,
        unassign,
      });

      user.click(screen.getByTestId('unassign-interface'));

      expect(unassign).toHaveBeenCalled();
    });

    it('should call deleteInterface prop when delete action is pressed', () => {
      const deleteInterface = jest.fn();

      renderViewInterface({
        ...defaultProps,
        deleteInterface,
      });

      user.click(screen.getByTestId('delete-interface'));

      expect(deleteInterface).toHaveBeenCalled();
    });
  });

  describe('Shortcuts', () => {
    beforeEach(() => {
      HasCommand.mockClear();
      expandAllSections.mockClear();
      collapseAllSections.mockClear();
    });

    it('should call expandAllSections when expandAllSections shortcut is called', () => {
      renderViewInterface();

      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'expandAllSections').handler();

      expect(expandAllSections).toHaveBeenCalled();
    });

    it('should call collapseAllSections when collapseAllSections shortcut is called', () => {
      renderViewInterface();

      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'collapseAllSections').handler();

      expect(collapseAllSections).toHaveBeenCalled();
    });

    it('should navigate to edit view when edit shortcut is called', () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderViewInterface();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'edit').handler();

      expect(pushMock).toHaveBeenCalledWith('/interfaces/interfaceId/edit');
    });

    it('should navigate to list view when search shortcut is called', () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderViewInterface();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'search').handler();

      expect(pushMock).toHaveBeenCalledWith(ORGANIZATIONS_ROUTE);
    });
  });
});
