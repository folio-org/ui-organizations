import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';

import {
  Col,
  Icon,
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

function OrganizationContactPeopleForm({ orgId, mutator, storedContactIds, stripes }) {
  const [categoriesDict, setCategoriesDict] = useState();
  const [contacts, setContacts] = useState();

  const fetchContacts = useCallback(ids => {
    batchFetch(mutator.contactsManualFetch, ids || [])
      .then(setContacts);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    mutator[DICT_CATEGORIES].GET().then(setCategoriesDict);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => fetchContacts(storedContactIds), [fetchContacts, storedContactIds]);

  const isLoading = !(categoriesDict && contacts);

  if (isLoading) {
    return (
      <Icon
        icon="spinner-ellipsis"
        width="100px"
      />
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
  orgId: PropTypes.string,
  storedContactIds: PropTypes.arrayOf(PropTypes.string),
  stripes: stripesShape.isRequired,
};

export default stripesConnect(OrganizationContactPeopleForm);
