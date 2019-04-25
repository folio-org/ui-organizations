import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import css from './AccountsView.css';

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
    {printKeyValue('paymentMethod', get(val, ['paymentMethod'], ''), false)}
    {printKeyValue('account.contactInfo', get(val, ['contactInfo'], ''), false)}
    {printKeyValue('libraryCode', get(val, ['libraryCode'], ''), false)}
    {printKeyValue('libraryEDICode', get(val, ['libraryEdiCode'], ''), false)}
    {printKeyValue('notes', get(val, ['notes'], ''), false)}
  </Row>
);

const AccountsView = ({ accounts }) => {
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

AccountsView.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
};

AccountsView.defaultProps = {
  accounts: [],
};

export default AccountsView;
