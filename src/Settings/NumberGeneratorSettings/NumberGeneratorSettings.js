import { FormattedMessage } from 'react-intl';

import { Loading } from '@folio/stripes/components';
import { useOkapiKy } from '@folio/stripes/core';
import { useShowCallout } from '@folio/stripes-acq-components';

import NumberGeneratorSettingsForm from './NumberGeneratorSettingsForm';
import { SETTINGS_API } from '../../common/constants/api';
import { VENDOR_CODE_GENERATOR_SETTINGS_KEY } from '../../common/constants/numberGenerator';
import { useVendorCodeGeneratorSettings } from '../../common/hooks/useVendorCodeGeneratorSettings';

const NumberGeneratorSettings = () => {
  const { vendorCodeSetting, isLoading } = useVendorCodeGeneratorSettings();
  const ky = useOkapiKy();
  const sendCallout = useShowCallout();

  const onSubmit = async ({ [VENDOR_CODE_GENERATOR_SETTINGS_KEY]: value }) => {
    try {
      if (vendorCodeSetting) {
        await ky.put(`${SETTINGS_API}/${vendorCodeSetting.id}`, {
          json: { ...vendorCodeSetting, value },
        });
      } else {
        await ky.post(SETTINGS_API, {
          json: { key: VENDOR_CODE_GENERATOR_SETTINGS_KEY, value },
        });
      }

      sendCallout({
        message: <FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.save.success" />,
      });
    } catch (error) {
      sendCallout({
        type: 'error',
        message: <FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.save.error" />,
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NumberGeneratorSettingsForm
      initialValues={{ [VENDOR_CODE_GENERATOR_SETTINGS_KEY]: vendorCodeSetting?.value }}
      onSubmit={onSubmit}
    />
  );
};

export default NumberGeneratorSettings;
