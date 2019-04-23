import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Row, Col, KeyValue } from '@folio/stripes/components';

import { EntitiesWithCollapsing } from '../../../common/components';
import ContactPersonSection from '../ContactPersonSection';
import ContactPersonItem from '../ContactPersonItem';

const renderPhone = phone => (
  <ContactPersonItem
    isPrimary={phone.isPrimary}
    key={`${phone.phoneNumber}-${phone.type}-${phone.language}`}
  >
    <Row>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.phoneNumber" />}>
          {phone.phoneNumber}
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.type" />}>
          {phone.type}
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.language" />}>
          {phone.language}
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.categories" />}>
          {phone.categories}
        </KeyValue>
      </Col>
    </Row>
  </ContactPersonItem>
);

const ContactPersonPhones = ({ phones }) => {
  if (!phones.length) return null;

  const renderHeader = () => (
    <FormattedMessage id="ui-organizations.contactPeople.phoneNumbers" />
  );

  const renderBody = () => (
    <EntitiesWithCollapsing
      renderEntity={renderPhone}
      entities={phones}
      showMoreLabel={<FormattedMessage id="ui-organizations.contactPeople.showMorePhones" />}
    />
  );

  return (
    <ContactPersonSection
      renderHeader={renderHeader}
      renderBody={renderBody}
    />
  );
};

ContactPersonPhones.propTypes = {
  phones: PropTypes.arrayOf(PropTypes.object),
};

ContactPersonPhones.defaultProps = {
  phones: [],
};

export default ContactPersonPhones;
