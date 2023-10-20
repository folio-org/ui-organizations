import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { screen, render } from '@folio/jest-config-stripes/testing-library/react';

import SettingsPage from './SettingsPage';
import { useBankingInformation } from './hooks';

jest.mock('@folio/stripes/core');
jest.mock('@folio/stripes/smart-components');

jest.mock('./hooks', () => ({
  useBankingInformation: jest.fn(() => ({
    isLoading: false,
    enabled: false,
  })),
}));

const stripesMock = {
  connect: component => component,
  hasPerm: jest.fn(() => true),
};

const defaultProps = {
  stripes: stripesMock,
  match: {
    path: 'url',
  },
  location: {
    search: '?name=test',
    pathname: '',
  },
};

const renderSettingsPage = (props) => render(
  <MemoryRouter>
    <SettingsPage {...defaultProps} {...props} />
  </MemoryRouter>,
);

describe('SettingsPage', () => {
  it('should return categories, types and banking information links', async () => {
    renderSettingsPage();

    expect(screen.getByText('ui-organizations.settings.categories')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.settings.types')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.settings.bankingInformation')).toBeInTheDocument();
  });

  it('should return banking account types link', async () => {
    useBankingInformation.mockReturnValue({
      isLoading: false,
      enabled: true,
    });

    renderSettingsPage();

    expect(screen.getByText('ui-organizations.settings.bankingAccountTypes')).toBeInTheDocument();
  });
});
