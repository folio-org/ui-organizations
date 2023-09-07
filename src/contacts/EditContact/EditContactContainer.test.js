import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import { contact } from 'fixtures';
import { history, match } from '../../../test/jest/routerMocks';

import { DICT_CATEGORIES } from '../../common/constants';

import { saveContact } from './util';
import EditContact from './EditContact';
import { EditContactContainer } from './EditContactContainer';

jest.mock('./util', () => ({
  saveContact: jest.fn(),
}));
jest.mock('./EditContact', () => jest.fn().mockReturnValue('EditContact'));

const historyMock = {
  ...history,
  push: jest.fn(),
};
const defaultProps = {
  match,
  history: historyMock,
  mutator: {},
  orgId: 'orgId',
  resources: {
    contact: { records: [contact] },
    [DICT_CATEGORIES]: {
      records: [{ value: 'Customer Service', id: 'f52ceea4-8e35' }],
    },
  },
  showMessage: jest.fn(),
  onClose: jest.fn(),
};
const renderEditContactContainer = (props = defaultProps) => render(
  <EditContactContainer {...props} />,
);

describe('EditContactContainer', () => {
  beforeEach(() => {
    EditContact.mockClear();
  });

  it('should display EditContact', async () => {
    renderEditContactContainer();

    await screen.findByText('EditContact');

    expect(screen.getByText('EditContact')).toBeDefined();
  });

  it('should display spinner when data is loading', async () => {
    renderEditContactContainer({ ...defaultProps, resources: {} });

    await screen.findByText('Icon');

    expect(screen.getByText('Icon')).toBeDefined();
  });

  it('should redirect to org details when form is closed', async () => {
    defaultProps.onClose.mockClear();
    renderEditContactContainer();

    await screen.findByText('EditContact');

    EditContact.mock.calls[0][0].onClose();

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should save organization', async () => {
    saveContact.mockClear().mockReturnValue(Promise.resolve());

    renderEditContactContainer();

    await screen.findByText('EditContact');

    EditContact.mock.calls[0][0].onSubmit({});

    expect(saveContact).toHaveBeenCalled();
  });
});
