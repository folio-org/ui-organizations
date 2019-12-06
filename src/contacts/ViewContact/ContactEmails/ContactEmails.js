import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { MultiColumnList } from '@folio/stripes/components';

import { transformCategoryIdsToLables } from '../../../common/utils';

const visibleColumns = ['email', 'description', 'language', 'categories', 'primary'];
const columnMapping = {
  email: <FormattedMessage id="ui-organizations.contactPeople.email" />,
  description: <FormattedMessage id="ui-organizations.contactPeople.description" />,
  language: <FormattedMessage id="ui-organizations.contactPeople.language" />,
  categories: <FormattedMessage id="ui-organizations.contactPeople.categories" />,
  primary: <FormattedMessage id="ui-organizations.primaryItem" />,
};

const ContactEmails = ({ categories, emails }) => {
  const resultsFormatter = {
    email: ({ value }) => value,
    description: ({ description }) => description,
    language: ({ language }) => language,
    categories: email => transformCategoryIdsToLables(categories, email.categories),
    primary: email => (email.isPrimary ? <FormattedMessage id="ui-organizations.primaryItem" /> : ''),
  };

  return (
    <MultiColumnList
      columnMapping={columnMapping}
      contentData={emails}
      formatter={resultsFormatter}
      visibleColumns={visibleColumns}
    />
  );
};

ContactEmails.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  emails: PropTypes.arrayOf(PropTypes.object),
};

ContactEmails.defaultProps = {
  emails: [],
};

export default ContactEmails;
