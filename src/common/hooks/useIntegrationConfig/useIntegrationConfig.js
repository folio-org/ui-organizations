import { useQuery } from 'react-query';
import moment from 'moment-timezone';

import {
  useNamespace,
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';

import { SCHEDULE_PERIODS } from '../../../OrganizationIntegration/constants';

export const useIntegrationConfig = (id) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'organization-integration' });
  const stripes = useStripes();

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

      if (scheduleParameters?.schedulePeriod === SCHEDULE_PERIODS.days && scheduleParameters?.schedulingDate) {
        const tenantDate = moment.tz(scheduleParameters.schedulingDate, stripes.timezone).format();

        scheduleParameters.scheduleTime = tenantDate.slice(11, 19);
      }

      if (scheduleParameters?.scheduleTime) {
        scheduleParameters.scheduleTime = `${scheduleParameters.scheduleTime}.000Z`;
      }

      return responseData;
    },
  );

  return ({
    integrationConfig: data,
    isFetching,
  });
};
