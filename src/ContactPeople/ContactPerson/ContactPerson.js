import React from 'react';
import PropTypes from 'prop-types';

import {
  hydrateAddresses,
  mixCategories,
  transformCategoryIdsToLables,
} from '../../common/utils';

import ContactPersonDetails from './ContactPersonDetails';
import ContactPersonAddresses from './ContactPersonAddresses';
import ContactPersonPhones from './ContactPersonPhones';
import ContactPersonEmails from './ContactPersonEmails';
import ContactPersonURLs from './ContactPersonURLs';

const ContactPerson = ({ contact, categories = [], withCollapsing = true }) => {
  const addresses = hydrateAddresses(categories, contact.addresses);
  const emails = mixCategories(categories, contact.emails);
  const phoneNumbers = mixCategories(categories, contact.phoneNumbers);
  const urls = mixCategories(categories, contact.urls);
  const contactCategories = transformCategoryIdsToLables(categories, contact.categories);

  return (
    <div data-test-contact-person>
      <ContactPersonDetails
        firstName={contact.firstName}
        lastName={contact.lastName}
        prefix={contact.prefix}
        language={contact.language}
        isInactive={contact.inactive}
        categories={contactCategories}
        notes={contact.notes}
      />

      <ContactPersonAddresses
        addresses={addresses}
        withCollapsing={withCollapsing}
      />

      <ContactPersonPhones
        phones={phoneNumbers}
        withCollapsing={withCollapsing}
      />

      <ContactPersonEmails
        emails={emails}
        withCollapsing={withCollapsing}
      />

      <ContactPersonURLs
        urls={urls}
        withCollapsing={withCollapsing}
      />
    </div>
  );
};

ContactPerson.propTypes = {
  contact: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object),
  withCollapsing: PropTypes.bool,
};

export default ContactPerson;
