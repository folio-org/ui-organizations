import React from 'react';
import { render } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
  HasCommand,
} from '@folio/stripes/components';

import { orgInterface } from 'fixtures';

import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import EditInterface from './EditInterface';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
}));
jest.mock('@folio/stripes-components/lib/Commander', () => ({
  HasCommand: jest.fn(({ children }) => <div>{children}</div>),
}));

const defaultProps = {
  onSubmit: jest.fn(),
  initialValues: orgInterface,
  onClose: jest.fn(),
  paneTitle: orgInterface.firstName,
};
const renderEditInterface = (props = defaultProps) => render(
  <EditInterface {...props} />,
  { wrapper: MemoryRouter },
);

describe('EditContact', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct form structure', () => {
    const { asFragment } = renderEditInterface();

    expect(asFragment()).toMatchSnapshot();
  });

  describe('Shortcuts', () => {
    beforeEach(() => {
      HasCommand.mockClear();
    });

    it('should cancel form when cancel shortcut is called', () => {
      renderEditInterface();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'cancel').handler();

      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('should navigate to list view when search shortcut is called', () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderEditInterface();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'search').handler();

      expect(pushMock).toHaveBeenCalledWith(ORGANIZATIONS_ROUTE);
    });
  });
});
