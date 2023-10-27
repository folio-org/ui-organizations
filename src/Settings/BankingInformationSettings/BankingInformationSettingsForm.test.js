import { render, screen, act } from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import BankingInformationSettingsForm from './BankingInformationSettingsForm';

const mockOnSubmit = jest.fn();

const DEFAULT_PROPS = {
  onSubmit: mockOnSubmit,
  initialValues: {
    value: true,
  },
};

const renderBankingInformationSettingsForm = (props = DEFAULT_PROPS) => render(
  <BankingInformationSettingsForm {...props} />,
  { wrapper: MemoryRouter },
);

describe('BankingInformationSettingsForm component', () => {
  it('should display radio buttons', async () => {
    renderBankingInformationSettingsForm();

    expect(screen.getByText('ui-organizations.settings.bankingInformation.enabled')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.settings.bankingInformation.disabled')).toBeInTheDocument();
  });

  it('should save banking options', async () => {
    renderBankingInformationSettingsForm();

    const disabledButton = screen.getByText('ui-organizations.settings.bankingInformation.disabled');
    const saveButton = screen.getByText('ui-organizations.settings.accountTypes.save.button');

    await act(async () => {
      await user.click(disabledButton);
      await user.click(saveButton);
    });

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
