import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useForm } from 'react-final-form';

import { Button } from '@folio/stripes/components';

const ButtonIsPrimary = ({ fields, fieldIndex, labelId }) => {
  const { change } = useForm();
  const isPrimary = fields.value[fieldIndex].isPrimary;

  const changeIsPrimary = () => {
    if (isPrimary) return;

    fields.forEach((fieldName, i) => {
      if (
        (i !== fieldIndex && fields.value[i].isPrimary)
        || i === fieldIndex
      ) {
        change(`${fieldName}.isPrimary`, !fields.value[i].isPrimary);
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
  fieldIndex: PropTypes.number.isRequired,
  fields: PropTypes.object.isRequired,
  labelId: PropTypes.string,
};

export default ButtonIsPrimary;
