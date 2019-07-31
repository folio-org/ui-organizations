const indexes = [
  'name',
  'contacts',
  'code',
  'language',
  'aliases',
  'erpCode',
  'taxId',
  'interfaces',
];

export const searchableIndexes = [
  {
    label: 'keyword',
    value: '',
  },
  ...indexes.map(index => ({ label: index, value: index })),
];

export const organizationsSearchQueryTemplate = `(
  name="%{query.query}*" or
  code="%{query.query}*" or
  language="%{query.query}*" or
  aliases="%{query.query}*" or
  erpCode="%{query.query}*" or
  taxId="%{query.query}*" or
  interfaces="%{query.query}*" or
  contacts="%{query.query}*"
)`;
