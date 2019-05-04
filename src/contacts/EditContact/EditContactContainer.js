import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { get } from 'lodash';

import {
  categoriesResource,
  contactResource,
} from '../../common/resources';
import { saveContact } from '../ViewContact/util';
import EditContact from './EditContact';

class EditContactContainer extends Component {
  static manifest = Object.freeze({
    contact: contactResource,
    categories: categoriesResource,
  });

  onSubmit = (contact) => {
    const { mutator, onClose, showMessage } = this.props;

    saveContact(mutator.contact, contact)
      .then(() => showMessage('ui-organizations.contacts.message.saved.success', 'success'))
      .then(() => onClose())
      .catch(() => showMessage('ui-organizations.contacts.message.saved.fail', 'error'));
  }

  render() {
    const { onClose, match, resources, stripes } = this.props;
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
        onClose={onClose}
        onSubmit={this.onSubmit}
        paneTitle={paneTitle}
        stripes={stripes}
      />
    );
  }
}

EditContactContainer.propTypes = {
  match: PropTypes.object,
  mutator: PropTypes.object,
  onClose: PropTypes.func,
  resources: PropTypes.object,
  showMessage: PropTypes.func,
  stripes: PropTypes.object,
};

export default EditContactContainer;
