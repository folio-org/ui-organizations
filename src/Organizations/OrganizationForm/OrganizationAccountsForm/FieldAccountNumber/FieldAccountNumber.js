import React, { useCallback } from 'react';
import { Field, useFormState } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { TextField } from '@folio/stripes/components';
import { validateRequired } from '@folio/stripes-acq-components';

export const FieldAccountNumber = ({ name }) => {
  const { values } = useFormState();

  const validate = useCallback(
    (fieldValue) => {
      const errorRequired = validateRequired(fieldValue);

      if (errorRequired) {
        return errorRequired;
      }

      const accountNumbers = values.accounts?.map(({ accountNo }) => accountNo);
      const hasDuplicateAccountNumbers = [...new Set(accountNumbers)].length !== accountNumbers.length;

      return hasDuplicateAccountNumbers
        ? <FormattedMessage id="ui-organizations.save.error.accountNumberMustBeUnique" />
        : undefined;
    },
    [values.accounts],
  );

  return (
    <Field
      label={<FormattedMessage id="ui-organizations.accounts.accountNumber" />}
      name={name}
      validate={validate}
      required
      component={TextField}
      fullWidth
      validateFields={[]}
    />
  );
};

FieldAccountNumber.propTypes = {
  name: PropTypes.string.isRequired,
};
