import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import { MultiColumnList } from '@folio/stripes/components';
import { LANG_LABEL_BY_CODE } from '@folio/stripes-acq-components';

import { transformCategoryIdsToLables } from '../../../common/utils';

const visibleColumns = ['phoneNumber', 'phoneType', 'phoneLanguage', 'phoneCategories', 'phonePrimary'];
const columnMapping = {
  phoneNumber: <FormattedMessage id="ui-organizations.contactPeople.phoneNumber" />,
  phoneType: <FormattedMessage id="ui-organizations.contactPeople.type" />,
  phoneLanguage: <FormattedMessage id="ui-organizations.contactPeople.language" />,
  phoneCategories: <FormattedMessage id="ui-organizations.contactPeople.categories" />,
  phonePrimary: <FormattedMessage id="ui-organizations.primaryItem" />,
};

const ContactPhoneNumbers = ({ categories, phoneNumbers }) => {
  const intl = useIntl();
  const resultsFormatter = {
    phoneNumber: ({ phoneNumber }) => phoneNumber,
    phoneType: ({ type }) => type,
    phoneLanguage: ({ language }) => LANG_LABEL_BY_CODE[language] || language,
    phoneCategories: phoneNumber => transformCategoryIdsToLables(intl, categories, phoneNumber.categories),
    phonePrimary: phoneNumber => (phoneNumber.isPrimary ? <FormattedMessage id="ui-organizations.primaryItem" /> : ''),
  };

  return (
    <MultiColumnList
      columnMapping={columnMapping}
      contentData={phoneNumbers}
      formatter={resultsFormatter}
      interactive={false}
      visibleColumns={visibleColumns}
    />
  );
};

ContactPhoneNumbers.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  phoneNumbers: PropTypes.arrayOf(PropTypes.object),
};

ContactPhoneNumbers.defaultProps = {
  phoneNumbers: [],
};

export default ContactPhoneNumbers;
