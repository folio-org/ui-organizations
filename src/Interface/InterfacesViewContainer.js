import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  isEqual,
  get,
} from 'lodash';

import { Icon } from '@folio/stripes/components';

import InterfaceViewContainer from './InterfaceView';
import { updateInterfaces } from './utils';

class InterfacesViewContainer extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentMutator: PropTypes.object,
    parentResources: PropTypes.object,
  };

  componentDidMount() {
    const { initialValues, parentMutator } = this.props;

    updateInterfaces(initialValues.interfaces, parentMutator);
  }

  componentDidUpdate(prevProps) {
    const { initialValues, parentMutator } = this.props;

    if (!isEqual(initialValues.interfaces, prevProps.initialValues.interfaces)) {
      updateInterfaces(initialValues.interfaces, parentMutator);
    }
  }

  render() {
    const { parentResources } = this.props;
    const interfaces = get(parentResources, 'interfaces', {});

    if (interfaces.isPending) {
      return <Icon icon="spinner-ellipsis" />;
    }
    const interfacesList = get(interfaces, 'records', []);

    if (interfacesList.length) {
      return (
        <div
          data-test-interfaces-view
          style={{ width: '100%' }}
        >
          {interfacesList.map((item, index) => (
            <div
              data-test-interfaces-view-item
              key={item.id}
            >
              {index > 0 ? (<div style={{ width: '100%' }}><hr /></div>) : null}
              <InterfaceViewContainer
                item={item}
                isNarrow
              />
            </div>))}
        </div>
      );
    } else {
      return (
        <div>
          <p>{<FormattedMessage id="ui-organizations.interface.noInterfaceAvail" />}</p>
        </div>
      );
    }
  }
}

export default InterfacesViewContainer;
