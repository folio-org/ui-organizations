export const transformCategoryIdsToLables = (categories, categoryIds = []) => {
  const categoriesMap = (categories || []).reduce((acc, category) => {
    acc[category.id] = category.value;

    return acc;
  }, {});

  return categoryIds.map(categoryId => categoriesMap[categoryId] || '').join(', ');
};
