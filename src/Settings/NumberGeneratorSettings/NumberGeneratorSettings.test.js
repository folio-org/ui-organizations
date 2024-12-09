import { FormattedMessage } from 'react-intl';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';
import { useOkapiKy } from '@folio/stripes/core';
import { useShowCallout } from '@folio/stripes-acq-components';

import NumberGeneratorSettings from './NumberGeneratorSettings';
import { SETTINGS_API } from '../../common/constants/api';
import { useVendorCodeGeneratorSettings } from '../../common/hooks/useVendorCodeGeneratorSettings';

jest.mock('@folio/stripes/core', () => ({
  useOkapiKy: jest.fn(),
}));

jest.mock('@folio/stripes-acq-components', () => ({
  useShowCallout: jest.fn(),
}));

jest.mock('../../common/hooks/useVendorCodeGeneratorSettings');

jest.mock('@folio/stripes/components', () => ({
  Loading: () => <div>Loading</div>,
}));

jest.mock('../../common/constants/numberGenerator', () => ({
  ...jest.requireActual('../../common/constants/numberGenerator'),
  VENDOR_CODE_GENERATOR_SETTINGS_KEY: 'testKey',
}));

jest.mock('./NumberGeneratorSettingsForm', () => jest.fn(({ onSubmit }) => (
  <button
    onClick={() => onSubmit({
      testKey: 'testValue',
    })}
    type="button"
  >
    Submit
  </button>
)));

const renderComponent = () => render(<NumberGeneratorSettings />);

describe('NumberGeneratorSettings', () => {
  const mockKyPut = jest.fn();
  const mockKyPost = jest.fn();
  const mockSendCallout = jest.fn();

  beforeEach(() => {
    useOkapiKy.mockReturnValue({
      put: mockKyPut,
      post: mockKyPost,
    });
    useShowCallout.mockReturnValue(mockSendCallout);
  });

  it('should render Loading', () => {
    useVendorCodeGeneratorSettings.mockReturnValue({ isLoading: true });
    renderComponent();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should render NumberGeneratorSettingsForm', () => {
    useVendorCodeGeneratorSettings.mockReturnValue({ isLoading: false });
    renderComponent();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should call ky.post when no setting is present', async () => {
    useVendorCodeGeneratorSettings.mockReturnValue({ isLoading: false });
    renderComponent();

    await userEvent.click(screen.getByText('Submit'));

    expect(mockKyPost).toHaveBeenCalledWith(SETTINGS_API, {
      json: { key: 'testKey', value: 'testValue' },
    });
    expect(mockSendCallout).toHaveBeenCalledWith({
      message: <FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.save.success" />,
    });
  });

  it('should call ky.put when setting exists', async () => {
    const vendorCodeSetting = { id: '123', key: 'testKey', value: 'someValue', _version: 1 };

    useVendorCodeGeneratorSettings.mockReturnValue({
      isLoading: false,
      vendorCodeSetting,
    });
    renderComponent();

    await userEvent.click(screen.getByText('Submit'));

    expect(mockKyPut).toHaveBeenCalledWith(`${SETTINGS_API}/${vendorCodeSetting.id}`, {
      json: { ...vendorCodeSetting, value: 'testValue' },
    });
    expect(mockSendCallout).toHaveBeenCalledWith({
      message: <FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.save.success" />,
    });
  });

  it('should show error callout when submission fails', async () => {
    useVendorCodeGeneratorSettings.mockReturnValue({ isLoading: false });
    mockKyPost.mockRejectedValue(new Error());
    renderComponent();

    await userEvent.click(screen.getByText('Submit'));

    expect(mockSendCallout).toHaveBeenCalledWith({
      type: 'error',
      message: <FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.save.error" />,
    });
  });
});
