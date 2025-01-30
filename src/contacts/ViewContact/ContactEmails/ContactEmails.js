import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { MultiColumnList } from '@folio/stripes/components';
import { LANG_LABEL_BY_CODE } from '@folio/stripes-acq-components';

import { transformCategoryIdsToLables } from '../../../common/utils';

const visibleColumns = ['email', 'emailDescription', 'emailLanguage', 'emailCategories', 'emailPrimary'];
const columnMapping = {
  email: <FormattedMessage id="ui-organizations.contactPeople.email" />,
  emailDescription: <FormattedMessage id="ui-organizations.contactPeople.description" />,
  emailLanguage: <FormattedMessage id="ui-organizations.contactPeople.language" />,
  emailCategories: <FormattedMessage id="ui-organizations.contactPeople.categories" />,
  emailPrimary: <FormattedMessage id="ui-organizations.primaryItem" />,
};

const ContactEmails = ({ categories, emails = [] }) => {
  const resultsFormatter = {
    email: ({ value }) => value,
    emailDescription: ({ description }) => description,
    emailLanguage: ({ language }) => LANG_LABEL_BY_CODE[language] || language,
    emailCategories: email => transformCategoryIdsToLables(categories, email.categories),
    emailPrimary: email => (email.isPrimary ? <FormattedMessage id="ui-organizations.primaryItem" /> : ''),
  };

  return (
    <MultiColumnList
      columnMapping={columnMapping}
      contentData={emails}
      formatter={resultsFormatter}
      interactive={false}
      visibleColumns={visibleColumns}
    />
  );
};

ContactEmails.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  emails: PropTypes.arrayOf(PropTypes.object),
};

export default ContactEmails;
