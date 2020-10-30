import React from 'react';
import { FormattedMessage } from 'react-intl';

import { validateRequired } from '@folio/stripes-acq-components';

export const validateOrgCode = async (fetchOrgByCode, orgId, code) => {
  const errorRequired = validateRequired(code);

  if (errorRequired) {
    return errorRequired;
  }

  let query = `code == ${code}`;

  if (orgId) query += ` and id<>"${orgId}"`;

  const existingCodes = await fetchOrgByCode.GET({ params: { query } });

  return existingCodes.length ? <FormattedMessage id="ui-organizations.save.error.codeInUse" /> : undefined;
};
