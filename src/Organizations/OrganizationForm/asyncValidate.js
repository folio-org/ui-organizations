import React from 'react';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

const FIELD_CODE = 'code';

export function asyncValidate(values, dispatch, props, blurredField) {
  const { fetchOrgByCode } = props;

  if (blurredField) {
    const code = get(values, FIELD_CODE);
    const orgId = get(values, 'id');

    if (code && blurredField === FIELD_CODE) {
      let query = `code == ${code}`;

      if (orgId) query += ` and id<>"${orgId}"`;

      return fetchOrgByCode.GET({ params: { query } }).then(existingOrgs => {
        if (existingOrgs.length) {
          const errors = {
            [FIELD_CODE]: <FormattedMessage id="ui-organizations.save.error.codeInUse" />,
          };

          throw errors;
        }
      });
    }
  }

  return Promise.resolve();
}
