import { Form } from 'react-final-form';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import { useStripes } from '@folio/stripes/core';

import { NumberGeneratorSettingsForm } from './NumberGeneratorSettingsForm';

jest.mock('@folio/stripes/core', () => ({
  useStripes: jest.fn(),
}));

jest.mock('@folio/stripes/smart-components', () => ({
  ConfigManager: jest.fn(({ children }) => <div>{children}</div>),
}));

const stripesMock = {
  connect: jest.fn((component) => component),
};

const renderComponent = () => render(
  <Form
    component={NumberGeneratorSettingsForm}
    onSubmit={jest.fn()}
  />,
);

describe('NumberGeneratorSettingsForm', () => {
  beforeEach(() => {
    useStripes.mockReturnValue(stripesMock);
  });

  it('should render the component', () => {
    renderComponent();

    expect(screen.getByText('ui-organizations.settings.numberGeneratorOptions.info')).toBeInTheDocument();
    expect(
      screen.getByLabelText('ui-organizations.settings.numberGeneratorOptions.useTextFieldForVendor'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('ui-organizations.settings.numberGeneratorOptions.useBothForVendor'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('ui-organizations.settings.numberGeneratorOptions.useGeneratorForVendor'),
    ).toBeInTheDocument();
  });
});
