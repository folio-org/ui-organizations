import {
  useMutation,
} from 'react-query';
import { cloneDeep } from 'lodash';

import { useOkapiKy, useStripes } from '@folio/stripes/core';

import { SCHEDULE_PERIODS, TRANSMISSION_METHOD } from '../../../OrganizationIntegration/constants';
import { getSchedulingDatetime } from '../../../OrganizationIntegration/utils';

export const useIntegrationConfigMutation = (options = {}) => {
  const { organization, ...mutationOptions } = options;
  const ky = useOkapiKy();
  const stripes = useStripes();

  const { mutateAsync } = useMutation({
    mutationFn: (integrationConfig) => {
      const json = cloneDeep(integrationConfig);
      const kyMethod = mutationOptions.method ?? (integrationConfig.id ? 'put' : 'post');
      const vendorEdiOrdersExportConfig = json.exportTypeSpecificParameters?.vendorEdiOrdersExportConfig;

      if (vendorEdiOrdersExportConfig) {
        if (vendorEdiOrdersExportConfig.transmissionMethod === TRANSMISSION_METHOD.email) {
          // ediConfig stays: acquisition methods and account numbers apply to every method.
          delete vendorEdiOrdersExportConfig.ediFtp;
        } else {
          delete vendorEdiOrdersExportConfig.ediEmail;
        }
      }

      const scheduleParameters = vendorEdiOrdersExportConfig
        ?.ediSchedule
        ?.scheduleParameters;

      if (kyMethod !== 'delete' && vendorEdiOrdersExportConfig && organization?.name) {
        vendorEdiOrdersExportConfig.vendorName = organization.name;
      }

      if (scheduleParameters?.weekDays) {
        scheduleParameters.weekDays = Object.keys(scheduleParameters.weekDays)
          .filter(weekDay => scheduleParameters.weekDays[weekDay]);
      }

      if (scheduleParameters?.schedulePeriod === SCHEDULE_PERIODS.days && scheduleParameters?.schedulingDate) {
        scheduleParameters.schedulingDate = getSchedulingDatetime({
          date: scheduleParameters.schedulingDate,
          time: scheduleParameters.scheduleTime,
          timezone: stripes.timezone,
        });
      }

      if (scheduleParameters?.scheduleTime) {
        scheduleParameters.scheduleTime = scheduleParameters.scheduleTime.slice(0, 8);
      }

      const kyPath = integrationConfig.id
        ? `data-export-spring/configs/${integrationConfig.id}`
        : 'data-export-spring/configs';

      return ky[kyMethod](kyPath, { json });
    },
    ...mutationOptions,
  });

  return {
    mutateIntegrationConfig: mutateAsync,
  };
};
