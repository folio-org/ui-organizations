import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { get } from 'lodash';

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

class EditInterfaceContainer extends Component {
  static manifest = Object.freeze({
    interfaceCredentials: interfaceCredentialsResource,
    interfaceId: {},
    interfaceOrg: organizationResource,
    vendorInterface: interfaceResource,
  });

  getCreds() {
    const { interfaceCredentials } = this.props.resources || {};

    return (!get(interfaceCredentials, 'failed') && get(interfaceCredentials, 'records.0')) || {};
  }

  onClose = (interfaceId = this.props.match.params.id) => {
    const { orgId, history } = this.props;

    history.push(getBackPath(orgId, interfaceId, 'interface'));
  };

  onSubmit = (formValues) => {
    const { mutator, resources, showMessage } = this.props;
    const creds = this.getCreds();

    saveInterface(mutator, formValues, creds, get(resources, 'interfaceOrg.records.0'))
      .then((id) => {
        showMessage('ui-organizations.interface.message.saved.success', 'success');
        this.onClose(id);
      })
      .catch(() => showMessage('ui-organizations.interface.message.saved.fail', 'error'));
  }

  render() {
    const { match, resources, stripes } = this.props;
    const isNew = !match.params.id;
    const loadedInterface = get(resources, 'vendorInterface.records[0]', {});
    const { username, password } = this.getCreds();
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
        onClose={this.onClose}
        onSubmit={this.onSubmit}
        paneTitle={paneTitle}
        stripes={stripes}
      />
    );
  }
}

EditInterfaceContainer.propTypes = {
  mutator: PropTypes.object,
  orgId: PropTypes.string,
  resources: PropTypes.object,
  showMessage: PropTypes.func,
  stripes: PropTypes.object,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default EditInterfaceContainer;
