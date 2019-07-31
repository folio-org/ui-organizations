import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { Select } from '@folio/stripes/components';

const FieldLanguage = ({ dropdownLanguages, namePrefix, ...rest }) => {
  return (
    <Field
      label={<FormattedMessage id="ui-organizations.contactInfo.language" />}
      component={Select}
      fullWidth
      dataOptions={dropdownLanguages}
      name={`${namePrefix}.language`}
      {...rest}
    />
  );
};

FieldLanguage.propTypes = {
  dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
  namePrefix: PropTypes.string,
};

export default FieldLanguage;
