import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { stripesConnect } from '@folio/stripes/core';
import { Icon } from '@folio/stripes/components';
import {
  batchFetch,
  useShowToast,
} from '@folio/stripes-acq-components';

import { baseContactsResource } from '../common/resources';
import ContactPeopleView from './ContactPeopleView';

const ContactPeopleViewContainer = ({
  contactsIds,
  history,
  match,
  mutator,
  vendorCategories,
}) => {
  const organizationId = match.params.id;
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();

  useEffect(() => {
    setContacts([]);
    if (contactsIds.length) {
      setIsLoading(true);
      batchFetch(mutator.orgContacts, contactsIds)
        .then(response => setContacts(response))
        .catch(() => {
          showToast('ui-organizations.contacts.actions.load.error', 'error');
        })
        .finally(() => setIsLoading(false));
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [contactsIds]);

  const openContact = useCallback(
    (e, { id }) => {
      const path = `/organizations/${organizationId}/contacts/${id}/view`;

      history.push(path);
    },
    [history, organizationId],
  );

  if (isLoading) {
    return (<Icon icon="spinner-ellipsis" />);
  }

  return (
    <ContactPeopleView
      contacts={contacts}
      openContact={openContact}
      vendorCategories={vendorCategories}
    />
  );
};

ContactPeopleViewContainer.manifest = Object.freeze({
  orgContacts: {
    ...baseContactsResource,
    accumulate: true,
    fetch: false,
  },
});

ContactPeopleViewContainer.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  mutator: PropTypes.object.isRequired,
  contactsIds: PropTypes.arrayOf(PropTypes.string),
  vendorCategories: PropTypes.arrayOf(PropTypes.object),
};

ContactPeopleViewContainer.defaultProps = {
  contactsIds: [],
  vendorCategories: [],
};

export default withRouter(stripesConnect(ContactPeopleViewContainer));
