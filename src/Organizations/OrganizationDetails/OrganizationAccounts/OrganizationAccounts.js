import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

import {
  Row,
  Col,
  KeyValue,
} from '@folio/stripes/components';
import { PAYMENT_METHOD_LABELS } from '@folio/stripes-acq-components';

import css from './OrganizationAccounts.css';

const printKeyValue = (label, val, isRequire) => {
  return (
    <Col xs={3}>
      <KeyValue label={<FormattedMessage id={`ui-organizations.accounts.${label}`} />} value={val} required={isRequire} />
    </Col>
  );
};

const renderAccount = (val, key) => (
  <Row
    className={css.account}
    key={key}
  >
    {printKeyValue('name', get(val, ['name'], ''), false)}
    {printKeyValue('accountNumber', get(val, ['accountNo'], ''), false)}
    {printKeyValue('description', get(val, ['description'], ''), false)}
    {printKeyValue('payable', get(val, ['appSystemNo'], ''), false)}
    <Col xs={3} data-test-payment-method>
      <KeyValue label={<FormattedMessage id="ui-organizations.accounts.paymentMethod" />}>
        {PAYMENT_METHOD_LABELS[get(val, 'paymentMethod')]}
      </KeyValue>
    </Col>
    {printKeyValue('account.contactInfo', get(val, ['contactInfo'], ''), false)}
    {printKeyValue('libraryCode', get(val, ['libraryCode'], ''), false)}
    {printKeyValue('libraryEDICode', get(val, ['libraryEdiCode'], ''), false)}
    {printKeyValue('notes', get(val, ['notes'], ''), false)}
  </Row>
);

const OrganizationAccounts = ({ accounts }) => {
  if (accounts.length) {
    return (
      <div>
        {accounts.map(renderAccount)}
      </div>
    );
  } else {
    return (
      <div>
        <p>{<FormattedMessage id="ui-organizations.accounts.noAccountsAvail" />}</p>
      </div>
    );
  }
};

OrganizationAccounts.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
};

OrganizationAccounts.defaultProps = {
  accounts: [],
};

export default OrganizationAccounts;
