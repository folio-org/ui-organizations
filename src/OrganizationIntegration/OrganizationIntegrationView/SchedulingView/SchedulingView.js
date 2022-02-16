import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Accordion,
  Checkbox,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

import { FolioFormattedDate } from '@folio/stripes-acq-components';
import {
  SCHEDULE_PERIODS,
  WEEKDAYS,
} from '../../constants';
import { getTenantTime } from '../../utils';

const SchedulingView = ({ ediSchedule = {} }) => {
  const { timeZone } = useIntl();
  const isScheduleEnabled = ediSchedule.enableScheduledExport;
  const schedulePeriod = ediSchedule.scheduleParameters?.schedulePeriod;
  const schedulePeriodValue = Object.keys(SCHEDULE_PERIODS).find(key => SCHEDULE_PERIODS[key] === schedulePeriod);

  const getTime = useCallback(() => (
    schedulePeriod === SCHEDULE_PERIODS.days
      ? ediSchedule.scheduleParameters.scheduleTime.slice(0, 8)
      : getTenantTime({
        time: ediSchedule.scheduleParameters.scheduleTime,
        timeZone,
      })
  ), [ediSchedule.scheduleParameters.scheduleTime, schedulePeriod, timeZone]);

  return (
    <Accordion
      id="scheduling"
      label={<FormattedMessage id="ui-organizations.integration.scheduling" />}
    >
      <Row>
        <Col xs={3}>
          <Checkbox
            label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleEDI" />}
            checked={ediSchedule.enableScheduledExport}
            vertical
            disabled
          />
        </Col>

        {isScheduleEnabled && (
          <>
            <Col xs={3}>
              <KeyValue
                label={<FormattedMessage id="ui-organizations.integration.scheduling.schedulePeriod" />}
                value={schedulePeriodValue &&
                  <FormattedMessage
                    id={`ui-organizations.integration.scheduling.schedulePeriod.${schedulePeriodValue}`}
                  />
                }
              />
            </Col>

            {schedulePeriod && schedulePeriod !== SCHEDULE_PERIODS.months && (
              <Col xs={3}>
                <KeyValue
                  label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleFrequency" />}
                  value={ediSchedule.scheduleParameters?.scheduleFrequency}
                />
              </Col>
            )}

            {schedulePeriod === SCHEDULE_PERIODS.months && (
              <Col xs={3}>
                <KeyValue
                  label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleDay" />}
                  value={ediSchedule.scheduleParameters?.scheduleDay}
                />
              </Col>
            )}

            {schedulePeriod === SCHEDULE_PERIODS.days && (
              <Col xs={3}>
                <KeyValue
                  label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleDate" />}
                >
                  <FolioFormattedDate value={ediSchedule.scheduleParameters?.schedulingDate} utc={false} />
                </KeyValue>
              </Col>
            )}

            <Col xs={3}>
              <KeyValue
                label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleTime" />}
                value={ediSchedule.scheduleParameters?.scheduleTime && getTime()}
              />
            </Col>
          </>
        )}
      </Row>

      {
        schedulePeriod === SCHEDULE_PERIODS.weeks && (
          <Row>
            {WEEKDAYS.map((weekday) => (
              <Col xs={3} key={weekday}>
                <Checkbox
                  label={<FormattedMessage id={`ui-organizations.integration.scheduling.scheduleWeekdaysView.${weekday}`} />}
                  checked={ediSchedule.scheduleParameters?.weekDays?.[weekday]}
                  disabled
                  vertical
                />
              </Col>
            ))}
          </Row>
        )
      }
    </Accordion>
  );
};

SchedulingView.propTypes = {
  ediSchedule: PropTypes.object,
};

export default SchedulingView;
