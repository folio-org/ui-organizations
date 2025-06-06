import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  KeyValue,
} from '@folio/stripes/components';
import { LANG_LABEL_BY_CODE } from '@folio/stripes-acq-components';

const ContactDetails = ({
  categories = '',
  firstName,
  isInactive = false,
  language = '',
  lastName,
  notes,
  prefix = '',
}) => (
  <Row>
    <Col xs={3}>
      <KeyValue
        label={<FormattedMessage id="ui-organizations.contactPeople.prefix" />}
        value={prefix}
      />
    </Col>

    <Col xs={3}>
      <KeyValue
        label={<FormattedMessage id="ui-organizations.contactPeople.details.lastName" />}
        value={lastName}
      />
    </Col>

    <Col xs={3}>
      <KeyValue
        label={<FormattedMessage id="ui-organizations.contactPeople.details.firstName" />}
        value={firstName}
      />
    </Col>

    <Col xs={3}>
      <KeyValue
        label={<FormattedMessage id="ui-organizations.contactPeople.status" />}
      >
        <FormattedMessage id={`ui-organizations.contactPeople.status.${isInactive ? 'inactive' : 'active'}`} />
      </KeyValue>
    </Col>

    <Col xs={3}>
      <KeyValue
        label={<FormattedMessage id="ui-organizations.contactPeople.language" />}
        value={LANG_LABEL_BY_CODE[language] || language}
      />
    </Col>

    <Col xs={3}>
      <KeyValue
        label={<FormattedMessage id="ui-organizations.contactPeople.categories" />}
        value={categories}
      />
    </Col>

    <Col
      data-test-contact-people-note
      xs={6}
    >
      <KeyValue
        label={<FormattedMessage id="ui-organizations.contactPeople.note" />}
        value={notes}
      />
    </Col>
  </Row>
);

ContactDetails.propTypes = {
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  prefix: PropTypes.string,
  language: PropTypes.string,
  isInactive: PropTypes.bool,
  categories: PropTypes.string,
  notes: PropTypes.string,
};

export default ContactDetails;
