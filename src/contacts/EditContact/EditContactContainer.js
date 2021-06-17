import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { Icon } from '@folio/stripes/components';
import { stripesConnect } from '@folio/stripes/core';

import {
  categoriesResource,
  contactResource,
  organizationResource,
} from '../../common/resources';
import { saveContact } from './util';
import EditContact from './EditContact';
import { getBackPath } from '../../common/utils/createItem';
import { DICT_CATEGORIES } from '../../common/constants';
import { useTranslatedCategories } from '../../common/hooks';

export const EditContactContainer = ({
  history,
  match,
  mutator,
  onClose,
  orgId,
  resources,
  showMessage,
}) => {
  const isNew = !match.params.id;
  const loadedContact = resources?.contact?.records?.[0];
  const categories = resources?.[DICT_CATEGORIES]?.records;
  const [translatedCategories] = useTranslatedCategories(categories);
  const contactsOrganization = resources?.contactsOrg?.records?.[0];

  const onCloseForm = useCallback((contactId = match.params.id) => {
    if (onClose) {
      onClose(orgId, contactId);
    } else {
      history.push(getBackPath(orgId, contactId, 'contacts'));
    }
  }, [match.params.id, onClose, history, orgId]);

  const onSubmit = useCallback(contactValues => {
    saveContact(mutator, contactValues, contactsOrganization)
      .then(({ id }) => {
        showMessage('ui-organizations.contacts.message.saved.success', 'success');
        onCloseForm(id);
      })
      .catch(() => showMessage('ui-organizations.contacts.message.saved.fail', 'error'));
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [showMessage, onCloseForm, contactsOrganization]);

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
      categories={translatedCategories}
      initialValues={contact}
      onClose={onCloseForm}
      onSubmit={onSubmit}
      paneTitle={paneTitle}
    />
  );
};

EditContactContainer.manifest = Object.freeze({
  contact: contactResource,
  [DICT_CATEGORIES]: categoriesResource,
  contactsOrg: organizationResource,
});

EditContactContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  mutator: PropTypes.object,
  orgId: PropTypes.string,
  resources: PropTypes.object,
  showMessage: PropTypes.func,
  onClose: PropTypes.func,
};

export default stripesConnect(EditContactContainer);
