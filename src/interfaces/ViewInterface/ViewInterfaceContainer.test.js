import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import { match, history } from '../../../test/jest/routerMocks';

import { getResourceDataItem } from '../../common/utils';
import ViewInterface from './ViewInterface';
import { ViewInterfaceContainer } from './ViewInterfaceContainer';

jest.mock('../../common/utils', () => ({ getResourceDataItem: jest.fn() }));
jest.mock('./ViewInterface', () => jest.fn(() => 'ViewInterface'));

const historyMock = {
  ...history,
  push: jest.fn(),
};
const defaultProps = {
  orgId: 'orgId',
  baseUrl: '/interfaces',
  mutator: {},
  resources: {
    vendorInterface: { isPending: false },
  },
  match,
  history: historyMock,
  showMessage: jest.fn(),
};
const renderViewInterfaceContainer = (props = defaultProps) => render(
  <ViewInterfaceContainer {...props} />,
);

describe('ViewInterfaceContainer', () => {
  it('should display spinner when interface is loading', async () => {
    renderViewInterfaceContainer({ ...defaultProps, resources: { vendorInterface: { isPending: true } } });

    await screen.findByText('Icon');

    expect(screen.getByText('Icon')).toBeDefined();
  });

  it('should display ViewInterface', async () => {
    renderViewInterfaceContainer();

    await screen.findByText('ViewInterface');

    expect(screen.getByText('ViewInterface')).toBeDefined();
  });

  describe('Actions', () => {
    it('should navigate back when close action is called', () => {
      renderViewInterfaceContainer();
      ViewInterface.mock.calls[0][0].onClose();

      expect(historyMock.push).toHaveBeenCalledWith('/organizations/orgId/edit');
    });

    it('should call getResourceDataItem to get creds', () => {
      renderViewInterfaceContainer();

      ViewInterface.mock.calls[0][0].getCreds();

      expect(getResourceDataItem).toHaveBeenCalledWith(defaultProps.resources, 'interfaceCredentials');
    });
  });
});
