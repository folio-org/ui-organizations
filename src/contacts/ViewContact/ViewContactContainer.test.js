import React from 'react';
import { render, screen } from '@testing-library/react';

import { match, history } from '../../../test/jest/routerMocks';

import { DICT_CATEGORIES } from '../../common/constants';
import ViewContact from './ViewContact';
import { ViewContactContainer } from './ViewContactContainer';

jest.mock('../../common/utils', () => ({ getResourceDataItem: jest.fn() }));
jest.mock('./ViewContact', () => jest.fn(() => 'ViewContact'));

const historyMock = {
  ...history,
  push: jest.fn(),
};
const defaultProps = {
  orgId: 'orgId',
  baseUrl: '/contact',
  mutator: {},
  resources: {
    contact: { isPending: false },
    [DICT_CATEGORIES]: { records: [] },
  },
  match,
  history: historyMock,
  showMessage: jest.fn(),
};
const renderViewContactContainer = (props = defaultProps) => render(
  <ViewContactContainer {...props} />,
);

describe('ViewContactContainer', () => {
  it('should display spinner when contact is loading', async () => {
    renderViewContactContainer({ ...defaultProps, resources: { contact: { isPending: true } } });

    await screen.findByText('Icon');

    expect(screen.getByText('Icon')).toBeDefined();
  });

  it('should display ViewContact', async () => {
    renderViewContactContainer();

    await screen.findByText('ViewContact');

    expect(screen.getByText('ViewContact')).toBeDefined();
  });

  describe('Actions', () => {
    it('should navigate back when close action is called', () => {
      renderViewContactContainer();
      ViewContact.mock.calls[0][0].onClose();

      expect(historyMock.push).toHaveBeenCalledWith('/organizations/orgId/edit');
    });
  });
});
