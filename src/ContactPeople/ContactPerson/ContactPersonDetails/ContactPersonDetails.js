import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Row, Col, KeyValue } from '@folio/stripes/components';
import { LANG_LABEL_BY_CODE } from '@folio/stripes-acq-components';

import ContactPersonSection from '../ContactPersonSection';

const ContactPersonDetails = ({
  categories,
  firstName,
  isInactive,
  language,
  lastName,
  notes,
  prefix,
}) => {
  const renderHeader = () => (
    <FormattedMessage id="ui-organizations.contactPeople.name" />
  );

  const renderBody = () => (
    <Row>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.prefix" />}>
          {prefix}
        </KeyValue>
      </Col>

      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.details.lastName" />}>
          {lastName}
        </KeyValue>
      </Col>

      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.details.firstName" />}>
          {firstName}
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.status" />}>
          <FormattedMessage id={`ui-organizations.contactPeople.status.${isInactive ? 'inactive' : 'active'}`} />
        </KeyValue>
      </Col>

      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.language" />}>
          {LANG_LABEL_BY_CODE[language] || language}
        </KeyValue>
      </Col>

      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.categories" />}>
          {categories}
        </KeyValue>
      </Col>

      <Col
        data-test-contact-people-note
        xs={6}
      >
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.note" />}>
          {notes}
        </KeyValue>
      </Col>
    </Row>
  );

  return (
    <ContactPersonSection
      renderHeader={renderHeader}
      renderBody={renderBody}
    />
  );
};

ContactPersonDetails.propTypes = {
  lastName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  language: PropTypes.string,
  isInactive: PropTypes.bool,
  categories: PropTypes.string,
  notes: PropTypes.string,
};

ContactPersonDetails.defaultProps = {
  prefix: '',
  language: '',
  isInactive: false,
  categories: '',
};

export default ContactPersonDetails;
