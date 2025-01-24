import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
} from 'react-intl';

import {
  FieldSelectionFinal,
} from '@folio/stripes-acq-components';
import { languageOptions } from '@folio/stripes/components';

const FieldLanguage = ({ namePrefix, intl, withLabel = true, ...rest }) => {
  const langOptions = useMemo(() => languageOptions(intl), [intl]);

  return (
    <FieldSelectionFinal
      dataOptions={langOptions}
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

export default injectIntl(FieldLanguage);
