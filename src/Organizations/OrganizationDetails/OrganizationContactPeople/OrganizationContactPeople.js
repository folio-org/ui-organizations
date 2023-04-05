import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  find,
  get,
} from 'lodash';

import {
  Icon,
  MultiColumnList,
  NoValue,
} from '@folio/stripes/components';
import { acqRowFormatter } from '@folio/stripes-acq-components';

import { Ellipsis } from '../../../common/components';
import { transformCategoryIdsToLables } from '../../../common/utils';

const visibleColumns = [
  'name',
  'categories',
  'email',
  'phone',
  'status',
  'notes',
  'icon',
];
const columnMapping = {
  name: <FormattedMessage id="ui-organizations.contactPeople.name" />,
  categories: <FormattedMessage id="ui-organizations.contactPeople.categories" />,
  email: <FormattedMessage id="ui-organizations.contactPeople.email" />,
  phone: <FormattedMessage id="ui-organizations.contactPeople.phone" />,
  status: <FormattedMessage id="ui-organizations.contactPeople.status" />,
  notes: <FormattedMessage id="ui-organizations.contactPeople.note" />,
  icon: null,
};
const alignRowProps = { alignLastColToEnd: true };

const OrganizationContactPeople = ({ vendorCategories, contacts, openContact }) => {
  const intl = useIntl();

  const resultsFormatter = {
    name: ({ isDeleted, firstName, lastName }) => (
      isDeleted
        ? intl.formatMessage({ id: 'ui-organizations.contactPeople.removedContact' })
        : `${lastName}, ${firstName}`
    ),
    // eslint-disable-next-line react/prop-types
    categories: ({ categories = [] }) => transformCategoryIdsToLables(vendorCategories, categories) || <NoValue />,
    email: c => get(find(c.emails, 'isPrimary'), 'value', '') || <NoValue />,
    phone: c => get(find(c.phoneNumbers, 'isPrimary'), 'phoneNumber', '') || <NoValue />,
    status: c => <FormattedMessage id={`ui-organizations.contactPeople.status.${c.inactive ? 'inactive' : 'active'}`} />,
    notes: c => <Ellipsis>{c.notes}</Ellipsis>,
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
