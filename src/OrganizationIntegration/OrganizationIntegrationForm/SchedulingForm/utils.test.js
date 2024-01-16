import { SCHEDULE_PERIODS } from '../../constants';
import {
  handleMinAndMaxNumber,
  normalizeNumber,
  validatePeriod,
} from './utils';

jest.mock('@folio/stripes-acq-components', () => ({
  validateRequiredMinAndMaxNumber: jest.fn(() => undefined),
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

  describe('handleMinAndMaxNumber', () => {
    it('should return undefined', () => {
      expect(handleMinAndMaxNumber({
        minNumber: 0,
        maxNumber: 1,
        value: 0,
      })).toBe(undefined);
    });
  });
});
