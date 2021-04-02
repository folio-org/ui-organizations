import React from 'react';
import { FormattedMessage } from 'react-intl';

export function validatePrimary(values) {
  if (values?.length && !values.some(({ isPrimary }) => isPrimary)) {
    return <FormattedMessage id="ui-organizations.contactPeople.errors.noPrimaryRecord" />;
  }

  return undefined;
}
