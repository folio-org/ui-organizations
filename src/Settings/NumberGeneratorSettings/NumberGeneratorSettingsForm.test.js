import { MemoryRouter } from 'react-router-dom';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import NumberGeneratorSettingsForm from './NumberGeneratorSettingsForm';
import {
  NUMBER_GENERATOR_OPTIONS_OFF,
  NUMBER_GENERATOR_OPTIONS_ONEDITABLE,
  VENDOR_CODE_GENERATOR_SETTINGS_KEY,
} from '../../common/constants/numberGenerator';

jest.mock('@folio/stripes/core', () => ({
  useStripes: jest.fn(),
}));

const onSubmitMock = jest.fn();

const renderComponent = () => render(
  <NumberGeneratorSettingsForm
    initialValues={{ [VENDOR_CODE_GENERATOR_SETTINGS_KEY]: NUMBER_GENERATOR_OPTIONS_ONEDITABLE }}
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
    expect(screen.getByRole('combobox', { name: 'ui-organizations.settings.numberGeneratorOptions.code' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'stripes-core.button.save' })).toBeDisabled();
  });

  it('should call onSubmit with correct values', async () => {
    renderComponent();

    const codeSelect = screen.getByRole('combobox', { name: 'ui-organizations.settings.numberGeneratorOptions.code' });
    const saveButton = screen.getByRole('button', { name: 'stripes-core.button.save' });

    await userEvent.selectOptions(codeSelect, ['ui-organizations.settings.numberGeneratorOptions.off']);
    expect(saveButton).toBeEnabled();

    await userEvent.click(saveButton);
    expect(onSubmitMock).toHaveBeenCalledWith({
      [VENDOR_CODE_GENERATOR_SETTINGS_KEY]: NUMBER_GENERATOR_OPTIONS_OFF,
    });
  });
});
