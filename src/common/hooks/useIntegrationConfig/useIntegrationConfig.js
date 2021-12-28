import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

export const useIntegrationConfig = (id) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'organization-integration' });

  const { isFetching, data = {} } = useQuery(
    [namespace, id],
    async () => {
      const responseData = await ky.get(`data-export-spring/configs/${id}`).json();
      const scheduleParameters = responseData
        .exportTypeSpecificParameters
        ?.vendorEdiOrdersExportConfig
        ?.ediSchedule
        ?.scheduleParameters;

      if (scheduleParameters?.weekDays) {
        scheduleParameters.weekDays = scheduleParameters.weekDays.reduce((acc, weekDay) => ({
          ...acc,
          [weekDay]: true,
        }), {});
      }

      return responseData;
    },
  );

  return ({
    integrationConfig: data,
    isFetching,
  });
};
