import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import { useShowCallout } from '@folio/stripes-acq-components';

import {
  interfaceCredentialsResource,
  interfaceResource,
  organizationResource,
} from '../../common/resources';
import saveInterface from './saveInterface';
import EditInterface from './EditInterface';
import {
  deliveryMethodDD,
  formatDD,
} from './const';
import { getBackPath } from '../../common/utils/createItem';

function EditInterfaceContainer({ orgId, history, match: { params }, mutator, resources, stripes }) {
  const isNew = !params.id;
  const [creds, setCreds] = useState();

  useEffect(() => {
    if (!isNew) mutator.interfaceCredentials.GET().then(setCreds).catch(() => setCreds());
  }, []);

  const interfaceOrg = resources?.interfaceOrg?.records?.[0];
  const showMessage = useShowCallout();

  const onClose = useCallback((interfaceId) => {
    history.push(getBackPath(orgId, interfaceId || params.id, 'interface'));
  }, [history, orgId, params.id]);

  const onInterfaceSaved = useCallback((interfaceId) => {
    if (interfaceId) {
      onClose(interfaceId);
    }
  }, [onClose]);

  const onSubmit = useCallback((formValues) => {
    saveInterface(mutator, formValues, creds, interfaceOrg, showMessage)
      .then(onInterfaceSaved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creds, interfaceOrg, onClose, showMessage]);

  const loadedInterface = get(resources, 'vendorInterface.records[0]', {});
  const { username, password } = creds || {};
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
  interfaceCredentials: {
    ...interfaceCredentialsResource,
    accumulate: true,
    fetch: false,
  },
  interfaceId: {},
  interfaceOrg: organizationResource,
  vendorInterface: interfaceResource,
});

EditInterfaceContainer.propTypes = {
  mutator: PropTypes.object,
  orgId: PropTypes.string,
  resources: PropTypes.object,
  stripes: PropTypes.object,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default stripesConnect(EditInterfaceContainer);
