import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Pane,
  Icon,
  Button,
  Row,
  Col,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import ContactPerson from '../../ContactPeople/ContactPerson';

const ViewContact = ({ onClose, contact, categories, baseUrl, unassign, deleteContact }) => {
  // eslint-disable-next-line react/prop-types
  const getActionMenu = ({ onToggle }) => {
    const contactId = contact.id;
    const editUrl = `${baseUrl}/${contactId}/edit`;

    return (
      <div data-test-view-contact-actions>
        <Button
          data-test-contacts-action-edit
          buttonStyle="dropdownItem"
          to={editUrl}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-organizations.contacts.button.edit" />
          </Icon>
        </Button>
        <Button
          data-test-contacts-action-copy
          buttonStyle="dropdownItem"
          onClick={() => {
            onToggle();
          }}
        >
          <Icon icon="duplicate">
            <FormattedMessage id="ui-organizations.contacts.button.copy" />
          </Icon>
        </Button>
        {contactId && (
          <Button
            data-test-contacts-action-unassign
            buttonStyle="dropdownItem"
            onClick={() => {
              onToggle();
              unassign();
            }}
          >
            <Icon icon="document">
              <FormattedMessage id="ui-organizations.contacts.button.unassign" />
            </Icon>
          </Button>
        )}
        <Button
          data-test-contacts-action-delete
          buttonStyle="dropdownItem"
          onClick={() => {
            onToggle();
            deleteContact();
          }}
        >
          <Icon icon="trash">
            <FormattedMessage id="ui-organizations.contacts.button.delete" />
          </Icon>
        </Button>
      </div>
    );
  };

  return (
    <Pane
      id="view-contact"
      appIcon={<AppIcon app="organizations" appIconKey="organizations" />}
      actionMenu={getActionMenu}
      defaultWidth="fill"
      dismissible
      onClose={onClose}
      paneTitle={`${contact.lastName}, ${contact.firstName}`}
    >
      <Row>
        <Col xs={12} md={8} mdOffset={2}>
          <ContactPerson
            contact={contact}
            categories={categories}
            withCollapsing={false}
          />
        </Col>
      </Row>
    </Pane>
  );
};

ViewContact.propTypes = {
  onClose: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object),
  baseUrl: PropTypes.string.isRequired,
  unassign: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ViewContact;
