import {
  COUNTRY_LABEL_BY_CODE,
  LANG_LABEL_BY_CODE,
} from '@folio/stripes-acq-components';

import { transformCategoryIdsToLables } from './category';

function sortPrimaryOnTop({ isPrimary }) {
  return isPrimary === true && -1;
}

export const mixCategories = (intl, categories, items = []) => items.map((item) => ({
  ...item,
  categories: transformCategoryIdsToLables(intl, categories, item.categories),
})).sort(sortPrimaryOnTop);

export const hydrateAddresses = (intl, categories = [], addresses = []) => mixCategories(intl, categories, addresses)
  .map(address => ({
    ...address,
    country: COUNTRY_LABEL_BY_CODE[address.country] || address.country,
    language: LANG_LABEL_BY_CODE[address.language] || address.language,
    primaryAddress: address.isPrimary,
  }));
