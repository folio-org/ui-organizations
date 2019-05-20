import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Row, Col, KeyValue } from '@folio/stripes/components';

import { EntitiesWithCollapsing } from '../../../common/components';
import ContactPersonSection from '../ContactPersonSection';
import ContactPersonItem from '../ContactPersonItem';

const renderEmail = email => (
  <ContactPersonItem
    isPrimary={email.isPrimary}
    key={`${email.value}-${email.description}-${email.language}`}
  >
    <Row>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.emailAddress" />}>
          {email.value}
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.description" />}>
          {email.description}
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.language" />}>
          {email.language}
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.categories" />}>
          {email.categories}
        </KeyValue>
      </Col>
    </Row>
  </ContactPersonItem>
);

const ContactPersonEmails = ({ emails, withCollapsing }) => {
  if (!emails.length) return null;

  const renderHeader = () => (
    <FormattedMessage id="ui-organizations.contactPeople.emails" />
  );

  const renderBody = () => (
    withCollapsing ? (
      <EntitiesWithCollapsing
        renderEntity={renderEmail}
        entities={emails}
        showMoreLabel={<FormattedMessage id="ui-organizations.contactPeople.showMoreEmails" />}
      />
    ) : emails.map(renderEmail)
  );

  return (
    <ContactPersonSection
      renderHeader={renderHeader}
      renderBody={renderBody}
    />
  );
};

ContactPersonEmails.propTypes = {
  emails: PropTypes.arrayOf(PropTypes.object),
  withCollapsing: PropTypes.bool,
};

ContactPersonEmails.defaultProps = {
  emails: [],
  withCollapsing: true,
};

export default ContactPersonEmails;
