import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  Button,
  checkScope,
  Col,
  collapseAllSections,
  ExpandAllButton,
  expandAllSections,
  HasCommand,
  Icon,
  Pane,
  Row,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import {
  hydrateAddresses,
  transformCategoryIdsToLables,
} from '../../common/utils';
import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import {
  CONTACT_PERSON_ACCORDIONS,
  CONTACT_PERSON_ACCORDION_LABELS,
} from '../constants';
import ContactDetails from './ContactDetails';
import ContactAddresses from './ContactAddresses';
import ContactEmails from './ContactEmails';
import ContactUrls from './ContactUrls';
import ContactPhoneNumbers from './ContactPhoneNumbers';

const ViewContact = ({
  categories,
  onClose,
  contact,
  editUrl,
  unassign,
  deleteContact,
}) => {
  const history = useHistory();
  const accordionStatusRef = useRef();
  const contactCategories = transformCategoryIdsToLables(categories, contact.categories);
  const addresses = hydrateAddresses(categories, contact.addresses);

  const shortcuts = [
    {
      name: 'edit',
      handler: () => history.push(editUrl),
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
    {
      name: 'search',
      handler: () => history.push(ORGANIZATIONS_ROUTE),
    },
  ];

  // eslint-disable-next-line react/prop-types
  const getActionMenu = ({ onToggle }) => {
    const contactId = contact.id;

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
        {/* <Button
          data-test-contacts-action-copy
          buttonStyle="dropdownItem"
        >
          <Icon icon="duplicate">
            <FormattedMessage id="ui-organizations.contacts.button.copy" />
          </Icon>
        </Button> */}
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
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Pane
        id="view-contact"
        appIcon={<AppIcon app="organizations" appIconKey="organizations" />}
        actionMenu={getActionMenu}
        defaultWidth="fill"
        dismissible
        onClose={onClose}
        paneTitle={`${contact.lastName}, ${contact.firstName}`}
      >
        <Row data-test-contact-person>
          <Col xs={12} md={8} mdOffset={2}>
            <AccordionStatus ref={accordionStatusRef}>
              <Row end="xs">
                <Col xs={12}>
                  <ExpandAllButton />
                </Col>
              </Row>
              <AccordionSet>
                <Accordion
                  id={CONTACT_PERSON_ACCORDIONS.NAME}
                  label={CONTACT_PERSON_ACCORDION_LABELS[CONTACT_PERSON_ACCORDIONS.NAME]}
                >
                  <ContactDetails
                    firstName={contact.firstName}
                    lastName={contact.lastName}
                    prefix={contact.prefix}
                    language={contact.language}
                    isInactive={contact.inactive}
                    categories={contactCategories}
                    notes={contact.notes}
                  />
                </Accordion>

                <Accordion
                  id={CONTACT_PERSON_ACCORDIONS.EMAILS}
                  label={CONTACT_PERSON_ACCORDION_LABELS[CONTACT_PERSON_ACCORDIONS.EMAILS]}
                >
                  <ContactEmails
                    categories={categories}
                    emails={contact.emails}
                  />
                </Accordion>

                <Accordion
                  id={CONTACT_PERSON_ACCORDIONS.PHONES}
                  label={CONTACT_PERSON_ACCORDION_LABELS[CONTACT_PERSON_ACCORDIONS.PHONES]}
                >
                  <ContactPhoneNumbers
                    categories={categories}
                    phoneNumbers={contact.phoneNumbers}
                  />
                </Accordion>

                <Accordion
                  id={CONTACT_PERSON_ACCORDIONS.URLS}
                  label={CONTACT_PERSON_ACCORDION_LABELS[CONTACT_PERSON_ACCORDIONS.URLS]}
                >
                  <ContactUrls
                    categories={categories}
                    urls={contact.urls}
                  />
                </Accordion>

                <Accordion
                  id={CONTACT_PERSON_ACCORDIONS.ADDRESSES}
                  label={CONTACT_PERSON_ACCORDION_LABELS[CONTACT_PERSON_ACCORDIONS.ADDRESSES]}
                >
                  <ContactAddresses
                    addresses={addresses}
                  />
                </Accordion>
              </AccordionSet>
            </AccordionStatus>
          </Col>
        </Row>
      </Pane>
    </HasCommand>
  );
};

ViewContact.propTypes = {
  onClose: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
  editUrl: PropTypes.string.isRequired,
  unassign: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object),
};

ViewContact.defaultProps = {
  categories: [],
};

export default ViewContact;
