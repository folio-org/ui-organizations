import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Card,
  Col,
  Row,
} from '@folio/stripes/components';
import {
  LANG_LABEL_BY_CODE,
  VersionKeyValue,
} from '@folio/stripes-acq-components';

import { ContactPersonSection } from '../../../../../ContactPeople/ContactPerson';
import { ContactCardHeaderVersionView } from './ContactCardHeaderVersionView';

export const ContactPersonPhonesVersionView = ({ phones }) => {
  if (!phones?.length) return null;

  const renderBody = () => (
    (
      <Row>
        <Col xs={12}>
          {phones?.map((phone) => {
            return (
              <Card
                headerStart={(
                  <ContactCardHeaderVersionView
                    name={`${phone?._initialFieldPath}.isPrimary`}
                    isPrimary={phone?.isPrimary}
                  />
                )}
              >
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
