import { transformCategoryIdsToLables } from './category';

function sortPrimaryOnTop({ isPrimary }) {
  return isPrimary === true && -1;
}

export const mixCategories = (categories, items = []) => items.map((item) => ({
  ...item,
  categories: transformCategoryIdsToLables(categories, item.categories),
})).sort(sortPrimaryOnTop);

export const hydrateAddresses = (categories = [], addresses = []) => mixCategories(categories, addresses)
  .map(address => ({
    ...address,
    primaryAddress: address.isPrimary,
  }));
