import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
} from '@folio/stripes/components';
import {
  PAYMENT_METHOD_LABELS,
  VersionKeyValue,
} from '@folio/stripes-acq-components';

import css from '../../../OrganizationDetails/OrganizationAccounts/OrganizationAccount/OrganizationAccount.css';

export const OrganizationAccountsVersionView = ({ name, version }) => {
  if (!version?.accounts?.length) {
    return (
      <p>
        <FormattedMessage id="ui-organizations.accounts.noAccountsAvail" />
      </p>
    );
  }

  return (
    <>
      {version?.accounts?.map((account, indx) => {
        return (
          <Row
            key={account.id}
            className={css.organizationAccount}
          >
            <Col xs={3}>
              <VersionKeyValue
                name={`${name}[${indx}].name`}
                label={<FormattedMessage id="ui-organizations.accounts.name" />}
                value={account?.name}
              />
            </Col>

            <Col xs={3}>
              <VersionKeyValue
                name={`${name}[${indx}].accountNo`}
                label={<FormattedMessage id="ui-organizations.accounts.accountNumber" />}
                value={account?.accountNo}
              />
            </Col>

            <Col xs={3}>
              <VersionKeyValue
                name={`${name}[${indx}].description`}
                label={<FormattedMessage id="ui-organizations.accounts.description" />}
                value={account?.description}
              />
            </Col>

            <Col xs={3}>
              <VersionKeyValue
                name={`${name}[${indx}].appSystemNo`}
                label={<FormattedMessage id="ui-organizations.accounts.payable" />}
                value={account?.appSystemNo}
              />
            </Col>

            <Col xs={3}>
              <VersionKeyValue
                name={`${name}[${indx}].paymentMethod`}
                label={<FormattedMessage id="ui-organizations.accounts.paymentMethod" />}
                value={PAYMENT_METHOD_LABELS[account?.paymentMethod]}
              />
            </Col>

            <Col xs={3}>
              <VersionKeyValue
                name={`${name}[${indx}].contactInfo`}
                label={<FormattedMessage id="ui-organizations.accounts.account.contactInfo" />}
                value={account?.contactInfo}
              />
            </Col>

            <Col xs={3}>
              <VersionKeyValue
                name={`${name}[${indx}].libraryCode`}
                label={<FormattedMessage id="ui-organizations.accounts.libraryCode" />}
                value={account?.libraryCode}
              />
            </Col>

            <Col xs={3}>
              <VersionKeyValue
                name={`${name}[${indx}].libraryEdiCode`}
                label={<FormattedMessage id="ui-organizations.accounts.libraryEDICode" />}
                value={account?.libraryEdiCode}
              />
            </Col>

            <Col xs={3}>
              <VersionKeyValue
                name={`${name}[${indx}].notes`}
                label={<FormattedMessage id="ui-organizations.accounts.notes" />}
                value={account?.notes}
              />
            </Col>

            <Col xs={3}>
              <VersionKeyValue
                name={`${name}[${indx}].acqUnitIds`}
                label={<FormattedMessage id="stripes-acq-components.label.acqUnits" />}
                value={account?.acqUnits}
                multiple
              />
            </Col>
          </Row>
        );
      })}
    </>
  );
};

OrganizationAccountsVersionView.propTypes = {
  name: PropTypes.string.isRequired,
  version: PropTypes.object,
};
