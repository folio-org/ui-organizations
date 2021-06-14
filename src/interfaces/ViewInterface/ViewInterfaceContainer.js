import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import ReactRouterPropTypes from 'react-router-prop-types';

import { ConfirmationModal, Icon } from '@folio/stripes/components';
import { stripesConnect } from '@folio/stripes/core';

import ViewInterface from './ViewInterface';
import {
  interfaceCredentialsResource,
  interfaceResource,
  organizationResource,
} from '../../common/resources';
import { getResourceDataItem } from '../../common/utils';
import { getBackPath } from '../../common/utils/createItem';

import { deleteInterface, unassignInterface } from './util';

export function ViewInterfaceContainer({
  baseUrl,
  history,
  match,
  mutator,
  orgId,
  resources,
  showMessage,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmUnassign, setConfirmUnassign] = useState(false);

  const onClose = useCallback(() => {
    history.push(getBackPath(orgId, undefined, 'interface'));
  }, [history, orgId]);

  const showConfirmUnassign = useCallback(() => setConfirmUnassign(true), []);

  const hideConfirmUnassign = useCallback(() => setConfirmUnassign(false), []);

  const showConfirmDelete = useCallback(() => setConfirmDelete(true), []);

  const hideConfirmDelete = useCallback(() => setConfirmDelete(false), []);

  const org = get(resources, 'organization.records.0');
  const interfaceId = get(match, 'params.id');
  const onUnassign = useCallback(() => {
    hideConfirmUnassign();
    unassignInterface(mutator.organization, interfaceId, org)
      .then(() => onClose())
      .catch(() => showMessage('ui-organizations.interface.message.unassigned.fail', 'error'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideConfirmUnassign, interfaceId, onClose, org, showMessage]);

  const onDelete = useCallback(() => {
    hideConfirmDelete();
    deleteInterface(mutator.organization, mutator.vendorInterface, interfaceId, org)
      .then(() => onClose())
      .catch(() => showMessage('ui-organizations.interface.message.delete.fail', 'error'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideConfirmDelete, interfaceId, onClose, org, showMessage]);

  const getCreds = useCallback(() => getResourceDataItem(resources, 'interfaceCredentials'), [resources]);

  const currentInterface = get(resources, 'vendorInterface.records[0]', {});

  if (get(resources, 'vendorInterface.isPending', true)) {
    return <Icon icon="spinner-ellipsis" />;
  }

  return (
    <>
      <ViewInterface
        baseUrl={baseUrl}
        item={currentInterface}
        deleteInterface={showConfirmDelete}
        onClose={onClose}
        unassign={showConfirmUnassign}
        getCreds={getCreds}
      />
      {confirmUnassign && (
        <ConfirmationModal
          id="unassign-interface-modal"
          confirmLabel={<FormattedMessage id="ui-organizations.interface.confirmUnassign.confirmLabel" />}
          heading={<FormattedMessage id="ui-organizations.interface.confirmUnassign.heading" />}
          message={<FormattedMessage id="ui-organizations.interface.confirmUnassign.message1" />}
          onCancel={hideConfirmUnassign}
          onConfirm={onUnassign}
          open
        />
      )}
      {confirmDelete && (
        <ConfirmationModal
          id="delete-interface-modal"
          confirmLabel={<FormattedMessage id="ui-organizations.interface.confirmDelete.confirmLabel" />}
          heading={<FormattedMessage id="ui-organizations.interface.confirmDelete.heading" />}
          message={<FormattedMessage id="ui-organizations.interface.confirmDelete.message" />}
          onCancel={hideConfirmDelete}
          onConfirm={onDelete}
          open
        />
      )}
    </>
  );
}

ViewInterfaceContainer.manifest = Object.freeze({
  interfaceCredentials: interfaceCredentialsResource,
  organization: organizationResource,
  vendorInterface: interfaceResource,
});

ViewInterfaceContainer.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  mutator: PropTypes.object,
  orgId: PropTypes.string,
  resources: PropTypes.object,
  showMessage: PropTypes.func.isRequired,
};

export default stripesConnect(ViewInterfaceContainer);
