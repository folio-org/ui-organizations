import get from 'lodash/get';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import {
  MultiColumnList,
  NoValue,
} from '@folio/stripes/components';
import { useCategories } from '@folio/stripes-acq-components';

import { Ellipsis } from '../../../../common/components';
import { useVersionWrappedRowFormatter } from '../../../../common/hooks';
import { transformCategoryIdsToLables } from '../../../../common/utils';

const visibleColumns = [
  'name',
  'categories',
  'email',
  'phone',
  'status',
  'notes',
];

const columnMapping = {
  name: <FormattedMessage id="ui-organizations.contactPeople.name" />,
  categories: <FormattedMessage id="ui-organizations.contactPeople.categories" />,
  email: <FormattedMessage id="ui-organizations.contactPeople.email" />,
  phone: <FormattedMessage id="ui-organizations.contactPeople.phone" />,
  status: <FormattedMessage id="ui-organizations.contactPeople.status" />,
  notes: <FormattedMessage id="ui-organizations.contactPeople.note" />,
};

const getResultsFormatter = ({ intl, categories }) => ({
  name: ({ isDeleted, firstName, lastName }) => (
    isDeleted
      ? intl.formatMessage({ id: 'ui-organizations.contactPeople.removedContact' })
      : `${lastName}, ${firstName}`
  ),
  categories: ({ categories: vendorCategories = [] }) => {
    return transformCategoryIdsToLables(categories, vendorCategories) || <NoValue />;
  },
  email: c => get(find(c.emails, 'isPrimary'), 'value', '') || <NoValue />,
  phone: c => get(find(c.phoneNumbers, 'isPrimary'), 'phoneNumber', '') || <NoValue />,
  status: c => <FormattedMessage id={`ui-organizations.contactPeople.status.${c.inactive ? 'inactive' : 'active'}`} />,
  notes: c => <Ellipsis>{c.notes}</Ellipsis>,
});

export const OrganizationContactPeopleVersionView = ({ name, version }) => {
  const intl = useIntl();

  const { categories } = useCategories();

  const rowFormatter = useVersionWrappedRowFormatter({ name });

  const resultsFormatter = useMemo(() => {
    return getResultsFormatter({ intl, categories });
  }, [intl, categories]);

  return (
    <MultiColumnList
      columnMapping={columnMapping}
      contentData={version?.contactsList}
      formatter={resultsFormatter}
      rowFormatter={rowFormatter}
      visibleColumns={visibleColumns}
      interactive={false}
    />
  );
};

OrganizationContactPeopleVersionView.propTypes = {
  name: PropTypes.string.isRequired,
  version: PropTypes.object,
};
