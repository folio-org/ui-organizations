import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Checkbox } from '@folio/stripes/components';

function FieldIsPrimary({ dispatchChange, fields, fieldIndex, fieldPrefix, labelId, vertical }) {
  const changeIsPrimary = (e, newValue) => {
    if (newValue) {
      fields.forEach((fieldName, i) => {
        if (i !== fieldIndex && fields.get(i).isPrimary === newValue) {
          dispatchChange(`${fieldName}.isPrimary`, !newValue);
        }
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
  dispatchChange: PropTypes.func.isRequired,
  fieldIndex: PropTypes.number.isRequired,
  fieldPrefix: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  labelId: PropTypes.string,
  vertical: PropTypes.bool,
};

export default FieldIsPrimary;
