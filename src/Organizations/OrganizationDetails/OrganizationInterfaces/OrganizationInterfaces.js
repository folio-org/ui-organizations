import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import { OrganizationInterfaceContainer } from './OrganizationInterface';

const OrganizationInterfaces = ({ interfaces }) => {
  if (!interfaces.length) {
    return (
      <div>
        <p>
          <FormattedMessage id="ui-organizations.interface.noInterfaceAvail" />
        </p>
      </div>
    );
  }

  return (
    <Row
      data-test-interfaces-view
      data-testid="interfaces-list"
    >
      <Col xs={12}>
        {
          interfaces.map((item, index) => (
            <div
              data-test-interfaces-view-item
              key={item.id}
            >
              {index > 0 ? (<div><hr /></div>) : null}
              <OrganizationInterfaceContainer
                item={item}
                key={item.id}
                isNarrow
              />
            </div>
          ))
        }
      </Col>
    </Row>
  );
};

OrganizationInterfaces.propTypes = {
  interfaces: PropTypes.arrayOf(PropTypes.object),
};

export default OrganizationInterfaces;
