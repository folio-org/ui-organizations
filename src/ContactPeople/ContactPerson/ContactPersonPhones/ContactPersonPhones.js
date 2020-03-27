import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Row, Col, KeyValue } from '@folio/stripes/components';
import { LANG_LABEL_BY_CODE } from '@folio/stripes-acq-components';

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
          {LANG_LABEL_BY_CODE[phone.language] || phone.language}
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

const ContactPersonPhones = ({ phones, withCollapsing }) => {
  if (!phones.length) return null;

  const renderHeader = () => (
    <FormattedMessage id="ui-organizations.contactPeople.phoneNumbers" />
  );

  const renderBody = () => (
    withCollapsing ? (
      <EntitiesWithCollapsing
        renderEntity={renderPhone}
        entities={phones}
        showMoreLabel={<FormattedMessage id="ui-organizations.contactPeople.showMorePhones" />}
      />
    ) : phones.map(renderPhone)
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
  withCollapsing: PropTypes.bool,
};

ContactPersonPhones.defaultProps = {
  phones: [],
  withCollapsing: true,
};

export default ContactPersonPhones;
