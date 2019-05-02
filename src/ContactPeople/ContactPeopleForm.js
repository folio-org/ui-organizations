import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual, isEmpty, get } from 'lodash';
import { FieldArray, getFormValues } from 'redux-form';

import {
  Col,
  Row,
} from '@folio/stripes/components';


import ContactPeopleList from './ContactPeopleList';

class ContactPeopleForm extends Component {
  static propTypes = {
    parentMutator: PropTypes.object,
    parentResources: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    orgId: PropTypes.string,
  };

  state = {
    contactArrState: [],
  }

  static getDerivedStateFromProps(props, { contactArrState = [] }) {
    const { parentMutator, stripes: { store } } = props;
    const formValues = getFormValues('FormVendor')(store.getState());
    const contactArrProp = formValues.contacts;
    const queryContacts = (arr) => {
      if (isEmpty(arr)) return false;
      let newQuery = 'query=(id=null)';
      if (arr.length >= 1) {
        const items = arr.map(item => {
          return `id="${item}"`;
        });
        const buildQuery = items.join(' or ');
        newQuery = `query=(${buildQuery})`;
      }
      return parentMutator.queryCustom.update({ contactIDs: newQuery });
    };

    if (!isEqual(contactArrProp, contactArrState)) {
      queryContacts(contactArrProp);
      return { contactArrState: contactArrProp };
    }
    return null;
  }

  getContactsUrl = (contactId) => {
    const { orgId } = this.props;
    const ending = contactId ? `/contacts/${contactId}/view` : '/contacts/add-contact';
    const starting = orgId ? `/organizations/${orgId}` : '/organizations';

    return `${starting}${ending}`;
  }

  render() {
    const { orgId, parentResources, stripes } = this.props;
    const categoriesDict = get(parentResources, 'vendorCategory.records', []);
    const contactsMap = get(parentResources, 'contacts.records', []).reduce((acc, contact) => {
      acc[contact.id] = contact;
      return acc;
    }, {});

    return (
      <Row>
        <Col xs={12}>
          <FieldArray
            name="contacts"
            component={ContactPeopleList}
            props={{
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
}

export default ContactPeopleForm;
