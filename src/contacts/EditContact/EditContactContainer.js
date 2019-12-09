import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { get } from 'lodash';

import {
  categoriesResource,
  contactResource,
} from '../../common/resources';
import { saveContact } from './util';
import EditContact from './EditContact';
import { getBackQuery } from '../../common/utils/createItem';

class EditContactContainer extends Component {
  static manifest = Object.freeze({
    contact: contactResource,
    categories: categoriesResource,
    query: {},
  });

  onClose = (contactId = this.props.match.params.id) => {
    const { orgId, mutator } = this.props;
    const query = getBackQuery(orgId, contactId, 'contacts');

    mutator.query.replace(query);
  };

  onSubmit = (contact) => {
    const { mutator, showMessage } = this.props;

    saveContact(mutator.contact, contact)
      .then(({ id }) => {
        showMessage('ui-organizations.contacts.message.saved.success', 'success');
        this.onClose(id);
      })
      .catch(() => showMessage('ui-organizations.contacts.message.saved.fail', 'error'));
  }

  render() {
    const { match, resources } = this.props;
    const isNew = !match.params.id;
    const loadedContact = get(resources, 'contact.records[0]', {});
    const categories = get(resources, 'categories.records', []);
    const contact = isNew ? {} : loadedContact;
    const { firstName, lastName } = contact;
    const name = `${lastName}, ${firstName}`;
    const paneTitle = isNew
      ? <FormattedMessage id="ui-organizations.contacts.create.paneTitle" />
      : <FormattedMessage id="ui-organizations.contacts.edit.paneTitle" values={{ name }} />;

    return (
      <EditContact
        categories={categories}
        initialValues={contact}
        onClose={this.onClose}
        onSubmit={this.onSubmit}
        paneTitle={paneTitle}
      />
    );
  }
}

EditContactContainer.propTypes = {
  match: PropTypes.object,
  mutator: PropTypes.object,
  orgId: PropTypes.string,
  resources: PropTypes.object,
  showMessage: PropTypes.func,
};

export default EditContactContainer;
