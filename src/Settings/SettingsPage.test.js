import { MemoryRouter } from 'react-router-dom';

import { screen, render } from '@folio/jest-config-stripes/testing-library/react';

import { useBankingInformationSettings } from '../common/hooks';
import SettingsPage from './SettingsPage';

jest.mock('@folio/stripes/core');
jest.mock('@folio/stripes/smart-components');

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  Loading: () => <div>Loading</div>,
}));
jest.mock('../common/hooks', () => ({
  ...jest.requireActual('../common/hooks'),
  useBankingInformationSettings: jest.fn(() => ({
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
    useBankingInformationSettings.mockReturnValue({
      isLoading: false,
      enabled: true,
    });

    renderSettingsPage();

    expect(screen.getByText('ui-organizations.settings.bankingAccountTypes')).toBeInTheDocument();
  });
});
