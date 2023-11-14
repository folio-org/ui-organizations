import memoize from 'lodash/memoize';

export const getAddressCategoryIdsSet = memoize((addresses = []) => {
  return addresses.reduce((acc, address) => {
    address.categories?.forEach(categoryId => acc.add(categoryId));

    return acc;
  }, new Set());
})
