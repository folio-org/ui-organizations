import { MemoryRouter } from 'react-router-dom';

import {
  act,
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';
import { useOkapiKy } from '@folio/stripes/core';

import { useBankingInformationSettings } from '../../common/hooks';
import BankingInformationSettings from './BankingInformationSettings';

const mockRefetch = jest.fn();

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  Loading: () => <div>Loading</div>,
}));

jest.mock('../hooks', () => ({
  useBankingInformationSettings: jest.fn(() => ({
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

    const checkbox = screen.getByRole('checkbox', { name: 'ui-organizations.settings.bankingInformation.enable' });
    const saveButton = screen.getByText('ui-organizations.settings.accountTypes.save.button');

    await act(async () => {
      await user.click(checkbox);
      await user.click(saveButton);
    });

    expect(mockPutMethod).toHaveBeenCalled();
  });
});
