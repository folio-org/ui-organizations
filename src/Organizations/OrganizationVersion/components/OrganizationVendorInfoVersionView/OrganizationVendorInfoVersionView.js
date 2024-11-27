import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  PAYMENT_METHOD_LABELS,
  VersionCheckbox,
  VersionKeyValue,
} from '@folio/stripes-acq-components';
import {
  Col,
  Row,
} from '@folio/stripes/components';

export const OrganizationVendorInfoVersionView = ({ version }) => {
  return (
    <Row>
      <Col xs={3}>
        <VersionKeyValue
          name="paymentMethod"
          label={<FormattedMessage id="ui-organizations.accounts.paymentMethod" />}
          value={PAYMENT_METHOD_LABELS[version?.paymentMethod]}
        />
      </Col>

      <Col xs={3}>
        <VersionKeyValue
          name="vendorCurrencies"
          label={<FormattedMessage id="ui-organizations.vendorInfo.vendorCurrencies" />}
          value={version?.vendorCurrenciesValue}
          multiple
        />
      </Col>

      <Col xs={12}>
        <hr />
      </Col>

      <Col xs={3}>
        <VersionKeyValue
          name="claimingInterval"
          label={<FormattedMessage id="ui-organizations.vendorInfo.claimingInterval" />}
          value={version?.claimingInterval}
        />
      </Col>

      <Col xs={3}>
        <VersionKeyValue
          name="discountPercent"
          label={<FormattedMessage id="ui-organizations.vendorInfo.discountPercent" />}
          value={version?.discountPercent}
        />
      </Col>

      <Col xs={3}>
        <VersionKeyValue
          name="expectedActivationInterval"
          label={<FormattedMessage id="ui-organizations.vendorInfo.expectedActivationInterval" />}
          value={version?.expectedActivationInterval}
        />
      </Col>

      <Col xs={3}>
        <VersionKeyValue
          name="expectedInvoiceInterval"
          label={<FormattedMessage id="ui-organizations.vendorInfo.expectedInvoiceInterval" />}
          value={version?.expectedInvoiceInterval}
        />
      </Col>

      <Col xs={3}>
        <VersionKeyValue
          name="expectedReceiptInterval"
          label={<FormattedMessage id="ui-organizations.vendorInfo.expectedReceiptInterval" />}
          value={version?.expectedReceiptInterval}
        />
      </Col>

      <Col xs={3}>
        <VersionKeyValue
          name="renewalActivationInterval"
          label={<FormattedMessage id="ui-organizations.vendorInfo.renewalActivationInterval" />}
          value={version?.renewalActivationInterval}
        />
      </Col>

      <Col xs={3}>
        <VersionKeyValue
          name="subscriptionInterval"
          label={<FormattedMessage id="ui-organizations.vendorInfo.subscriptionInterval" />}
          value={version?.subscriptionInterval}
        />
      </Col>

      <Col xs={3}>
        <VersionCheckbox
          name="exportToAccounting"
          checked={version?.exportToAccounting}
          label={<FormattedMessage id="ui-organizations.vendorInfo.exportToAccounting" />}
        />
      </Col>

      <Col xs={12}>
        <hr />
      </Col>

      <Col xs={3}>
        <VersionKeyValue
          name="taxId"
          label={<FormattedMessage id="ui-organizations.vendorInfo.taxID" />}
          value={version?.taxId}
        />
      </Col>

      <Col xs={3}>
        <VersionKeyValue
          name="taxPercentage"
          label={<FormattedMessage id="ui-organizations.vendorInfo.taxPercentage" />}
          value={version?.taxPercentage}
        />
      </Col>

      <Col xs={4}>
        <VersionCheckbox
          name="liableForVat"
          checked={version?.liableForVat}
          label={<FormattedMessage id="ui-organizations.vendorInfo.liableForVAT" />}
        />
      </Col>
    </Row>
  );
};

OrganizationVendorInfoVersionView.propTypes = {
  version: PropTypes.object,
};
