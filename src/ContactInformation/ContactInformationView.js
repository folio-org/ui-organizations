import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  AccordionSet,
  Icon,
  Layout,
} from '@folio/stripes/components';

import {
  hydrateAddresses,
  mixCategories,
} from '../common/utils';
import ContactPersonAddresses from '../ContactPeople/ContactPerson/ContactPersonAddresses';
import ContactPersonPhones from '../ContactPeople/ContactPerson/ContactPersonPhones';
import ContactPersonEmails from '../ContactPeople/ContactPerson/ContactPersonEmails';
import ContactPersonURLs from '../ContactPeople/ContactPerson/ContactPersonURLs';
import ContactInfoAddress from './ContactInfoAddress';

const UNCATEGORIZED_ID = 'uncategorized';
const renderAddress = (address, i) => <ContactInfoAddress address={address} key={i} />;
const filterByCatId = (catId) => ({ categories = [] }) => {
  return catId === UNCATEGORIZED_ID
    ? categories.length === 0
    : categories.includes(catId);
};

const ContactInformationView = ({ organization, vendorCategories }) => {
  if (!organization) {
    return (
      <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
    );
  }
  const cats = [
    ...vendorCategories,
    {
      id: UNCATEGORIZED_ID,
      value: <FormattedMessage id="ui-organizations.contactInfo.vendorCategory.uncategorized" />,
    },
  ];

  const data = cats.reduce((acc, { id }) => {
    const filterCb = filterByCatId(id);
    const addresses = organization.addresses.filter(filterCb);
    const emails = organization.emails.filter(filterCb);
    const phoneNumbers = organization.phoneNumbers.filter(filterCb);
    const urls = organization.urls.filter(filterCb);

    if (addresses.length || emails.length || phoneNumbers.length || urls.length) {
      acc[id] = {
        addresses: hydrateAddresses(vendorCategories, addresses),
        emails: mixCategories(vendorCategories, emails),
        phoneNumbers: mixCategories(vendorCategories, phoneNumbers),
        urls: mixCategories(vendorCategories, urls),
      };
    }

    return acc;
  }, {});

  return (
    <Layout className="margin-start-gutter">
      <AccordionSet id="vendorCats">
        {cats.map((category, index) => data[category.id] && (
          <Accordion
            label={category.value}
            id={category.id}
            closedByDefault
            key={category.id || index}
          >
            <ContactPersonAddresses
              addresses={data[category.id].addresses}
              renderAddress={renderAddress}
            />
            <ContactPersonPhones phones={data[category.id].phoneNumbers} />
            <ContactPersonEmails emails={data[category.id].emails} />
            <ContactPersonURLs urls={data[category.id].urls} />
          </Accordion>
        ))}
      </AccordionSet>
    </Layout>
  );
};

ContactInformationView.propTypes = {
  organization: PropTypes.object,
  vendorCategories: PropTypes.arrayOf(PropTypes.object),
};

ContactInformationView.defaultProps = {
  vendorCategories: [],
};

export default ContactInformationView;
