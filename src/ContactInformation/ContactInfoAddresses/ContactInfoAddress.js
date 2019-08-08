import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { AddressView } from '@folio/stripes/smart-components';
import { Row, Col } from '@folio/stripes/components';

const visibleFields = [
  'addressLine1',
  'addressLine2',
  'city',
  'stateRegion',
  'zipCode',
  'country',
  'categories',
];

const labelMap = {
  addressLine1: <FormattedMessage id="ui-organizations.data.contactTypes.addressLine1" />,
  addressLine2: <FormattedMessage id="ui-organizations.data.contactTypes.addressLine2" />,
  city: <FormattedMessage id="ui-organizations.data.contactTypes.city" />,
  stateRegion: <FormattedMessage id="ui-organizations.data.contactTypes.stateProviceOrRegion" />,
  zipCode: <FormattedMessage id="ui-organizations.data.contactTypes.zipOrPostalCode" />,
  country: <FormattedMessage id="ui-organizations.data.contactTypes.country" />,
  categories: <FormattedMessage id="ui-organizations.data.contactTypes.categories" />,
};

const ContactInfoAddress = ({ address }) => (
  <Row>
    <Col xs={12}>
      <AddressView
        addressObject={address}
        visibleFields={visibleFields}
        labelMap={labelMap}
      />
    </Col>
  </Row>
);

ContactInfoAddress.propTypes = {
  address: PropTypes.object.isRequired,
};

export default ContactInfoAddress;
