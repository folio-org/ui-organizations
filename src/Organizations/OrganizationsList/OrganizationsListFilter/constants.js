import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  ORGANIZATION_STATUS,
  ORGANIZATION_STATUS_LABELS,
} from '../../../common/constants';

export const FILTERS = {
  ACQUISITIONS_UNIT: 'acqUnitIds',
  STATUS: 'status',
  TAGS: 'tags',
  ADDRESS_COUNTRY: 'addresses',
  LANGUAGE: 'language',
  PAYMENT_METHOD: 'paymentMethod',
  IS_VENDOR: 'isVendor',
};

export const STATUS_OPTIONS = Object.values(ORGANIZATION_STATUS).map(status => ({
  value: status,
  label: ORGANIZATION_STATUS_LABELS[status],
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
