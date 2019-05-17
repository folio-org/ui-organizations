import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { get } from 'lodash';

import {
  interfaceResource,
} from '../../common/resources';
import { saveInterface } from './util';
import EditInterface from './EditInterface';
import {
  deliveryMethodDD,
  formatDD,
} from './const';
import { getBackQuery } from '../../common/utils/createItem';

class EditInterfaceContainer extends Component {
  static manifest = Object.freeze({
    interface: interfaceResource,
    query: {},
  });

  onClose = (interfaceId = this.props.match.params.id) => {
    const { orgId, mutator } = this.props;
    const query = getBackQuery(orgId, interfaceId, 'interface');

    mutator.query.replace(query);
  };

  onSubmit = (formValues) => {
    const { mutator, showMessage } = this.props;

    saveInterface(mutator.interface, formValues)
      .then(({ id }) => {
        showMessage('ui-organizations.interface.message.saved.success', 'success');
        this.onClose(id);
      })
      .catch(() => showMessage('ui-organizations.interface.message.saved.fail', 'error'));
  }

  render() {
    const { match, resources, stripes } = this.props;
    const isNew = !match.params.id;
    const loadedInterface = get(resources, 'interface.records[0]', {});
    const initialValues = isNew ? {} : loadedInterface;
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
  match: PropTypes.object,
  mutator: PropTypes.object,
  orgId: PropTypes.string,
  resources: PropTypes.object,
  showMessage: PropTypes.func,
  stripes: PropTypes.object,
};

export default EditInterfaceContainer;
