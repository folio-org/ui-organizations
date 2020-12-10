import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  Accordion,
  AccordionSet,
  Icon,
  Layout,
} from '@folio/stripes/components';

import {
  hydrateAddresses,
  mixCategories,
} from '../../../common/utils';
import { VENDOR_CATEGORIES } from '../../../common/constants';

import ContactAddresses from '../../../contacts/ViewContact/ContactAddresses';
import ContactPersonPhones from '../../../ContactPeople/ContactPerson/ContactPersonPhones';
import ContactPersonEmails from '../../../ContactPeople/ContactPerson/ContactPersonEmails';
import ContactPersonURLs from '../../../ContactPeople/ContactPerson/ContactPersonURLs';

const UNCATEGORIZED_ID = 'uncategorized';
const filterByCatId = (catId) => ({ categories = [] }) => {
  return catId === UNCATEGORIZED_ID
    ? categories.length === 0
    : categories.includes(catId);
};

const OrganizationContactInfo = ({ organization, vendorCategories }) => {
  const intl = useIntl();

  if (!organization) {
    return (
      <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
    );
  }
  const cats = [
    ...vendorCategories,
    {
      id: UNCATEGORIZED_ID,
      value: 'Uncategorized',
    },
  ];

  const data = cats.reduce((acc, { id }) => {
    const filterCb = filterByCatId(id);
    const addresses = (organization.addresses || []).filter(filterCb);
    const emails = (organization.emails || []).filter(filterCb);
    const phoneNumbers = (organization.phoneNumbers || []).filter(filterCb);
    const urls = (organization.urls || []).filter(filterCb);

    if (addresses.length || emails.length || phoneNumbers.length || urls.length) {
      acc[id] = {
        addresses: hydrateAddresses(intl, vendorCategories, addresses),
        emails: mixCategories(intl, vendorCategories, emails),
        phoneNumbers: mixCategories(intl, vendorCategories, phoneNumbers),
        urls: mixCategories(intl, vendorCategories, urls),
      };
    }

    return acc;
  }, {});

  return (
    <Layout className="margin-start-gutter">
      <AccordionSet id="vendorCats">
        {cats.map((category, index) => data[category.id] && (
          <Accordion
            label={VENDOR_CATEGORIES[category.value]
              ? intl.formatMessage({
                id: `ui-organizations.contactInfo.vendorCategory.${VENDOR_CATEGORIES[category.value]}`,
                defaultMessage: category.value,
              })
              : category.value
            }
            id={category.id}
            closedByDefault
            key={category.id || index}
          >
            <ContactAddresses addresses={data[category.id].addresses} />
            <ContactPersonPhones phones={data[category.id].phoneNumbers} />
            <ContactPersonEmails emails={data[category.id].emails} />
            <ContactPersonURLs urls={data[category.id].urls} />
          </Accordion>
        ))}
      </AccordionSet>
    </Layout>
  );
};

OrganizationContactInfo.propTypes = {
  organization: PropTypes.object,
  vendorCategories: PropTypes.arrayOf(PropTypes.object),
};

OrganizationContactInfo.defaultProps = {
  vendorCategories: [],
};

export default OrganizationContactInfo;
