import { render, screen, act } from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';
import { useOkapiKy } from '@folio/stripes/core';

import BankingInformationSettings from './BankingInformationSettings';

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQueryClient: jest.fn(() => ({
    invalidateQueries: jest.fn(),
  })),
}));

jest.mock('../hooks/useBankingInformation', () => ({
  useBankingInformation: jest.fn(() => ({ isLoading: false, enabled: false })),
}));

const renderBankingInformationSettings = () => render(
  <BankingInformationSettings />,
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

  it('should save banking options', async () => {
    const mockPutMethod = jest.fn(() => ({
      json: () => Promise.resolve('ok'),
    }));

    useOkapiKy
      .mockClear()
      .mockReturnValue({
        put: mockPutMethod,
      });

    renderBankingInformationSettings();

    const enabledButton = screen.getByText('ui-organizations.settings.bankingInformation.enabled');
    const saveButton = screen.getByText('ui-organizations.settings.accountTypes.save.button');

    await act(async () => {
      await user.click(enabledButton);
      await user.click(saveButton);
    });

    expect(mockPutMethod).toHaveBeenCalled();
  });
});
