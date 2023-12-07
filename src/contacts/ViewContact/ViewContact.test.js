import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
  HasCommand,
  expandAllSections,
  collapseAllSections,
} from '@folio/stripes/components';

import { contact } from 'fixtures';
import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import ViewContact from './ViewContact';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
}));
jest.mock('@folio/stripes-components/lib/Commander', () => ({
  HasCommand: jest.fn(({ children }) => <div>{children}</div>),
  expandAllSections: jest.fn(),
  collapseAllSections: jest.fn(),
}));

const pushMock = jest.fn();
const defaultProps = {
  categories: [{ value: 'Customer Service', id: 'f52ceea4-8e35' }],
  contact,
  editUrl: '/contact/edit',
  onClose: jest.fn(),
  unassign: jest.fn(),
  deleteContact: jest.fn(),
};
const renderViewContact = (props = defaultProps) => render(
  <ViewContact {...props} />,
  { wrapper: MemoryRouter },
);

describe('ViewContact', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
    useHistory.mockClear().mockReturnValue({
      push: pushMock,
      location: {
        pathname: '/contacts/view/123',
      },
    });
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct structure', () => {
    const { container, asFragment } = renderViewContact();

    container.querySelector('#view-contact-accordion-set').removeAttribute('aria-multiselectable');

    expect(asFragment()).toMatchSnapshot();
  });

  describe('Actions', () => {
    it('should call unassign prop when unassign action is pressed', async () => {
      const unassign = jest.fn();

      renderViewContact({
        ...defaultProps,
        unassign,
      });

      await user.click(screen.getByTestId('unassign-contact'));

      expect(unassign).toHaveBeenCalled();
    });

    it('should call deleteContact prop when delete action is pressed', async () => {
      const deleteContact = jest.fn();

      renderViewContact({
        ...defaultProps,
        deleteContact,
      });

      await user.click(screen.getByTestId('delete-contact'));

      expect(deleteContact).toHaveBeenCalled();
    });
  });

  describe('Shortcuts', () => {
    beforeEach(() => {
      HasCommand.mockClear();
      expandAllSections.mockClear();
      collapseAllSections.mockClear();
    });

    it('should call expandAllSections when expandAllSections shortcut is called', () => {
      renderViewContact();

      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'expandAllSections').handler();

      expect(expandAllSections).toHaveBeenCalled();
    });

    it('should call collapseAllSections when collapseAllSections shortcut is called', () => {
      renderViewContact();

      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'collapseAllSections').handler();

      expect(collapseAllSections).toHaveBeenCalled();
    });

    it('should navigate to edit view when edit shortcut is called', () => {
      renderViewContact();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'edit').handler();

      expect(pushMock).toHaveBeenCalledWith(defaultProps.editUrl);
    });

    it('should navigate to list view when search shortcut is called', () => {
      renderViewContact();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'search').handler();

      expect(pushMock).toHaveBeenCalledWith(ORGANIZATIONS_ROUTE);
    });
  });
});
