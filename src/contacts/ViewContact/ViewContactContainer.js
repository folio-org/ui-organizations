import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import ReactRouterPropTypes from 'react-router-prop-types';

import { stripesConnect } from '@folio/stripes/core';
import {
  ConfirmationModal,
  Icon,
} from '@folio/stripes/components';

import {
  categoriesResource,
  contactResource,
  organizationResource,
} from '../../common/resources';
import { DICT_CATEGORIES } from '../../common/constants';
import { getBackPath } from '../../common/utils/createItem';

import ViewContact from './ViewContact';
import {
  deleteContact,
  unassign,
} from './util';

class ViewContactContainer extends Component {
  static propTypes = {
    resources: PropTypes.object,
    baseUrl: PropTypes.string.isRequired,
    mutator: PropTypes.object,
    orgId: PropTypes.string,
    showMessage: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    onClose: PropTypes.func,
  };

  static manifest = Object.freeze({
    contact: contactResource,
    [DICT_CATEGORIES]: categoriesResource,
    organization: organizationResource,
  });

  state = {
    showConfirmDelete: false,
    showConfirmUnassign: false,
  };

  onClose = () => {
    const { orgId, history, onClose } = this.props;

    if (onClose) {
      onClose(orgId);
    } else {
      history.push(getBackPath(orgId, undefined, 'interface'));
    }
  };

  showConfirmUnassign = () => this.setState({ showConfirmUnassign: true });

  hideConfirmUnassign = () => this.setState({ showConfirmUnassign: false });

  showConfirmDelete = () => this.setState({ showConfirmDelete: true });

  hideConfirmDelete = () => this.setState({ showConfirmDelete: false });

  onUnassign = () => {
    const { match, mutator, resources, showMessage } = this.props;
    const org = get(resources, 'organization.records.0');
    const contactId = get(match, 'params.id');

    this.hideConfirmUnassign();
    unassign(mutator.organization, contactId, org)
      .then(() => showMessage('ui-organizations.contacts.message.unassigned.success'))
      .then(() => this.onClose())
      .catch(() => showMessage('ui-organizations.contacts.message.unassigned.fail', 'error'));
  }

  onDeleteContact = () => {
    const { match, mutator, resources, showMessage } = this.props;
    const org = get(resources, 'organization.records.0');
    const contactId = get(match, 'params.id');

    this.hideConfirmDelete();
    deleteContact(mutator.organization, mutator.contact, contactId, org)
      .then(() => this.onClose())
      .catch(() => showMessage('ui-organizations.contacts.message.deleted.fail', 'error'));
  }

  render() {
    const { resources, baseUrl } = this.props;
    const { showConfirmDelete, showConfirmUnassign } = this.state;

    const contact = get(resources, 'contact.records[0]', {});
    const contactCategories = get(resources, `${DICT_CATEGORIES}.records`);
    const editUrl = `${baseUrl}/${contact.id}/edit`;

    if (get(resources, 'contact.isPending', true) || !contactCategories) {
      return <Icon icon="spinner-ellipsis" />;
    }

    return (
      <React.Fragment>
        <ViewContact
          editUrl={editUrl}
          categories={contactCategories}
          contact={contact}
          deleteContact={this.showConfirmDelete}
          onClose={this.onClose}
          unassign={this.showConfirmUnassign}
        />
        {showConfirmUnassign && (
          <ConfirmationModal
            id="unassign-contact-modal"
            confirmLabel={<FormattedMessage id="ui-organizations.contacts.confirmUnassign.confirmLabel" />}
            heading={<FormattedMessage id="ui-organizations.contacts.confirmUnassign.heading" />}
            message={<FormattedMessage id="ui-organizations.contacts.confirmUnassign.message1" />}
            onCancel={this.hideConfirmUnassign}
            onConfirm={this.onUnassign}
            open
          />
        )}
        {showConfirmDelete && (
          <ConfirmationModal
            id="delete-contact-modal"
            confirmLabel={<FormattedMessage id="ui-organizations.contacts.confirmDelete.confirmLabel" />}
            heading={<FormattedMessage id="ui-organizations.contacts.confirmDelete.heading" />}
            message={<FormattedMessage id="ui-organizations.contacts.confirmDelete.message" />}
            onCancel={this.hideConfirmDelete}
            onConfirm={this.onDeleteContact}
            open
          />
        )}
      </React.Fragment>

    );
  }
}

export default stripesConnect(ViewContactContainer);
