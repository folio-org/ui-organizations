import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  MultiColumnList,
  TextLink,
} from '@folio/stripes/components';
import { LANG_LABEL_BY_CODE } from '@folio/stripes-acq-components';

import { transformCategoryIdsToLables } from '../../../common/utils';

const visibleColumns = ['url', 'urlDescription', 'urlLanguage', 'urlCategories', 'urlPrimary'];
const columnMapping = {
  url: <FormattedMessage id="ui-organizations.contactPeople.name" />,
  urlDescription: <FormattedMessage id="ui-organizations.contactPeople.description" />,
  urlLanguage: <FormattedMessage id="ui-organizations.contactPeople.language" />,
  urlCategories: <FormattedMessage id="ui-organizations.contactPeople.categories" />,
  urlPrimary: <FormattedMessage id="ui-organizations.primaryItem" />,
};

const ContactUrls = ({ categories, urls = [] }) => {
  const resultsFormatter = {
    url: url => (
      <TextLink
        rel="noopener noreferrer"
        target="_blank"
        href={url.value}
      >
        {url.value}
      </TextLink>
    ),
    urlDescription: ({ description }) => description,
    urlLanguage: ({ language }) => LANG_LABEL_BY_CODE[language] || language,
    urlCategories: url => transformCategoryIdsToLables(categories, url.categories),
    urlPrimary: url => (url.isPrimary ? <FormattedMessage id="ui-organizations.primaryItem" /> : ''),
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

export default ContactUrls;
