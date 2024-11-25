import PropTypes from 'prop-types';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Card,
  Col,
  Row,
} from '@folio/stripes/components';
import {
  VersionKeyValue,
  VersionViewContext,
} from '@folio/stripes-acq-components';

export const ContactAddressesVersionView = ({ addresses }) => {
  const versionContext = useContext(VersionViewContext);

  return (
    <Row>
      <Col xs={12}>
        {addresses?.map((address) => {
          const isPrimaryValue = (
            <h4 style={{ margin: 0 }}>
              <FormattedMessage id={`ui-organizations.${address?.isPrimary ? 'primaryItem' : 'alternateItem'}`} />
            </h4>
          );
          const headerStart = versionContext?.paths?.includes(`${address?._initialFieldPath}.isPrimary`)
            ? <mark>{isPrimaryValue}</mark>
            : isPrimaryValue;

          return (
            <Card headerStart={headerStart}>
              <Row>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${address?._initialFieldPath}.addressLine1`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.addressLine1" />}
                    value={address?.addressLine1}
                  />
                </Col>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${address?._initialFieldPath}.addressLine2`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.addressLine2" />}
                    value={address?.addressLine2}
                  />
                </Col>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${address?._initialFieldPath}.city`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.city" />}
                    value={address?.city}
                  />
                </Col>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${address?._initialFieldPath}.stateRegion`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.stateRegion" />}
                    value={address?.stateRegion}
                  />
                </Col>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${address?._initialFieldPath}.zipCode`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.zipCode" />}
                    value={address?.zipCode}
                  />
                </Col>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${address?._initialFieldPath}.country`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.country" />}
                    value={address?.country}
                  />
                </Col>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${address?._initialFieldPath}.language`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.language" />}
                    value={address?.language}
                  />
                </Col>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${address?._initialFieldPath}.categories`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.categories" />}
                    value={address?.categories}
                    multiple
                  />
                </Col>
              </Row>
            </Card>
          );
        })}
      </Col>
    </Row>
  );
};

ContactAddressesVersionView.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object),
};
