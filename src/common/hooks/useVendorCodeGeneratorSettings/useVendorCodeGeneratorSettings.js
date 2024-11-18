import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';

import { MOD_SETTINGS_API } from '../../constants/api';
import {
  NUMBER_GENERATOR_INTERFACE_NAME,
  NUMBER_GENERATOR_INTERFACE_VERSION,
  VENDOR_CODE_GENERATOR_OPTIONS,
  VENDOR_CODE_GENERATOR_SETTINGS_KEY,
  VENDOR_CODE_GENERATOR_SETTINGS_SCOPE,
} from '../../constants/numberGenerator';

const { BOTH, TEXTFIELD, GENERATOR } = VENDOR_CODE_GENERATOR_OPTIONS;

export const useVendorCodeGeneratorSettings = () => {
  const ky = useOkapiKy();
  const stripes = useStripes();
  const enabled = !!stripes.hasInterface(NUMBER_GENERATOR_INTERFACE_NAME, NUMBER_GENERATOR_INTERFACE_VERSION);
  const [namespace] = useNamespace({ key: VENDOR_CODE_GENERATOR_SETTINGS_KEY });

  const searchParams = {
    query: `scope==${VENDOR_CODE_GENERATOR_SETTINGS_SCOPE} and key==${VENDOR_CODE_GENERATOR_SETTINGS_KEY}`,
    limit: 1,
  };
  const queryFn = () => ky.get(MOD_SETTINGS_API, { searchParams }).json();
  const { data, isFetching, isLoading } = useQuery([namespace], queryFn, { enabled });

  const settingValue = data?.items?.[0]?.value;

  return {
    isUseGenerator: settingValue === GENERATOR,
    isUseTextField: settingValue === TEXTFIELD,
    isUseBoth: settingValue === BOTH,
    enabled,
    isFetching,
    isLoading,
  };
};
