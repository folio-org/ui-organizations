import {
  ediCodeTypeOptions,
  getEDITypeLabel,
} from './utils';

describe('utils', () => {
  describe('getEDITypeLabel', () => {
    it('should return empty line when type is not passed', () => {
      expect(getEDITypeLabel()).toBe('');
    });

    it('should return empty line when type is unknown', () => {
      expect(getEDITypeLabel('unknown')).toBe('');
    });

    it('should return type label when type is known', () => {
      expect(getEDITypeLabel(ediCodeTypeOptions[0].value)).toBe(ediCodeTypeOptions[0].label);
    });
  });
});
