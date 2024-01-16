import { SCHEDULE_PERIODS } from '../../constants';

export const ALLOWED_SCHEDULE_PERIODS = [
  SCHEDULE_PERIODS.none,
  SCHEDULE_PERIODS.hours,
  SCHEDULE_PERIODS.days,
  SCHEDULE_PERIODS.weeks,
  SCHEDULE_PERIODS.months,
];

export const MIN_REQUIRED_NUMBER = 1;
export const MAX_DAYS_OF_MONTHLY_SCHEDULE = 31;
