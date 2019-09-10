import { generateQueryTemplate } from '@folio/stripes-acq-components';

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

export const organizationsSearchQueryTemplate = generateQueryTemplate(indexes);
