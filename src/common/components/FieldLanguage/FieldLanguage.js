import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { FieldSelect } from '@folio/stripes-acq-components';

const FieldLanguage = ({ dropdownLanguages, namePrefix, withLabel, ...rest }) => {
  return (
    <FieldSelect
      label={withLabel ? <FormattedMessage id="ui-organizations.contactInfo.language" /> : undefined}
      dataOptions={dropdownLanguages}
      name={`${namePrefix}.language`}
      {...rest}
    />
  );
};

FieldLanguage.propTypes = {
  dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
  namePrefix: PropTypes.string,
  withLabel: PropTypes.bool,
};

FieldLanguage.defaultProps = {
  withLabel: true,
};

export default FieldLanguage;
