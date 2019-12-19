import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { MultiColumnList } from '@folio/stripes/components';

import { transformCategoryIdsToLables } from '../../../common/utils';

const visibleColumns = ['url', 'description', 'language', 'categories', 'primary'];
const columnMapping = {
  url: <FormattedMessage id="ui-organizations.contactPeople.name" />,
  description: <FormattedMessage id="ui-organizations.contactPeople.description" />,
  language: <FormattedMessage id="ui-organizations.contactPeople.language" />,
  categories: <FormattedMessage id="ui-organizations.contactPeople.categories" />,
  primary: <FormattedMessage id="ui-organizations.primaryItem" />,
};

const ContactUrls = ({ categories, urls }) => {
  const resultsFormatter = {
    url: ({ value }) => value,
    description: ({ description }) => description,
    language: ({ language }) => language,
    categories: url => transformCategoryIdsToLables(categories, url.categories),
    primary: url => (url.isPrimary ? <FormattedMessage id="ui-organizations.primaryItem" /> : ''),
  };

  return (
    <MultiColumnList
      columnMapping={columnMapping}
      contentData={urls}
      formatter={resultsFormatter}
      interactive={false}
      visibleColumns={visibleColumns}
    />
  );
};

ContactUrls.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  urls: PropTypes.arrayOf(PropTypes.object),
};

ContactUrls.defaultProps = {
  urls: [],
};

export default ContactUrls;
