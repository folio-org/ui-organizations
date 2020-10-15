import React from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Checkbox } from '@folio/stripes/components';

function FieldIsPrimary({ change, fields, fieldIndex, fieldPrefix, labelId, vertical }) {
  const changeIsPrimary = ({ target: { checked } }) => {
    if (checked) {
      fields.forEach((fieldName, i) => {
        if (i !== fieldIndex && fields.value[i].isPrimary === checked) {
          change(`${fieldName}.isPrimary`, !checked);
        } else change(`${fieldPrefix}.isPrimary`, checked);
      });
    }
  };

  return (
    <Field
      component={Checkbox}
      data-test-checkbox-is-primary
      disabled={fields.length === 1}
      label={<FormattedMessage id={labelId} />}
      name={`${fieldPrefix}.isPrimary`}
      onChange={changeIsPrimary}
      type="checkbox"
      vertical={vertical}
    />
  );
}

FieldIsPrimary.propTypes = {
  change: PropTypes.func.isRequired,
  fieldIndex: PropTypes.number.isRequired,
  fieldPrefix: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  labelId: PropTypes.string,
  vertical: PropTypes.bool,
};

export default FieldIsPrimary;
