import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import {
  Accordion,
  Layout,
} from '@folio/stripes/components';
import { useCategories } from '@folio/stripes-acq-components';

import {
  UNCATEGORIZED_ID,
  UNCATEGORIZED_VALUE,
} from '../../../../common/constants';
import {
  hydrateAddresses,
  mixCategories,
} from '../../../../common/utils';
import {
  ContactAddressesVersionView,
  ContactPersonEmailsVersionView,
  ContactPersonPhonesVersionView,
  ContactPersonURLsVersionView,
} from './components';

const setInitialArrayFieldPaths = (obj, paths) => {
  return paths.reduce((result, path) => {
    const target = get(result, path);

    target.forEach((item, indx) => {
      item._initialFieldPath = `${path}[${indx}]`;
    });

    return result;
  }, cloneDeep(obj ?? {}));
};

export const OrganizationContactInfoVersionView = ({ version: currentVersion }) => {
  /*
    Entities are grouped by categories, so the order in the arrays is not guaranteed.
    So we need to keep the initial field paths
  */
  const version = setInitialArrayFieldPaths(currentVersion, ['addresses', 'emails', 'phoneNumbers', 'urls']);

  const { categories } = useCategories();

  const groups = useMemo(() => [
    ...(categories ?? []),
    {
      id: UNCATEGORIZED_ID,
      value: UNCATEGORIZED_VALUE,
    },
  ], [categories]);

  const data = useMemo(() => groups.reduce((acc, { id }) => {
    const filterCb = ({ categories: entityCategories = [] }) => {
      return id === UNCATEGORIZED_ID ? entityCategories.length === 0 : entityCategories.includes(id);
    };

    const addresses = (version?.addresses || []).filter(filterCb);
    const emails = (version?.emails || []).filter(filterCb);
    const phoneNumbers = (version?.phoneNumbers || []).filter(filterCb);
    const urls = (version?.urls || []).filter(filterCb);

    if (addresses.length || emails.length || phoneNumbers.length || urls.length) {
      acc[id] = {
        addresses: hydrateAddresses(categories, addresses),
        emails: mixCategories(categories, emails),
        phoneNumbers: mixCategories(categories, phoneNumbers),
        urls: mixCategories(categories, urls),
      };
    }

    return acc;
  }, {}), [categories, groups, version]);

  return (
    <Layout className="margin-start-gutter">
      {groups.map((category) => data[category.id] && (
        <Accordion
          key={category.id}
          label={category.value}
          id={category.id}
        >
          <ContactAddressesVersionView addresses={data[category.id].addresses} />
          <ContactPersonPhonesVersionView phones={data[category.id].phoneNumbers} />
          <ContactPersonEmailsVersionView
            name="emails"
            emails={data[category.id].emails}
          />
          <ContactPersonURLsVersionView
            name="urls"
            urls={data[category.id].urls}
          />
        </Accordion>
      ))}
    </Layout>
  );
};

OrganizationContactInfoVersionView.propTypes = {
  version: PropTypes.object,
};
