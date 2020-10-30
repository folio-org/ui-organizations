import React, { useCallback } from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';
import { TextField } from '@folio/stripes/components';

import { fetchOrgsByParam } from '../../../../common/resources';
import { validateOrgCode } from './validateOrgCode';

const FieldCode = ({ orgId, mutator }) => {
  const validate = useCallback(value => {
    return validateOrgCode(mutator.fetchOrgByCode, orgId, value);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [orgId]);

  return (
    <Field
      component={TextField}
      fullWidth
      label={<FormattedMessage id="ui-organizations.summary.code" />}
      name="code"
      required
      validate={validate}
    />
  );
};

FieldCode.manifest = Object.freeze({
  fetchOrgByCode: fetchOrgsByParam,
});

FieldCode.propTypes = {
  mutator: PropTypes.object.isRequired,
  orgId: PropTypes.string,
};

export default stripesConnect(FieldCode);
