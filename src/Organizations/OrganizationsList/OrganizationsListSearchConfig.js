const indexes = [
  'name',
  'code',
  'language',
  'aliases',
  'erpCode',
  'taxId',
];

export const searchableIndexes = [
  {
    labelId: 'ui-organizations.search.keyword',
    value: '',
  },
  ...indexes.map(index => ({
    labelId: `ui-organizations.search.${index}`,
    placeholderId: index === 'language' && 'ui-organizations.search.placeholder.language',
    value: index,
  })),
];

export const getKeywordQuery = query => indexes.reduce(
  (acc, sIndex) => {
    if (acc) {
      return `${acc} or ${sIndex}="${query}*"`;
    } else {
      return `${sIndex}="${query}*"`;
    }
  },
  '',
);
