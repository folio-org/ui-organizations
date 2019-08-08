import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Icon } from '@folio/stripes/components';

import { transformCategoryIdsToLables } from '../common/utils/category';
import ContactInfoAddresses from './ContactInfoAddresses';
import ContactPersonPhones from '../ContactPeople/ContactPerson/ContactPersonPhones';
import ContactPersonEmails from '../ContactPeople/ContactPerson/ContactPersonEmails';
import ContactPersonURLs from '../ContactPeople/ContactPerson/ContactPersonURLs';

const mixCategories = (categories, items = []) => items.map((item) => ({
  ...item,
  categories: transformCategoryIdsToLables(categories, item.categories),
}));

const ContactInformationView = ({ initialValues, parentResources }) => {
  const categories = get(parentResources, 'vendorCategory.records', []);

  if (!initialValues) {
    return (
      <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
    );
  }

  const addresses = mixCategories(categories, initialValues.addresses).map(address => ({
    ...address,
    primaryAddress: address.isPrimary,
  }));

  const emails = mixCategories(categories, initialValues.emails);
  const phoneNumbers = mixCategories(categories, initialValues.phoneNumbers);
  const urls = mixCategories(categories, initialValues.urls);

  return (
    <div style={{ width: '100%' }}>
      <ContactInfoAddresses addresses={addresses} />
      <ContactPersonPhones phones={phoneNumbers} />
      <ContactPersonEmails emails={emails} />
      <ContactPersonURLs urls={urls} />
    </div>
  );
};

ContactInformationView.propTypes = {
  initialValues: PropTypes.object,
  parentResources: PropTypes.object.isRequired,
};

export default ContactInformationView;
