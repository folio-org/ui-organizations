import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';

import { SETTINGS_API } from '../../constants/api';
import {
  NUMBER_GENERATOR_INTERFACE_NAME,
  NUMBER_GENERATOR_INTERFACE_VERSION,
  NUMBER_GENERATOR_OPTIONS_OFF,
  NUMBER_GENERATOR_OPTIONS_ONEDITABLE,
  NUMBER_GENERATOR_OPTIONS_ONNOTEDITABLE,
  VENDOR_CODE_GENERATOR_SETTINGS_KEY,
} from '../../constants/numberGenerator';

export const useVendorCodeGeneratorSettings = () => {
  const ky = useOkapiKy();
  const stripes = useStripes();
  const enabled = Boolean(stripes.hasInterface(NUMBER_GENERATOR_INTERFACE_NAME, NUMBER_GENERATOR_INTERFACE_VERSION));
  const [namespace] = useNamespace({ key: VENDOR_CODE_GENERATOR_SETTINGS_KEY });

  const searchParams = {
    query: `key==${VENDOR_CODE_GENERATOR_SETTINGS_KEY}`,
    limit: 1,
  };
  const queryFn = ({ signal }) => ky.get(SETTINGS_API, { searchParams, signal }).json();
  const { data, isFetching, isLoading, refetch } = useQuery([namespace], queryFn, { enabled });

  const vendorCodeSetting = data?.settings?.[0];
  const settingValue = vendorCodeSetting?.value;

  return {
    vendorCodeSetting,
    isUseGenerator: settingValue === NUMBER_GENERATOR_OPTIONS_ONNOTEDITABLE,
    isUseTextField: settingValue === NUMBER_GENERATOR_OPTIONS_OFF,
    isUseBoth: settingValue === NUMBER_GENERATOR_OPTIONS_ONEDITABLE,
    enabled,
    isFetching,
    isLoading,
    refetch,
  };
};
