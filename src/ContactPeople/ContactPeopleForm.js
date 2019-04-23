import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual, isEmpty, find, get } from 'lodash';
import { FieldArray, getFormValues } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Button,
  Col,
  Icon,
  List,
  Row,
} from '@folio/stripes/components';

class ContactPeopleForm extends Component {
  static propTypes = {
    parentMutator: PropTypes.object,
    parentResources: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    orgId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.listComponent = this.listComponent.bind(this);
    this.listItem = this.listItem.bind(this);
    this.renderData = this.renderData.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { parentMutator, stripes: { store } } = props;
    const formValues = getFormValues('FormVendor')(store.getState());
    const contactArrProp = formValues.contacts;
    const contactArrState = state && state.contactArrState ? state.contactArrState : [];
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

  removeItem(index) {
    this.fields.remove(index);
  }

  getContactsUrl = (contactId) => {
    const { orgId } = this.props;
    const ending = contactId ? `/contacts/${contactId}/view` : '/contacts/add-contact';
    const starting = orgId ? `/organizations/${orgId}` : '/organizations';

    return `${starting}${ending}`;
  }

  renderData(valueID) {
    const { parentResources } = this.props;
    const contacts = ((parentResources || {}).contacts || {}).records || [];
    if (contacts.length === 0) return null;
    const item = find(contacts, { id: valueID });
    if (isEmpty(item)) return null;
    const fullName = `${get(item, 'prefix', '')} ${get(item, 'firstName', '')} ${get(item, 'lastName', '')}`;
    return (
      <Link to={this.getContactsUrl(valueID)}>
        {fullName}
      </Link>
    );
  }

  listItem(item, index) {
    const valueID = this.fields.get(index);
    return (
      <div key={index}>
        <li>
          {this.renderData(valueID)}
          <Button
            buttonStyle="fieldControl"
            align="end"
            type="button"
            id={`clickable-remove-button-${index}`}
            onClick={() => this.removeItem(index)}
          >
            <Icon icon="times-circle" />
          </Button>
        </li>
      </div>
    );
  }

  listComponent = ({ fields }) => {
    this.fields = fields;
    const itemFormatter = (item, index) => (this.listItem(item, index));
    const isEmptyMessage = 'No items to show';
    return (
      <List
        items={fields}
        itemFormatter={itemFormatter}
        isEmptyMessage={isEmptyMessage}
      />
    );
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Contacts" name="contacts" id="contacts" component={this.listComponent} />
          <br />
        </Col>
        <Col xs={12}>
          <Button
            buttonStyle="primary"
            to={this.getContactsUrl()}
          >
            <FormattedMessage id="ui-organizations.contactPeople.addContact" />
          </Button>
        </Col>
      </Row>
    );
  }
}

export default ContactPeopleForm;
