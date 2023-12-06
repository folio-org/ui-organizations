import React, { useCallback, useMemo, useState } from 'react';
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
  privilegedContactResource,
} from '../../common/resources';
import { DICT_CATEGORIES } from '../../common/constants';
import { getBackPath } from '../../common/utils/createItem';
import { useTranslatedCategories } from '../../common/hooks';

import ViewContact from './ViewContact';
import {
  deleteContact,
  unassign,
} from './util';
import { PRIVILEGED_CONTACT_URL_PATH } from '../constants';

export function ViewContactContainer({
  baseUrl,
  history,
  match,
  mutator,
  onClose,
  orgId,
  resources,
  showMessage,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmUnassign, setConfirmUnassign] = useState(false);
  const isPrivilegedContactUrl = match.path.includes(PRIVILEGED_CONTACT_URL_PATH);

  const _onClose = useCallback(() => {
    if (onClose) {
      onClose(orgId);
    } else {
      history.push(getBackPath(orgId, undefined, 'interface'));
    }
  }, [history, onClose, orgId]);

  const showConfirmUnassign = useCallback(() => setConfirmUnassign(true), []);

  const hideConfirmUnassign = useCallback(() => setConfirmUnassign(false), []);

  const showConfirmDelete = useCallback(() => setConfirmDelete(true), []);

  const hideConfirmDelete = useCallback(() => setConfirmDelete(false), []);

  const org = get(resources, 'organization.records.0');
  const contactId = get(match, 'params.id');

  const onUnassign = useCallback(() => {
    hideConfirmUnassign();
    unassign(mutator.organization, contactId, org)
      .then(() => showMessage('ui-organizations.contacts.message.unassigned.success'))
      .then(() => _onClose())
      .catch(() => showMessage('ui-organizations.contacts.message.unassigned.fail', 'error'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_onClose, contactId, hideConfirmUnassign, org, showMessage]);

  const onDeleteContact = useCallback(() => {
    const contactMutator = isPrivilegedContactUrl ? mutator.privilegedContact : mutator.contact;

    hideConfirmDelete();
    deleteContact(mutator.organization, contactMutator, contactId, org)
      .then(() => _onClose())
      .catch(() => showMessage('ui-organizations.contacts.message.deleted.fail', 'error'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_onClose, contactId, hideConfirmDelete, org, showMessage]);

  const contact = useMemo(() => {
    if (isPrivilegedContactUrl) {
      return get(resources, 'privilegedContact.records[0]', {});
    }

    return get(resources, 'contact.records[0]', {});
  }, [isPrivilegedContactUrl, resources]);
  const contactCategories = get(resources, `${DICT_CATEGORIES}.records`);
  const [translatedCategories] = useTranslatedCategories(contactCategories);
  const editUrl = `${baseUrl}/${contact.id}/edit`;

  if (get(resources, 'contact.isPending', true) || !contactCategories) {
    return <Icon icon="spinner-ellipsis" />;
  }

  return (
    <>
      <ViewContact
        editUrl={editUrl}
        categories={translatedCategories}
        contact={contact}
        deleteContact={showConfirmDelete}
        onClose={_onClose}
        unassign={showConfirmUnassign}
      />
      {confirmUnassign && (
        <ConfirmationModal
          id="unassign-contact-modal"
          confirmLabel={<FormattedMessage id="ui-organizations.contacts.confirmUnassign.confirmLabel" />}
          heading={<FormattedMessage id="ui-organizations.contacts.confirmUnassign.heading" />}
          message={<FormattedMessage id="ui-organizations.contacts.confirmUnassign.message1" />}
          onCancel={hideConfirmUnassign}
          onConfirm={onUnassign}
          open
        />
      )}
      {confirmDelete && (
        <ConfirmationModal
          id="delete-contact-modal"
          confirmLabel={<FormattedMessage id="ui-organizations.contacts.confirmDelete.confirmLabel" />}
          heading={<FormattedMessage id="ui-organizations.contacts.confirmDelete.heading" />}
          message={<FormattedMessage id="ui-organizations.contacts.confirmDelete.message" />}
          onCancel={hideConfirmDelete}
          onConfirm={onDeleteContact}
          open
        />
      )}
    </>

  );
}

ViewContactContainer.manifest = Object.freeze({
  contact: contactResource,
  [DICT_CATEGORIES]: categoriesResource,
  organization: organizationResource,
  privilegedContact: privilegedContactResource,
});

ViewContactContainer.propTypes = {
  resources: PropTypes.object,
  baseUrl: PropTypes.string.isRequired,
  mutator: PropTypes.object,
  orgId: PropTypes.string,
  showMessage: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  onClose: PropTypes.func,
};

export default stripesConnect(ViewContactContainer);
