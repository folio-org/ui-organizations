import React from 'react';
import { render, screen } from '@testing-library/react';

import { orgInterface } from '../../../test/jest/fixtures';
import { history, match } from '../../../test/jest/routerMocks';

import saveInterface from './saveInterface';
import EditInterface from './EditInterface';
import { EditInterfaceContainer } from './EditInterfaceContainer';

jest.mock('./saveInterface', () => jest.fn());
jest.mock('./EditInterface', () => jest.fn().mockReturnValue('EditInterface'));

const historyMock = {
  ...history,
  push: jest.fn(),
};
const defaultProps = {
  match,
  history: historyMock,
  mutator: {
    interfaceCredentials: {
      GET: jest.fn().mockReturnValue(Promise.resolve({ username: 'Mark' })),
    },
  },
  orgId: 'orgId',
  resources: {
    vendorInterface: { records: [orgInterface] },
  },
  stripes: {},
};
const renderEditInterfaceContainer = (props = defaultProps) => render(
  <EditInterfaceContainer {...props} />,
);

describe('EditInterfaceContainer', () => {
  beforeEach(() => {
    EditInterface.mockClear();
  });

  it('should display EditInterface', async () => {
    renderEditInterfaceContainer();

    await screen.findByText('EditInterface');

    expect(screen.getByText('EditInterface')).toBeDefined();
  });

  it('should redirect back when form is closed', async () => {
    historyMock.push.mockClear();
    renderEditInterfaceContainer();

    await screen.findByText('EditInterface');

    EditInterface.mock.calls[0][0].onClose();

    expect(historyMock.push).toHaveBeenCalledWith('/organizations/orgId/interface/id/view');
  });

  it('should save interface', async () => {
    saveInterface.mockClear().mockReturnValue(Promise.resolve());
    renderEditInterfaceContainer();

    await screen.findByText('EditInterface');

    EditInterface.mock.calls[0][0].onSubmit({});

    expect(saveInterface).toHaveBeenCalled();
  });
});
