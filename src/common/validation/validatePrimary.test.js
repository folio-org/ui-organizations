import { validatePrimary } from './validatePrimary';

describe('validatePrimary', () => {
  it('should return error message when records are defined and no primary selected', () => {
    expect(validatePrimary([{ isPrimary: false }])).toBeDefined();
  });

  it('should not return error message when not records provided', () => {
    expect(validatePrimary()).not.toBeDefined();
    expect(validatePrimary([])).not.toBeDefined();
  });

  it('should not return error message when records provided with primary selected', () => {
    expect(validatePrimary([{ isPrimary: true }])).not.toBeDefined();
  });
});
