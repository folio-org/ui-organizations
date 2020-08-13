import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  find,
  get,
} from 'lodash';

import {
  Icon,
  MultiColumnList,
} from '@folio/stripes/components';
import { acqRowFormatter } from '@folio/stripes-acq-components';

import { transformCategoryIdsToLables } from '../../../common/utils';

const visibleColumns = ['name', 'categories', 'email', 'phone', 'icon'];
const columnMapping = {
  name: <FormattedMessage id="ui-organizations.contactPeople.name" />,
  categories: <FormattedMessage id="ui-organizations.contactPeople.categories" />,
  email: <FormattedMessage id="ui-organizations.contactPeople.email" />,
  phone: <FormattedMessage id="ui-organizations.contactPeople.phone" />,
  icon: null,
};
const alignRowProps = { alignLastColToEnd: true };

const OrganizationContactPeople = ({ vendorCategories, contacts, openContact }) => {
  const resultsFormatter = {
    name: ({ firstName, lastName }) => `${lastName}, ${firstName}`,
    categories: ({ categories = [] }) => transformCategoryIdsToLables(vendorCategories, categories),
    email: ({ emails }) => get(find(emails, 'isPrimary'), 'value', ''),
    phone: ({ phoneNumbers }) => get(find(phoneNumbers, 'isPrimary'), 'phoneNumber', ''),
    icon: () => <Icon icon="caret-right" />,
  };

  return (
    <MultiColumnList
      columnMapping={columnMapping}
      contentData={contacts}
      formatter={resultsFormatter}
      onRowClick={openContact}
      rowFormatter={acqRowFormatter}
      rowProps={alignRowProps}
      visibleColumns={visibleColumns}
    />
  );
};

OrganizationContactPeople.propTypes = {
  vendorCategories: PropTypes.arrayOf(PropTypes.object),
  contacts: PropTypes.arrayOf(PropTypes.object),
  openContact: PropTypes.func.isRequired,
};

OrganizationContactPeople.defaultProps = {
  vendorCategories: [],
  contacts: [],
};

export default OrganizationContactPeople;
