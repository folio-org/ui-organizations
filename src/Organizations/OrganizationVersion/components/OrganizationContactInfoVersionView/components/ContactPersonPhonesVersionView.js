import PropTypes from 'prop-types';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Card,
  Col,
  Row,
} from '@folio/stripes/components';
import {
  LANG_LABEL_BY_CODE,
  VersionKeyValue,
  VersionViewContext,
} from '@folio/stripes-acq-components';

import { ContactPersonSection } from '../../../../../ContactPeople/ContactPerson';

export const ContactPersonPhonesVersionView = ({ phones }) => {
  const versionContext = useContext(VersionViewContext);

  if (!phones?.length) return null;

  const renderBody = () => (
    (
      <Row>
        <Col xs={12}>
          {phones?.map((phone) => {
            const isPrimaryValue = (
              <h4 style={{ margin: 0 }}>
                <FormattedMessage id={`ui-organizations.${phone?.isPrimary ? 'primaryItem' : 'alternateItem'}`} />
              </h4>
            );
            const headerStart = versionContext?.paths?.includes(`${phone?._initialFieldPath}.isPrimary`)
              ? <mark>{isPrimaryValue}</mark>
              : isPrimaryValue;

            return (
              <Card headerStart={headerStart}>
                <Row>
                  <Col xs={3}>
                    <VersionKeyValue
                      name={`${phone?._initialFieldPath}.phoneNumber`}
                      label={<FormattedMessage id="ui-organizations.contactPeople.phoneNumber" />}
                      value={phone?.phoneNumber}
                    />
                  </Col>
                  <Col xs={3}>
                    <VersionKeyValue
                      name={`${phone?._initialFieldPath}.type`}
                      label={<FormattedMessage id="ui-organizations.contactPeople.type" />}
                      value={phone?.type}
                    />
                  </Col>
                  <Col xs={3}>
                    <VersionKeyValue
                      name={`${phone?._initialFieldPath}.language`}
                      label={<FormattedMessage id="ui-organizations.contactPeople.language" />}
                      value={LANG_LABEL_BY_CODE[phone?.language] || phone?.language}
                    />
                  </Col>
                  <Col xs={3}>
                    <VersionKeyValue
                      name={`${phone?._initialFieldPath}.categories`}
                      label={<FormattedMessage id="ui-organizations.contactPeople.categories" />}
                      value={phone.categories}
                      multiple
                    />
                  </Col>
                </Row>
              </Card>
            );
          })}
        </Col>
      </Row>
    )
  );

  return (
    <ContactPersonSection
      renderHeader={() => <FormattedMessage id="ui-organizations.contactPeople.phoneNumbers" />}
      renderBody={renderBody}
    />
  );
};

ContactPersonPhonesVersionView.propTypes = {
  phones: PropTypes.arrayOf(PropTypes.object),
};
