import React from 'react';
import { FormattedMessage } from 'react-intl';

export const ORGANIZATION_STATUS = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
};

export const ORGANIZATION_STATUS_LABELS = {
  [ORGANIZATION_STATUS.active]: <FormattedMessage id="ui-organizations.organizationStatus.active" />,
  [ORGANIZATION_STATUS.inactive]: <FormattedMessage id="ui-organizations.organizationStatus.inactive" />,
  [ORGANIZATION_STATUS.pending]: <FormattedMessage id="ui-organizations.organizationStatus.pending" />,
};

export const ORGANIZATION_PAYMENT_METHOD = {
  cash: 'Cash',
  card: 'Credit Card/P-Card',
  eft: 'EFT',
  depAccount: 'Deposit Account',
};

export const ORGANIZATION_PAYMENT_METHOD_LABELS = {
  [ORGANIZATION_PAYMENT_METHOD.cash]: <FormattedMessage id="ui-organizations.paymentMethod.cash" />,
  [ORGANIZATION_PAYMENT_METHOD.card]: <FormattedMessage id="ui-organizations.paymentMethod.card" />,
  [ORGANIZATION_PAYMENT_METHOD.eft]: <FormattedMessage id="ui-organizations.paymentMethod.eft" />,
  [ORGANIZATION_PAYMENT_METHOD.depAccount]: <FormattedMessage id="ui-organizations.paymentMethod.depAccount" />,
};
