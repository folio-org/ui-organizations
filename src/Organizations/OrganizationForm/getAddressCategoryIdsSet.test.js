import { getAddressCategoryIdsSet } from './getAddressCategoryIdsSet';

describe('getAddressCategoryIdsSet', () => {
  it('should return a set of addresses categories', () => {
    const addresses = [
      { categories: [1, 2, 3] },
      { categories: [2, 3, 4] },
      { categories: [1, 4, 5] },
    ];

    expect(getAddressCategoryIdsSet(addresses).size).toEqual(5);
  });
});
