import { MemoryRouter } from 'react-router-dom';

import {
  act,
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';

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

    expect(screen.getByLabelText('ui-organizations.settings.bankingInformation')).toBeInTheDocument();
  });

  it('should save banking options', async () => {
    renderBankingInformationSettingsForm();

    const checkbox = screen.getByRole('checkbox', { name: 'ui-organizations.settings.bankingInformation.enable' });
    const saveButton = screen.getByText('ui-organizations.settings.accountTypes.save.button');

    await act(async () => {
      await user.click(checkbox);
      await user.click(saveButton);
    });

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
