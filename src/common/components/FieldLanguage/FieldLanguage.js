import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { FieldSelect } from '@folio/stripes-acq-components';

const FieldLanguage = ({ dropdownLanguages, namePrefix, ...rest }) => {
  return (
    <FieldSelect
      label={<FormattedMessage id="ui-organizations.contactInfo.language" />}
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
