import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  PAYMENT_METHOD,
  PAYMENT_METHOD_LABELS,
} from '@folio/stripes-acq-components';

import {
  ORGANIZATION_STATUS,
  ORGANIZATION_STATUS_LABELS,
  CATEGORIES,
} from '../common/constants';

export const FILTERS = {
  STATUS: 'status',
  TAGS: 'tags',
  ADDRESS_CATEGORY: 'address_category',
  CONTACT_CATEGORY: 'contact_category',
  ADDRESS_COUNTRY: 'address_country',
  LANGUAGE: 'language',
  PAYMENT_METHOD: 'paymentMethod',
  STATS_AVAILABLE: 'statsAvailable',
  IS_VENDOR: 'isVendor',
};

export const PAYMENT_METHOD_FOR_FILTER = {
  cash: PAYMENT_METHOD.cash,
  card: PAYMENT_METHOD.card,
  eft: PAYMENT_METHOD.eft,
  depAccount: PAYMENT_METHOD.depAccount,
};

export const DEFAULT_FILTERS = [
  {
    name: FILTERS.STATUS,
    values: [ORGANIZATION_STATUS.active, ORGANIZATION_STATUS.pending],
  },
];

export const STATUS_OPTIONS = Object.values(ORGANIZATION_STATUS).map(status => ({
  value: status,
  label: ORGANIZATION_STATUS_LABELS[status],
}));

export const CATEGORY_OPTIONS = Object.values(CATEGORIES).map(category => ({
  value: category,
  label: category,
}));

export const PAYMENT_METHOD_OPTIONS_FOR_FILTER = Object.values(PAYMENT_METHOD_FOR_FILTER).map(method => ({
  value: method,
  label: PAYMENT_METHOD_LABELS[method],
}));

export const BOOLEAN_OPTIONS = [
  {
    value: 'true',
    label: <FormattedMessage id="ui-organizations.filterConfig.boolean.true" />,
  },
  {
    value: 'false',
    label: <FormattedMessage id="ui-organizations.filterConfig.boolean.false" />,
  },
];
