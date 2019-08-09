import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Icon, Row, Col } from '@folio/stripes/components';

import { transformCategoryIdsToLables } from '../common/utils/category';
import ContactPersonAddresses from '../ContactPeople/ContactPerson/ContactPersonAddresses';
import ContactPersonPhones from '../ContactPeople/ContactPerson/ContactPersonPhones';
import ContactPersonEmails from '../ContactPeople/ContactPerson/ContactPersonEmails';
import ContactPersonURLs from '../ContactPeople/ContactPerson/ContactPersonURLs';
import ContactInfoAddress from './ContactInfoAddress';

const renderAddress = (address, i) => <ContactInfoAddress address={address} key={i} />;

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
    <Row>
      <Col xs={12}>
        <ContactPersonAddresses
          addresses={addresses}
          renderAddress={renderAddress}
        />
        <ContactPersonPhones phones={phoneNumbers} />
        <ContactPersonEmails emails={emails} />
        <ContactPersonURLs urls={urls} />
      </Col>
    </Row>
  );
};

ContactInformationView.propTypes = {
  initialValues: PropTypes.object,
  parentResources: PropTypes.object.isRequired,
};

export default ContactInformationView;
