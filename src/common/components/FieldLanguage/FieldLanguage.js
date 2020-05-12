import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
} from 'react-intl';

import {
  FieldSelection,
  LANGUAGES,
} from '@folio/stripes-acq-components';

const FieldLanguage = ({ namePrefix, intl, withLabel, ...rest }) => {
  const languagesOptions = LANGUAGES.map(l => ({
    label: intl.formatMessage({ id: `stripes-acq-components.data.languages.${l.code}` }),
    value: l.code,
  }));

  return (
    <FieldSelection
      dataOptions={languagesOptions}
      labelId={withLabel ? 'ui-organizations.contactInfo.language' : undefined}
      name={`${namePrefix}.language`}
      {...rest}
    />
  );
};

FieldLanguage.propTypes = {
  intl: PropTypes.object.isRequired,
  namePrefix: PropTypes.string,
  withLabel: PropTypes.bool,
};

FieldLanguage.defaultProps = {
  withLabel: true,
};

export default injectIntl(FieldLanguage);
