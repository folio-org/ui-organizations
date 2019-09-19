import React from 'react';
import PropTypes from 'prop-types';
import { get, map } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Button,
  Icon,
  MultiColumnList,
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

import { transformCategoryIdsToLables } from '../common/utils/category';

const columnMapping = {
  categories: <FormattedMessage id="ui-organizations.contactPeople.categories" />,
  emails: <FormattedMessage id="ui-organizations.contactPeople.emails" />,
  name: <FormattedMessage id="ui-organizations.contactPeople.name" />,
  unassign: null,
};

const visibleColumns = ['name', 'categories', 'emails', 'unassign'];

const getContactsUrl = (orgId, contactId) => {
  const ending = contactId ? `/contacts/${contactId}/view` : '/contacts/add-contact';
  const starting = orgId ? `/organizations/${orgId}` : '/organizations';

  return `${starting}${ending}`;
};

const AddContactButton = ({ fetchContacts, fields, stripes, orgId }) => {
  const addContacts = (contacts = []) => {
    const addedContactIds = new Set(fields.getAll());
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

const ContactPeopleList = ({ fetchContacts, fields, contactsMap, orgId, categoriesDict, stripes }) => {
  const contentData = fields.getAll().map((contactId, _index) => ({
    ...get(contactsMap, contactId, {}),
    _index,
  }));

  const anchoredRowFormatter = (row) => (
    <div role="listitem" key={`row-${row.rowIndex}`}>
      <Link
        to={getContactsUrl(orgId, row.rowData.id)}
        className={row.rowClass}
        {...row.rowProps}
      >
        {row.cells}
      </Link>
    </div>
  );

  const resultsFormatter = {
    categories: ({ categories = [] }) => transformCategoryIdsToLables(categoriesDict, categories),
    emails: ({ emails }) => map(emails, 'value').join(', '),
    name: contact => `${contact.firstName} ${contact.lastName}`,
    unassign: (contact) => (
      <Button
        align="end"
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
    <React.Fragment>
      <MultiColumnList
        id="contact-list"
        columnMapping={columnMapping}
        contentData={contentData}
        formatter={resultsFormatter}
        rowFormatter={anchoredRowFormatter}
        visibleColumns={visibleColumns}
      />
      <br />
      <AddContactButton
        fetchContacts={fetchContacts}
        fields={fields}
        stripes={stripes}
        orgId={orgId}
      />
    </React.Fragment>
  );
};

ContactPeopleList.propTypes = {
  fetchContacts: PropTypes.func.isRequired,
  fields: PropTypes.object,
  orgId: PropTypes.string,
  categoriesDict: PropTypes.arrayOf(PropTypes.object),
  contactsMap: PropTypes.object,
  stripes: PropTypes.object,
};

export default ContactPeopleList;
