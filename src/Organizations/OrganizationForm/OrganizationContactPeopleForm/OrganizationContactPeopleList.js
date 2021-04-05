import React from 'react';
import PropTypes from 'prop-types';
import {
  map,
  sortBy,
} from 'lodash';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import {
  Button,
  Icon,
  MultiColumnList,
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';
import { acqRowFormatter } from '@folio/stripes-acq-components';

import { transformCategoryIdsToLables } from '../../../common/utils/category';

const columnMapping = {
  contactCategories: <FormattedMessage id="ui-organizations.contactPeople.categories" />,
  contactEmails: <FormattedMessage id="ui-organizations.contactPeople.emails" />,
  contactName: <FormattedMessage id="ui-organizations.contactPeople.name" />,
  unassignContact: null,
};

const visibleColumns = ['contactName', 'contactCategories', 'contactEmails', 'unassignContact'];

const getContactsUrl = (orgId, contactId) => {
  if (!contactId) return undefined;

  const ending = contactId ? `/contacts/${contactId}/view` : '/contacts/add-contact';
  const starting = orgId ? `/organizations/${orgId}` : '/organizations';

  return `${starting}${ending}`;
};

const AddContactButton = ({ fetchContacts, fields, stripes, orgId }) => {
  const addContacts = (contacts = []) => {
    const addedContactIds = new Set(fields.value);
    const newContactsIds = map(contacts.filter(({ id }) => !addedContactIds.has(id)), 'id');

    if (newContactsIds.length) {
      fetchContacts([...addedContactIds, ...newContactsIds]);
      newContactsIds.forEach(contactId => fields.push(contactId));
    }
  };

  const renderNewContactBtn = () => {
    const url = `/organizations${orgId ? '/' + orgId : ''}/contacts/add-contact`;

    return (
      <Button
        marginBottom0
        buttonStyle="primary"
        to={url}
      >
        <FormattedMessage id="ui-organizations.contactPeople.newContact" />
      </Button>
    );
  };

  return (
    <Pluggable
      aria-haspopup="true"
      type="find-contact"
      dataKey="contact"
      searchLabel={<FormattedMessage id="ui-organizations.contactPeople.addContact" />}
      searchButtonStyle="default"
      disableRecordCreation
      stripes={stripes}
      addContacts={addContacts}
      renderNewContactBtn={renderNewContactBtn}
    >
      <span data-test-add-contact>
        <FormattedMessage id="ui-organizations.contactPeople.noFindContactPlugin" />
      </span>
    </Pluggable>
  );
};

AddContactButton.propTypes = {
  fetchContacts: PropTypes.func.isRequired,
  fields: PropTypes.object,
  stripes: PropTypes.object,
  orgId: PropTypes.string,
};

const alignRowProps = { alignLastColToEnd: true };

const OrganizationContactPeopleList = ({ fetchContacts, fields, contactsMap, orgId, categoriesDict, stripes }) => {
  const intl = useIntl();
  const contacts = fields.value
    .map((contactId, _index) => {
      const contact = contactsMap?.[contactId];

      return {
        ...(contact || { isDeleted: true }),
        _index,
      };
    });
  const contentData = sortBy(contacts, [({ lastName }) => lastName?.toLowerCase()]);

  const anchoredRowFormatter = ({ rowProps, ...rest }) => {
    return acqRowFormatter({
      ...rest,
      rowProps: {
        ...rowProps,
        to: getContactsUrl(orgId, rest.rowData.id),
      },
    });
  };

  const resultsFormatter = {
    contactCategories: ({ categories = [] }) => transformCategoryIdsToLables(categoriesDict, categories),
    contactEmails: ({ emails }) => map(emails, 'value').join(', '),
    contactName: contact => (
      contact.isDeleted
        ? intl.formatMessage({ id: 'ui-organizations.contactPeople.remove' })
        : `${contact.lastName}, ${contact.firstName}`
    ),
    unassignContact: (contact) => (
      <Button
        align="end"
        aria-label={intl.formatMessage({ id: 'ui-organizations.contacts.button.unassign' })}
        buttonStyle="fieldControl"
        data-test-unassign-contact
        type="button"
        onClick={(e) => {
          e.preventDefault();
          fields.remove(contact._index);
        }}
      >
        <Icon icon="times-circle" />
      </Button>
    ),
  };

  return (
    <>
      <MultiColumnList
        id="contact-list"
        columnMapping={columnMapping}
        contentData={contentData}
        formatter={resultsFormatter}
        rowFormatter={anchoredRowFormatter}
        rowProps={alignRowProps}
        visibleColumns={visibleColumns}
      />
      <br />
      <AddContactButton
        fetchContacts={fetchContacts}
        fields={fields}
        stripes={stripes}
        orgId={orgId}
      />
    </>
  );
};

OrganizationContactPeopleList.propTypes = {
  fetchContacts: PropTypes.func.isRequired,
  fields: PropTypes.object,
  orgId: PropTypes.string,
  categoriesDict: PropTypes.arrayOf(PropTypes.object),
  contactsMap: PropTypes.object,
  stripes: PropTypes.object,
};

export default OrganizationContactPeopleList;
