import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { sortBy } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import {
  batchFetch,
  useShowCallout,
} from '@folio/stripes-acq-components';

import { baseContactsResource } from '../../../common/resources';

import OrganizationContactPeople from './OrganizationContactPeople';

const OrganizationContactPeopleContainer = ({
  contactsIds,
  history,
  match,
  mutator,
  vendorCategories,
}) => {
  const organizationId = match.params.id;
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowCallout();

  useEffect(
    () => {
      setIsLoading(true);
      batchFetch(mutator.organizationDetailsContacts, contactsIds)
        .then(contactsResponse => {
          const removedContacts = [...Array(contactsIds.length - contactsResponse.length)]
            .map(() => ({ isDeleted: true }));
          const orgContacts = [...removedContacts, ...contactsResponse];

          setContacts(sortBy(orgContacts, [({ lastName }) => lastName?.toLowerCase()]));
        })
        .catch(() => {
          setContacts([]);
          showToast({ messageId: 'ui-organizations.contacts.actions.load.error', type: 'error' });
        })
        .finally(() => setIsLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contactsIds, showToast],
  );

  const openContact = useCallback(
    (e, { id }) => {
      if (!id) return;

      const path = `/organizations/${organizationId}/contacts/details/${id}/view`;

      history.push(path);
    },
    [history, organizationId],
  );

  if (isLoading) {
    return (<Loading />);
  }

  return (
    <OrganizationContactPeople
      contacts={contacts}
      openContact={openContact}
      vendorCategories={vendorCategories}
    />
  );
};

OrganizationContactPeopleContainer.manifest = Object.freeze({
  organizationDetailsContacts: {
    ...baseContactsResource,
    accumulate: true,
    fetch: false,
  },
});

OrganizationContactPeopleContainer.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  mutator: PropTypes.object.isRequired,
  contactsIds: PropTypes.arrayOf(PropTypes.string),
  vendorCategories: PropTypes.arrayOf(PropTypes.object),
};

OrganizationContactPeopleContainer.defaultProps = {
  vendorCategories: [],
};

export default withRouter(stripesConnect(OrganizationContactPeopleContainer));
