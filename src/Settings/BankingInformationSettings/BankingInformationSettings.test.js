import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import BankingInformationSettings from './BankingInformationSettings';
import { useBankingInformation } from '../hooks';

const mockRefetch = jest.fn();

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  Loading: () => <div>Loading</div>,
}));

jest.mock('../hooks', () => ({
  useBankingInformation: jest.fn(() => ({
    isLoading: false,
    enabled: false,
    refetch: mockRefetch,
  })),
}));

const renderBankingInformationSettings = () => render(
  <BankingInformationSettings />,
  { wrapper: MemoryRouter },
);

describe('BankingInformationSettings component', () => {
  it('should display pane headings', () => {
    renderBankingInformationSettings();

    const paneTitle = screen.getAllByText('ui-organizations.settings.bankingInformation');

    expect(paneTitle).toHaveLength(2);
  });

  it('should display radio buttons', async () => {
    renderBankingInformationSettings();

    expect(screen.getByText('ui-organizations.settings.bankingInformation.enabled')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.settings.bankingInformation.disabled')).toBeInTheDocument();
  });

  it('should render Loading component', () => {
    useBankingInformation.mockReturnValue({
      isLoading: true,
      enabled: false,
    });

    renderBankingInformationSettings();

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
