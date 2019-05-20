import React from 'react';
import PropTypes from 'prop-types';
import { get, cloneDeep } from 'lodash';

import { transformCategoryIdsToLables } from '../../common/utils/category';

import ContactPersonDetails from './ContactPersonDetails';
import ContactPersonAddresses from './ContactPersonAddresses';
import ContactPersonPhones from './ContactPersonPhones';
import ContactPersonEmails from './ContactPersonEmails';
import ContactPersonURLs from './ContactPersonURLs';

const ContactPerson = ({ contact, categories, withCollapsing }) => {
  const addresses = get(contact, 'addresses', []).map(address => {
    const updatedAddress = cloneDeep(address);

    updatedAddress.primaryAddress = address.isPrimary;
    updatedAddress.categories = transformCategoryIdsToLables(categories, address.categories);

    return updatedAddress;
  });

  const emails = get(contact, 'emails', []).map(email => {
    const updatedEmail = cloneDeep(email);

    updatedEmail.categories = transformCategoryIdsToLables(categories, email.categories);

    return updatedEmail;
  });

  const phoneNumbers = get(contact, 'phoneNumbers', []).map(phone => {
    const updatedPhone = cloneDeep(phone);

    updatedPhone.categories = transformCategoryIdsToLables(categories, phone.categories);

    return updatedPhone;
  });

  const urls = get(contact, 'urls', []).map(url => {
    const updatedUrl = cloneDeep(url);

    updatedUrl.categories = transformCategoryIdsToLables(categories, url.categories);

    return updatedUrl;
  });

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

ContactPerson.defaultProps = {
  categories: [],
  withCollapsing: true,
};

export default ContactPerson;
