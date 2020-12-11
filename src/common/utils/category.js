import { VENDOR_DEFAULT_CATEGORIES } from '../constants';

export const transformCategoryIdsToLables = (intl, categories, categoryIds = []) => {
  const categoriesMap = (categories || []).reduce((acc, category) => {
    const translationKey = VENDOR_DEFAULT_CATEGORIES[category.value];

    acc[category.id] = translationKey
      ? intl.formatMessage({
        id: `ui-organizations.contactInfo.vendorCategory.${translationKey}`,
        defaultMessage: category.value,
      })
      : category.value;

    return acc;
  }, {});

  return categoryIds.map(categoryId => categoriesMap[categoryId] || '').join(', ');
};
