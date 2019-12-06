import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { AddressView } from '@folio/stripes/smart-components';
import {
  Col,
  Row,
} from '@folio/stripes/components';

const visibleFields = [
  'addressLine1',
  'addressLine2',
  'city',
  'stateRegion',
  'zipCode',
  'country',
  'language',
  'categories',
];

const labelMap = {
  addressLine1: <FormattedMessage id="ui-organizations.contactPeople.addressLine1" />,
  addressLine2: <FormattedMessage id="ui-organizations.contactPeople.addressLine2" />,
  city: <FormattedMessage id="ui-organizations.contactPeople.city" />,
  stateRegion: <FormattedMessage id="ui-organizations.contactPeople.stateRegion" />,
  zipCode: <FormattedMessage id="ui-organizations.contactPeople.zipCode" />,
  country: <FormattedMessage id="ui-organizations.contactPeople.country" />,
  language: <FormattedMessage id="ui-organizations.contactPeople.language" />,
  categories: <FormattedMessage id="ui-organizations.contactPeople.categories" />,
};

const ContactAddress = ({ address }) => (
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

ContactAddress.propTypes = {
  address: PropTypes.object.isRequired,
};

export default ContactAddress;
