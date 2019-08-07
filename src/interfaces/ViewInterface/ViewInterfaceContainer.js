import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { ConfirmationModal, Icon } from '@folio/stripes/components';

import ViewInterface from './ViewInterface';
import {
  interfaceCredentialsResource,
  interfaceResource,
  organizationResource,
} from '../../common/resources';
import { getResourceDataItem } from '../../common/utils';
import { deleteInterface, unassignInterface } from './util';

export class ViewInterfaceContainer extends Component {
  static propTypes = {
    resources: PropTypes.object,
    baseUrl: PropTypes.string.isRequired,
    orgId: PropTypes.string,
    mutator: PropTypes.object,
    match: PropTypes.object,
    showMessage: PropTypes.func.isRequired,
  };

  static manifest = Object.freeze({
    interfaceCredentials: interfaceCredentialsResource,
    organization: organizationResource,
    query: {},
    vendorInterface: interfaceResource,
  });

  state = {
    showConfirmDelete: false,
    showConfirmUnassign: false,
  };

  onClose = () => {
    const { orgId, mutator } = this.props;

    mutator.query.replace({
      _path: orgId ? `/organizations/view/${orgId}` : '/organizations',
      layer: orgId ? 'edit' : 'create',
    });
  };

  showConfirmUnassign = () => this.setState({ showConfirmUnassign: true });

  hideConfirmUnassign = () => this.setState({ showConfirmUnassign: false });

  showConfirmDelete = () => this.setState({ showConfirmDelete: true });

  hideConfirmDelete = () => this.setState({ showConfirmDelete: false });

  onUnassign = () => {
    const { match, mutator, resources, showMessage } = this.props;
    const org = get(resources, 'organization.records.0');
    const interfaceId = get(match, 'params.id');

    this.hideConfirmUnassign();
    unassignInterface(mutator.organization, interfaceId, org)
      .then(() => this.onClose())
      .catch(() => showMessage('ui-organizations.interface.message.unassigned.fail', 'error'));
  };

  onDelete = () => {
    const { match, mutator, resources, showMessage } = this.props;
    const org = get(resources, 'organization.records.0');
    const interfaceId = get(match, 'params.id');

    this.hideConfirmDelete();
    deleteInterface(mutator.organization, mutator.vendorInterface, interfaceId, org)
      .then(() => this.onClose())
      .catch(() => showMessage('ui-organizations.interface.message.delete.fail', 'error'));
  };

  getCreds = () => getResourceDataItem(this.props.resources, 'interfaceCredentials');

  render() {
    const { resources, baseUrl } = this.props;

    const currentInterface = get(resources, 'vendorInterface.records[0]', {});

    if (get(resources, 'vendorInterface.isPending', true)) {
      return <Icon icon="spinner-ellipsis" />;
    }

    const { showConfirmDelete, showConfirmUnassign } = this.state;

    return (
      <React.Fragment>
        <ViewInterface
          baseUrl={baseUrl}
          item={currentInterface}
          deleteInterface={this.showConfirmDelete}
          onClose={this.onClose}
          unassign={this.showConfirmUnassign}
          getCreds={this.getCreds}
        />
        {showConfirmUnassign && (
          <ConfirmationModal
            id="unassign-interface-modal"
            confirmLabel={<FormattedMessage id="ui-organizations.interface.confirmUnassign.confirmLabel" />}
            heading={<FormattedMessage id="ui-organizations.interface.confirmUnassign.heading" />}
            message={<FormattedMessage id="ui-organizations.interface.confirmUnassign.message1" />}
            onCancel={this.hideConfirmUnassign}
            onConfirm={this.onUnassign}
            open
          />
        )}
        {showConfirmDelete && (
          <ConfirmationModal
            id="delete-interface-modal"
            confirmLabel={<FormattedMessage id="ui-organizations.interface.confirmDelete.confirmLabel" />}
            heading={<FormattedMessage id="ui-organizations.interface.confirmDelete.heading" />}
            message={<FormattedMessage id="ui-organizations.interface.confirmDelete.message" />}
            onCancel={this.hideConfirmDelete}
            onConfirm={this.onDelete}
            open
          />
        )}
      </React.Fragment>
    );
  }
}

export default ViewInterfaceContainer;
