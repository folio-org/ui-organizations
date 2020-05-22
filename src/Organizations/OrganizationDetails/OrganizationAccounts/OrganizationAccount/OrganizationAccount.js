import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Row,
  Col,
  KeyValue,
} from '@folio/stripes/components';
import {
  AcqUnitsView,
  PAYMENT_METHOD_LABELS,
} from '@folio/stripes-acq-components';

import css from './OrganizationAccount.css';

const OrganizationAccount = ({
  acqUnitIds,
  name,
  accountNo,
  description,
  appSystemNo,
  paymentMethod,
  contactInfo,
  libraryCode,
  libraryEdiCode,
  notes,
}) => {
  return (
    <div className={css.organizationAccount}>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.accounts.name" />}
            value={name}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.accounts.accountNumber" />}
            value={accountNo}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.accounts.description" />}
            value={description}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.accounts.payable" />}
            value={appSystemNo}
          />
        </Col>

        <Col xs={3} data-test-payment-method>
          <KeyValue label={<FormattedMessage id="ui-organizations.accounts.paymentMethod" />}>
            {PAYMENT_METHOD_LABELS[paymentMethod]}
          </KeyValue>
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.accounts.account.contactInfo" />}
            value={contactInfo}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.accounts.libraryCode" />}
            value={libraryCode}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.accounts.libraryEDICode" />}
            value={libraryEdiCode}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.accounts.notes" />}
            value={notes}
          />
        </Col>
        <Col data-test-account-acq-units xs={3}>
          <AcqUnitsView units={acqUnitIds} />
        </Col>

      </Row>
    </div>
  );
};

OrganizationAccount.propTypes = {
  name: PropTypes.string,
  accountNo: PropTypes.string,
  description: PropTypes.string,
  appSystemNo: PropTypes.string,
  paymentMethod: PropTypes.string,
  contactInfo: PropTypes.string,
  libraryCode: PropTypes.string,
  libraryEdiCode: PropTypes.string,
  notes: PropTypes.string,
  acqUnitIds: PropTypes.arrayOf(PropTypes.string),
};

export default OrganizationAccount;
