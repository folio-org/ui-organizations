import { MemoryRouter } from 'react-router-dom';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import NumberGeneratorSettingsForm from './NumberGeneratorSettingsForm';
import {
  VENDOR_CODE_GENERATOR_OPTIONS,
  VENDOR_CODE_GENERATOR_SETTINGS_KEY,
} from '../../common/constants/numberGenerator';

jest.mock('@folio/stripes/core', () => ({
  useStripes: jest.fn(),
}));

const onSubmitMock = jest.fn();

const renderComponent = () => render(
  <NumberGeneratorSettingsForm
    initialValues={{ [VENDOR_CODE_GENERATOR_SETTINGS_KEY]: VENDOR_CODE_GENERATOR_OPTIONS.BOTH }}
    onSubmit={(values) => onSubmitMock(values)}
  />,
  { wrapper: MemoryRouter },
);

describe('NumberGeneratorSettingsForm', () => {
  it('should render the component with initial values', () => {
    renderComponent();

    expect(screen.getByText('ui-organizations.settings.numberGeneratorOptions')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.settings.numberGeneratorOptions.info')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.settings.numberGeneratorOptions.infoAdditional')).toBeInTheDocument();
    expect(
      screen.getByLabelText('ui-organizations.settings.numberGeneratorOptions.useTextFieldForVendor'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('ui-organizations.settings.numberGeneratorOptions.useBothForVendor'),
    ).toBeChecked();
    expect(
      screen.getByLabelText('ui-organizations.settings.numberGeneratorOptions.useGeneratorForVendor'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'stripes-core.button.save' })).toBeDisabled();
  });

  it('should call onSubmit with correct values', async () => {
    renderComponent();

    const textfieldRadioButton = screen.getByRole('radio', {
      name: 'ui-organizations.settings.numberGeneratorOptions.useTextFieldForVendor',
    });
    const saveButton = screen.getByRole('button', { name: 'stripes-core.button.save' });

    await userEvent.click(textfieldRadioButton);
    expect(saveButton).toBeEnabled();

    await userEvent.click(saveButton);
    expect(onSubmitMock).toHaveBeenCalledWith({
      [VENDOR_CODE_GENERATOR_SETTINGS_KEY]: VENDOR_CODE_GENERATOR_OPTIONS.TEXTFIELD,
    });
  });
});
