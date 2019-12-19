import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { MultiColumnList } from '@folio/stripes/components';

import { transformCategoryIdsToLables } from '../../../common/utils';

const visibleColumns = ['phoneNumber', 'type', 'language', 'categories', 'primary'];
const columnMapping = {
  phoneNumber: <FormattedMessage id="ui-organizations.contactPeople.phoneNumber" />,
  type: <FormattedMessage id="ui-organizations.contactPeople.type" />,
  language: <FormattedMessage id="ui-organizations.contactPeople.language" />,
  categories: <FormattedMessage id="ui-organizations.contactPeople.categories" />,
  primary: <FormattedMessage id="ui-organizations.primaryItem" />,
};

const ContactPhoneNumbers = ({ categories, phoneNumbers }) => {
  const resultsFormatter = {
    phoneNumber: ({ phoneNumber }) => phoneNumber,
    type: ({ type }) => type,
    language: ({ language }) => language,
    categories: phoneNumber => transformCategoryIdsToLables(categories, phoneNumber.categories),
    primary: phoneNumber => (phoneNumber.isPrimary ? <FormattedMessage id="ui-organizations.primaryItem" /> : ''),
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
