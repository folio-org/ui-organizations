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
  it('should render component', async () => {
    renderBankingInformationSettingsForm();

    expect(screen.getAllByLabelText('ui-organizations.settings.bankingInformation')).toHaveLength(2);
  });

  it('should save banking options', async () => {
    renderBankingInformationSettingsForm();

    const checkbox = screen.getByRole('checkbox', { name: 'ui-organizations.settings.bankingInformation' });
    const saveButton = screen.getByText('ui-organizations.settings.accountTypes.save.button');

    await act(async () => {
      await user.click(checkbox);
      await user.click(saveButton);
    });

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
