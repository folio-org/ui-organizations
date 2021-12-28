import {
  useMutation,
} from 'react-query';
import { cloneDeep } from 'lodash';

import { useOkapiKy } from '@folio/stripes/core';

export const useIntegrationConfigMutation = (options = {}) => {
  const ky = useOkapiKy();

  const { mutateAsync } = useMutation({
    mutationFn: (integrationConfig) => {
      const json = cloneDeep(integrationConfig);
      const scheduleParameters = json
        .exportTypeSpecificParameters
        ?.vendorEdiOrdersExportConfig
        ?.ediSchedule
        ?.scheduleParameters;

      if (scheduleParameters?.weekDays) {
        scheduleParameters.weekDays = Object.keys(scheduleParameters.weekDays)
          .filter(weekDay => scheduleParameters.weekDays[weekDay]);
      }

      const kyMethod = integrationConfig.id ? 'put' : 'post';
      const kyPath = integrationConfig.id
        ? `data-export-spring/configs/${integrationConfig.id}`
        : 'data-export-spring/configs';

      return ky[kyMethod](kyPath, { json });
    },
    ...options,
  });

  return {
    saveIntegrationConfig: mutateAsync,
  };
};
