import { removeItem } from './removeItem';

const buildFields = value => ({
  value,
  length: value?.length,
  remove: jest.fn(),
  update: jest.fn(),
});

describe('removeItem util', () => {
  it('should remove item by idx', () => {
    const fields = buildFields([{ isPrimary: true }]);
    const removeIdx = 0;

    removeItem(fields, removeIdx);

    expect(fields.remove).toHaveBeenCalledWith(removeIdx);
  });

  it('should set primary record when primary is removed and only one is left', () => {
    const fields = buildFields([{ isPrimary: true }, { isPrimary: false }]);
    const removeIdx = 0;

    removeItem(fields, removeIdx);

    expect(fields.update).toHaveBeenCalledWith(1, { isPrimary: true });
  });
});
