import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';
import { useOkapiKy } from '@folio/stripes/core';

import { useBankingInformationSettings } from '../../common/hooks';
import BankingInformationSettings from './BankingInformationSettings';

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  Loading: () => <div>Loading</div>,
}));

jest.mock('../../common/hooks', () => ({
  ...jest.requireActual('../../common/hooks'),
  useBankingInformationSettings: jest.fn(),
}));

const renderBankingInformationSettings = () => render(
  <BankingInformationSettings />,
  { wrapper: MemoryRouter },
);

const mockRefetch = jest.fn();
const bankingInformation = { id: 'banking-information-id' };

describe('BankingInformationSettings component', () => {
  beforeEach(() => {
    useBankingInformationSettings
      .mockClear()
      .mockReturnValue({
        isLoading: false,
        enabled: false,
        refetch: mockRefetch,
      });
  });

  it('should display pane headings', () => {
    renderBankingInformationSettings();

    const paneTitle = screen.getByText('ui-organizations.settings.bankingInformation');
    const checkboxLabel = screen.getByText('ui-organizations.settings.bankingInformation.enable');

    expect(paneTitle).toBeInTheDocument();
    expect(checkboxLabel).toBeInTheDocument();
  });

  it('should render Loading component', () => {
    useBankingInformationSettings.mockReturnValue({
      isLoading: true,
      enabled: false,
    });

    renderBankingInformationSettings();

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should save banking options', async () => {
    useBankingInformationSettings.mockClear().mockReturnValue({
      bankingInformation,
      isLoading: false,
      enabled: true,
      refetch: mockRefetch,
    });
    const mockPutMethod = jest.fn(() => ({
      json: () => Promise.resolve('ok'),
    }));

    useOkapiKy
      .mockClear()
      .mockReturnValue({
        put: mockPutMethod,
      });

    renderBankingInformationSettings();

    await user.click(await screen.findByRole('checkbox', { name: 'ui-organizations.settings.bankingInformation.enable' }));
    await user.click(await screen.findByRole('button', { name: 'ui-organizations.settings.accountTypes.save.button' }));

    expect(mockPutMethod).toHaveBeenCalled();
  });
});
