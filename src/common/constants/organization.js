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
