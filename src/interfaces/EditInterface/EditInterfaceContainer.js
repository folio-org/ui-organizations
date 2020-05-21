import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';

import {
  interfaceCredentialsResource,
  interfaceResource,
  organizationResource,
} from '../../common/resources';
import { saveInterface } from './util';
import EditInterface from './EditInterface';
import {
  deliveryMethodDD,
  formatDD,
} from './const';
import { getBackPath } from '../../common/utils/createItem';

function EditInterfaceContainer({ orgId, history, match: { params }, mutator, resources, showMessage, stripes }) {
  const { interfaceCredentials } = resources || {};
  const interfaceOrg = get(resources, 'interfaceOrg.records.0');

  const getCreds = useCallback(() => {
    return (!get(interfaceCredentials, 'failed') && get(interfaceCredentials, 'records.0')) || {};
  }, [interfaceCredentials]);

  const onClose = useCallback((interfaceId) => {
    history.push(getBackPath(orgId, interfaceId || params.id, 'interface'));
  }, [history, orgId, params.id]);

  const onSubmit = useCallback((formValues) => {
    const creds = getCreds();

    saveInterface(mutator, formValues, creds, interfaceOrg)
      .then((id) => {
        showMessage('ui-organizations.interface.message.saved.success', 'success');
        onClose(id);
      })
      .catch(() => showMessage('ui-organizations.interface.message.saved.fail', 'error'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCreds, interfaceOrg, onClose, showMessage]);

  const isNew = !params.id;
  const loadedInterface = get(resources, 'vendorInterface.records[0]', {});
  const { username, password } = getCreds();
  const initialValues = isNew ? {} : {
    ...loadedInterface,
    username,
    password,
  };
  const { name } = initialValues;
  const paneTitle = isNew
    ? <FormattedMessage id="ui-organizations.interface.create.paneTitle" />
    : <FormattedMessage id="ui-organizations.interface.edit.paneTitle" values={{ name }} />;

  return (
    <EditInterface
      deliveryMethodDD={deliveryMethodDD}
      formatDD={formatDD}
      initialValues={initialValues}
      onClose={onClose}
      onSubmit={onSubmit}
      paneTitle={paneTitle}
      stripes={stripes}
    />
  );
}

EditInterfaceContainer.manifest = Object.freeze({
  interfaceCredentials: interfaceCredentialsResource,
  interfaceId: {},
  interfaceOrg: organizationResource,
  vendorInterface: interfaceResource,
});

EditInterfaceContainer.propTypes = {
  mutator: PropTypes.object,
  orgId: PropTypes.string,
  resources: PropTypes.object,
  showMessage: PropTypes.func,
  stripes: PropTypes.object,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default stripesConnect(EditInterfaceContainer);
