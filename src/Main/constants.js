import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  ORGANIZATION_STATUS,
  ORGANIZATION_STATUS_LABELS,
  CATEGORIES,
  ORGANIZATION_PAYMENT_METHOD,
  ORGANIZATION_PAYMENT_METHOD_LABELS,
} from '../common/constants';

export const FILTERS = {
  STATUS: 'status',
  ADDRESS_CATEGORY: 'address_category',
  CONTACT_CATEGORY: 'contact_category',
  ADDRESS_COUNTRY: 'address_country',
  LANGUAGE: 'language',
  PAYMENT_METHOD: 'paymentMethod',
  STATS_AVAILABLE: 'statsAvailable',
  IS_VENDOR: 'isVendor',
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

export const PAYMENT_METHOD_OPTIONS = Object.values(ORGANIZATION_PAYMENT_METHOD).map(method => ({
  value: method,
  label: ORGANIZATION_PAYMENT_METHOD_LABELS[method],
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
