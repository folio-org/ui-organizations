import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  NoValue,
  Row,
} from '@folio/stripes/components';
import { VersionKeyValue } from '@folio/stripes-acq-components';

export const OrganizationVendorTermsVersionView = ({ name, version }) => {
  if (!version?.agreements?.length) {
    return (
      <p>
        <FormattedMessage id="ui-organizations.agreement.noAgreementsAvailable" />
      </p>
    );
  }

  return (
    <>
      {version?.agreements?.map((agreement, indx) => {
        return (
          <Row>
            <Col xs={3}>
              <VersionKeyValue
                name={`${name}[${indx}].name`}
                label={<FormattedMessage id="ui-organizations.agreement.name" />}
                value={agreement?.name}
              />
            </Col>
            <Col xs={3}>
              <VersionKeyValue
                name={`${name}[${indx}].discount`}
                label={<FormattedMessage id="ui-organizations.agreement.discount" />}
                value={agreement?.discount !== undefined ? `${agreement?.discount}%` : <NoValue />}
              />
            </Col>
            <Col xs={3}>
              <VersionKeyValue
                name={`${name}[${indx}].referenceUrl`}
                label={<FormattedMessage id="ui-organizations.agreement.referenceUrl" />}
                value={agreement?.referenceUrl}
              />
            </Col>
            <Col xs={12}>
              <VersionKeyValue
                name={`${name}[${indx}].notes`}
                label={<FormattedMessage id="ui-organizations.agreement.notes" />}
                value={agreement?.notes}
              />
            </Col>
          </Row>
        );
      })}
    </>
  );
};

OrganizationVendorTermsVersionView.propTypes = {
  name: PropTypes.string.isRequired,
  version: PropTypes.object,
};
