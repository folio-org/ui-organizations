import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import ReactRouterPropTypes from 'react-router-prop-types';

import { Icon } from '@folio/stripes/components';
import { stripesConnect } from '@folio/stripes/core';

import { DICT_CATEGORIES } from '../../common/constants';
import { useTranslatedCategories } from '../../common/hooks';
import {
  categoriesResource,
  contactResource,
  organizationResource,
  privilegedContactResource,
} from '../../common/resources';
import { getBackPath } from '../../common/utils/createItem';
import { PRIVILEGED_CONTACT_URL_PATH } from '../constants';
import EditContact from './EditContact';
import { saveContact } from './util';

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
  const isPrivilegedContactUrl = match.path.includes(PRIVILEGED_CONTACT_URL_PATH);
  const contactResources = isPrivilegedContactUrl ? 'privilegedContact' : 'contact';
  const loadedContact = get(resources[contactResources], 'records[0]');
  const categories = resources?.[DICT_CATEGORIES]?.records;
  const [translatedCategories] = useTranslatedCategories(categories);
  const contactsOrganization = resources?.contactsOrg?.records?.[0];

  const onCloseForm = useCallback((contactId = match.params.id) => {
    if (onClose) {
      onClose(orgId, contactId);
    } else {
      history.push(getBackPath(orgId, contactId, isPrivilegedContactUrl ? PRIVILEGED_CONTACT_URL_PATH : 'contacts'));
    }
  }, [match.params.id, onClose, orgId, history, isPrivilegedContactUrl]);

  const onSubmit = useCallback(contactValues => {
    saveContact(mutator, contactValues, contactsOrganization, isPrivilegedContactUrl)
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
  privilegedContact: privilegedContactResource,
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
