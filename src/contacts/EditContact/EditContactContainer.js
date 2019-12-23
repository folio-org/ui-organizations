import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { get } from 'lodash';

import { Icon } from '@folio/stripes/components';
import { stripesConnect } from '@folio/stripes/core';

import {
  categoriesResource,
  contactResource,
  organizationResource,
} from '../../common/resources';
import { saveContact } from './util';
import EditContact from './EditContact';
import { getBackQuery } from '../../common/utils/createItem';
import { DICT_CATEGORIES } from '../../common/constants';

class EditContactContainer extends Component {
  static manifest = Object.freeze({
    contact: contactResource,
    [DICT_CATEGORIES]: categoriesResource,
    query: {},
    contactsOrg: organizationResource,
  });

  onClose = (contactId = this.props.match.params.id) => {
    const { orgId, mutator, onClose } = this.props;
    const query = getBackQuery(orgId, contactId, 'contacts');

    if (onClose) {
      onClose(orgId, contactId);
    } else mutator.query.replace(query);
  };

  onSubmit = (contact) => {
    const { mutator, resources, showMessage } = this.props;

    saveContact(mutator, contact, get(resources, 'contactsOrg.records.0'))
      .then(({ id }) => {
        showMessage('ui-organizations.contacts.message.saved.success', 'success');
        this.onClose(id);
      })
      .catch(() => showMessage('ui-organizations.contacts.message.saved.fail', 'error'));
  }

  render() {
    const { match, resources } = this.props;
    const isNew = !match.params.id;
    const loadedContact = get(resources, 'contact.records[0]');
    const categories = get(resources, `${DICT_CATEGORIES}.records`);

    if (!categories || (!isNew && !loadedContact)) {
      return (
        <Icon
          icon="spinner-ellipsis"
          width="100px"
        />
      );
    }
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
  match: ReactRouterPropTypes.match.isRequired,
  mutator: PropTypes.object,
  orgId: PropTypes.string,
  resources: PropTypes.object,
  showMessage: PropTypes.func,
  onClose: PropTypes.func,
};

export default stripesConnect(EditContactContainer);
