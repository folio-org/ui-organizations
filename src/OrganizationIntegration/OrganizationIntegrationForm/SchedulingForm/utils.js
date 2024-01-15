import { FormattedMessage } from 'react-intl';

import { validateRequiredMinAndMaxNumber } from '@folio/stripes-acq-components';

import { SCHEDULE_PERIODS } from '../../constants';
import {
  MAX_DAYS_OF_MONTHLY_SCHEDULE,
  MIN_REQUIRED_NUMBER,
} from './constants';

export const normalizeNumber = value => {
  if (!value && value !== 0) return value;

  return Number(value);
};

export const validatePeriod = (value) => {
  return value !== SCHEDULE_PERIODS.none
    ? undefined
    : <FormattedMessage id="stripes-acq-components.validation.required" />;
};

export const handleMinAndMaxNumber = (value) => {
  return validateRequiredMinAndMaxNumber({
    minNumber: MIN_REQUIRED_NUMBER,
    maxNumber: MAX_DAYS_OF_MONTHLY_SCHEDULE,
    value,
  });
};
