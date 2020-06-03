import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Button } from '@folio/stripes/components';

const ButtonIsPrimary = ({ dispatchChange, fields, fieldIndex, labelId }) => {
  const isPrimary = fields.get(fieldIndex).isPrimary;
  const changeIsPrimary = () => {
    if (isPrimary) return;

    fields.forEach((fieldName, i) => {
      if (
        (i !== fieldIndex && fields.get(i).isPrimary)
        || i === fieldIndex
      ) {
        dispatchChange(`${fieldName}.isPrimary`, !fields.get(i).isPrimary);
      }
    });
  };

  return (
    <Button
      onClick={changeIsPrimary}
      buttonStyle={`${isPrimary ? 'primary' : 'default'} slim`}
    >
      <FormattedMessage id={labelId} />
    </Button>
  );
};

ButtonIsPrimary.propTypes = {
  dispatchChange: PropTypes.func.isRequired,
  fieldIndex: PropTypes.number.isRequired,
  fields: PropTypes.object.isRequired,
  labelId: PropTypes.string,
};

export default ButtonIsPrimary;
