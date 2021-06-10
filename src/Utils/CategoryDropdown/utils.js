export const filterCategories = ({ categories, filterText, list }) => {
  const filterRegExp = new RegExp(`^${filterText}`, 'i');

  const matchedCats = categories?.filter(({ value }) => value.search(filterRegExp) !== -1);
  const matchedCatsExact = matchedCats?.filter(({ value }) => value === filterText);
  const matchedCatIds = matchedCats.map(({ id }) => id);
  const renderedItems = filterText ? list.filter(catId => matchedCatIds.includes(catId)) : list;
  const exactMatch = filterText ? (matchedCatsExact?.length === 1) : false;

  return { renderedItems, exactMatch };
};
