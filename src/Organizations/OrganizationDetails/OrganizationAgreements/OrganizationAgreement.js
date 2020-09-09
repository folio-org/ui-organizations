import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Row,
  Col,
  KeyValue,
  NoValue,
} from '@folio/stripes/components';

const OrganizationAgreement = ({ name, discount, referenceUrl, notes }) => {
  return (
    <Row>
      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.agreement.name" />}
          value={name}
        />
      </Col>
      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.agreement.discount" />}
          value={discount !== undefined ? `${discount}%` : <NoValue />}
        />
      </Col>
      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.agreement.referenceUrl" />}
          value={referenceUrl || <NoValue />}
        />
      </Col>
      <Col xs={12}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.agreement.notes" />}
          value={notes || <NoValue />}
        />
      </Col>
    </Row>
  );
};

OrganizationAgreement.propTypes = {
  name: PropTypes.string,
  discount: PropTypes.number,
  referenceUrl: PropTypes.string,
  notes: PropTypes.string,
};

export default OrganizationAgreement;
