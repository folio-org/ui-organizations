import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

import {
  ConfirmationModal,
  Icon,
} from '@folio/stripes/components';

import {
  categoriesResource,
  contactResource,
  organizationResource,
} from '../../common/resources';
import ViewContact from './ViewContact';
import {
  unassign,
} from './util';

class ViewContactContainer extends Component {
  static propTypes = {
    history: PropTypes.object,
    resources: PropTypes.object,
    baseUrl: PropTypes.string.isRequired,
    mutator: PropTypes.object,
    // eslint-disable-next-line react/no-unused-prop-types
    orgId: PropTypes.string,
    showMessage: PropTypes.func.isRequired,
    match: PropTypes.object,
  };

  static manifest = Object.freeze({
    contact: contactResource,
    categories: categoriesResource,
    organization: organizationResource,
  });

  state = {
    showConfirmUnassign: false,
  };

  onClose = () => {
    this.props.history.goBack();
  };

  showConfirmUnassign = () => this.setState({ showConfirmUnassign: true });

  hideConfirmUnassign = () => this.setState({ showConfirmUnassign: false });

  onUnassign = () => {
    const { match, mutator, resources, showMessage } = this.props;
    const org = get(resources, 'organization.records.0');
    const contactId = get(match, 'params.id');

    this.hideConfirmUnassign();
    unassign(mutator.organization, contactId, org)
      .then(() => showMessage('ui-organizations.contacts.message.unassigned.success'))
      .catch(() => showMessage('ui-organizations.contacts.message.unassigned.fail', 'error'));
  }

  render() {
    const { resources, baseUrl } = this.props;
    const { showConfirmUnassign } = this.state;

    const contact = get(resources, 'contact.records[0]', {});
    const categories = get(resources, 'categories.records', []);

    if (get(resources, 'contact.isPending', true)) {
      return <Icon icon="spinner-ellipsis" />;
    }

    return (
      <React.Fragment>
        <ViewContact
          categories={categories}
          onClose={this.onClose}
          contact={contact}
          baseUrl={baseUrl}
          unassign={this.showConfirmUnassign}
        />
        {showConfirmUnassign && (
          <ConfirmationModal
            id="unassign-contact-modal"
            confirmLabel={<FormattedMessage id="ui-organizations.contacts.confirmUnassign.confirmLabel" />}
            heading={<FormattedMessage id="ui-organizations.contacts.confirmUnassign.heading" />}
            message={<FormattedMessage id="ui-organizations.contacts.confirmUnassign.message" />}
            onCancel={this.hideConfirmUnassign}
            onConfirm={this.onUnassign}
            open
          />
        )}
      </React.Fragment>

    );
  }
}

export default ViewContactContainer;
