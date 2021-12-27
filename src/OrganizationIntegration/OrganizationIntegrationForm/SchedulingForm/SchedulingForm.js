import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field, useForm } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Accordion,
  Checkbox,
  Col,
  Datepicker,
  Row,
  Select,
  Timepicker,
  TextField,
} from '@folio/stripes/components';
import {
  validateRequired,
  validateRequiredPositiveNumber,
} from '@folio/stripes-acq-components';

import {
  SCHEDULE_PERIODS,
  WEEKDAYS,
} from '../../constants';

const normalizeNumber = value => {
  if (!value && value !== 0) return value;

  return Number(value);
};

export const SchedulingForm = () => {
  const { formatMessage } = useIntl();
  const { getState, change } = useForm();

  const formValues = getState()?.values;
  const ediSchedule = formValues?.exportTypeSpecificParameters?.vendorEdiOrdersExportConfig?.ediSchedule || {};
  const isScheduleEnabled = ediSchedule.enableScheduledExport;
  const schedulePeriod = ediSchedule.scheduleParameters?.schedulePeriod;

  const schedulePeriodOptions = Object.keys(SCHEDULE_PERIODS)
    .map(periodKey => ({
      label: formatMessage({ id: `ui-organizations.integration.scheduling.schedulePeriod.${periodKey}` }),
      value: SCHEDULE_PERIODS[periodKey],
    }));

  const toggleSchedule = ({ target }) => {
    const newState = target.checked;

    change(
      'exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.enableScheduledExport',
      newState,
    );
    change(
      'exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.scheduleParameters.schedulePeriod',
      newState ? SCHEDULE_PERIODS.hours : 'NONE',
    );
  };

  return (
    <Accordion
      id="scheduling"
      label={<FormattedMessage id="ui-organizations.integration.scheduling" />}
    >
      <Row>
        <Col xs={3}>
          <Field
            component={Checkbox}
            type="checkbox"
            fullWidth
            label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleEDI" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.enableScheduledExport"
            vertical
            onChange={toggleSchedule}
          />
        </Col>

        {
          isScheduleEnabled && (
            <Col xs={3}>
              <Field
                data-testid="schedule-period"
                label={<FormattedMessage id="ui-organizations.integration.scheduling.schedulePeriod" />}
                name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.scheduleParameters.schedulePeriod"
                component={Select}
                dataOptions={schedulePeriodOptions}
              />
            </Col>
          )
        }
      </Row>

      {
        schedulePeriod === SCHEDULE_PERIODS.hours && (
          <Row>
            <Col xs={3}>
              <Field
                data-testid="schedule-frequency"
                component={TextField}
                label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleFrequency" />}
                name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.scheduleParameters.scheduleFrequency"
                type="number"
                min={1}
                hasClearIcon={false}
                required
                validate={validateRequiredPositiveNumber}
                parse={normalizeNumber}
              />
            </Col>

            <Col xs={3}>
              <Field
                label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleTime" />}
                name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.scheduleParameters.scheduleTime"
                component={Timepicker}
                timeZone="UTC"
                validateFields={[]}
              />
            </Col>
          </Row>
        )
      }

      {
        schedulePeriod === SCHEDULE_PERIODS.days && (
          <Row>
            <Col xs={3}>
              <Field
                data-testid="schedule-frequency"
                component={TextField}
                label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleFrequency" />}
                name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.scheduleParameters.scheduleFrequency"
                type="number"
                min={1}
                hasClearIcon={false}
                required
                validate={validateRequiredPositiveNumber}
                parse={normalizeNumber}
              />
            </Col>

            <Col xs={3}>
              <Field
                label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleDate" />}
                name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.scheduleParameters.schedulingDate"
                component={Datepicker}
                validateFields={[]}
              />
            </Col>

            <Col xs={3}>
              <Field
                label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleTime" />}
                name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.scheduleParameters.scheduleTime"
                component={Timepicker}
                timeZone="UTC"
                validateFields={[]}
              />
            </Col>
          </Row>
        )
      }

      {
        schedulePeriod === SCHEDULE_PERIODS.weeks && (
          <Row>
            <Col xs={3}>
              <Field
                data-testid="schedule-frequency"
                component={TextField}
                label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleFrequency" />}
                name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.scheduleParameters.scheduleFrequency"
                type="number"
                min={1}
                hasClearIcon={false}
                required
                validate={validateRequiredPositiveNumber}
                parse={normalizeNumber}
              />
            </Col>

            <Col xs={3}>
              <Field
                label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleTime" />}
                name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.scheduleParameters.scheduleTime"
                component={Timepicker}
                timeZone="UTC"
                validateFields={[]}
              />
            </Col>

            <Col xs={6}>
              <FieldArray
                name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.scheduleParameters.weekDays"
                validate={validateRequired}
              >
                {
                  ({ fields }) => WEEKDAYS.map((weekday, index) => (
                    <Field
                      key={index}
                      component={Checkbox}
                      label={<FormattedMessage id={`ui-organizations.integration.scheduling.scheduleWeekdays.${weekday}`} />}
                      name={`${fields.name}[${weekday}]`}
                      type="checkbox"
                      vertical
                    />
                  ))
                }
              </FieldArray>
            </Col>
          </Row>
        )
      }

      {
        schedulePeriod === SCHEDULE_PERIODS.months && (
          <Row>
            <Col xs={3}>
              <Field
                data-testid="schedule-frequency"
                component={TextField}
                label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleDay" />}
                name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.scheduleParameters.scheduleDay"
                type="number"
                min={1}
                max={31}
                hasClearIcon={false}
                required
                validate={validateRequiredPositiveNumber}
                parse={normalizeNumber}
              />
            </Col>

            <Col xs={3}>
              <Field
                label={<FormattedMessage id="ui-organizations.integration.scheduling.scheduleTime" />}
                name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediSchedule.scheduleParameters.scheduleTime"
                component={Timepicker}
                timeZone="UTC"
                validateFields={[]}
              />
            </Col>
          </Row>
        )
      }
    </Accordion>
  );
};
