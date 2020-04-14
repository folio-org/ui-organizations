import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';

import {
  Col,
  Loading,
  Row,
} from '@folio/stripes/components';
import {
  stripesConnect,
  stripesShape,
} from '@folio/stripes/core';
import { batchFetch } from '@folio/stripes-acq-components';

import {
  baseContactsResource,
  categoriesResource,
} from '../../../common/resources';
import { DICT_CATEGORIES } from '../../../common/constants';
import OrganizationContactPeopleList from './OrganizationContactPeopleList';

function OrganizationContactPeopleForm({ open, orgId, mutator, storedContactIds, stripes }) {
  const [categoriesDict, setCategoriesDict] = useState();
  const [contacts, setContacts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchContacts = useCallback(ids => {
    setIsLoading(true);
    batchFetch(mutator.contactsManualFetch, ids)
      .then(setContacts)
      .catch(() => {
        setContacts([]);
      })
      .finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    mutator[DICT_CATEGORIES].GET().then(setCategoriesDict);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => fetchContacts(storedContactIds), [fetchContacts, storedContactIds]);

  if (isLoading || !categoriesDict || !open) {
    return (
      <Loading />
    );
  }

  const contactsMap = contacts.reduce((acc, contact) => {
    acc[contact.id] = contact;

    return acc;
  }, {});

  return (
    <Row>
      <Col xs={12}>
        <FieldArray
          name="contacts"
          component={OrganizationContactPeopleList}
          props={{
            fetchContacts,
            categoriesDict,
            contactsMap,
            orgId,
            stripes,
          }}
        />
      </Col>
    </Row>
  );
}

OrganizationContactPeopleForm.manifest = Object.freeze({
  [DICT_CATEGORIES]: {
    ...categoriesResource,
    accumulate: true,
    fetch: false,
  },
  contactsManualFetch: {
    ...baseContactsResource,
    accumulate: true,
    fetch: false,
  },
});

OrganizationContactPeopleForm.propTypes = {
  mutator: PropTypes.object.isRequired,
  open: PropTypes.bool,
  orgId: PropTypes.string,
  storedContactIds: PropTypes.arrayOf(PropTypes.string),
  stripes: stripesShape.isRequired,
};

export default stripesConnect(OrganizationContactPeopleForm);
