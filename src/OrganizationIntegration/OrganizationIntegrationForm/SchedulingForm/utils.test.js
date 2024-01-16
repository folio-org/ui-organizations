import { SCHEDULE_PERIODS } from '../../constants';
import {
  validateRequiredMinAndMaxNumber,
  normalizeNumber,
  validatePeriod,
} from './utils';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  validateRequiredMinNumber: jest.fn(({ minNumber, value }) => (minNumber <= value ? undefined : 'min error')),
  validateRequiredMaxNumber: jest.fn(({ maxNumber, value }) => (maxNumber >= value ? undefined : 'max error')),
}));

describe('OrganizationIntegrationForm utils', () => {
  describe('normalizeNumber', () => {
    it('should return number', () => {
      expect(normalizeNumber(0)).toBe(0);
    });

    it('should return number', () => {
      expect(normalizeNumber('0')).toBe(0);
    });

    it('should return undefined', () => {
      expect(normalizeNumber('')).toBe('');
    });
  });

  describe('validatePeriod', () => {
    it('should return undefined', () => {
      expect(validatePeriod(SCHEDULE_PERIODS.monthly)).toBe(undefined);
    });

    it('should return error message', () => {
      expect(validatePeriod(SCHEDULE_PERIODS.none)).toBeDefined();
    });
  });

  describe('validateRequiredMinAndMaxNumber', () => {
    it('should return undefined', () => {
      expect(validateRequiredMinAndMaxNumber(0)).toBeTruthy();
      expect(validateRequiredMinAndMaxNumber('')).toBeTruthy();
      expect(validateRequiredMinAndMaxNumber(-1)).toBeTruthy();
      expect(validateRequiredMinAndMaxNumber(1)).toBe(undefined);
      expect(validateRequiredMinAndMaxNumber(2)).toBe(undefined);
      expect(validateRequiredMinAndMaxNumber(34)).toBeTruthy();
    });
  });
});
