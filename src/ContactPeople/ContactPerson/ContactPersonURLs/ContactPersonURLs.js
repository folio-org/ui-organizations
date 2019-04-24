import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Row, Col, KeyValue } from '@folio/stripes/components';

import { EntitiesWithCollapsing } from '../../../common/components';
import ContactPersonSection from '../ContactPersonSection';
import ContactPersonItem from '../ContactPersonItem';

const renderURL = url => (
  <ContactPersonItem
    isPrimary={url.isPrimary}
    key={`${url.value}-${url.description}-${url.language}`}
  >
    <Row>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.url" />}>
          {url.value}
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.description" />}>
          {url.description}
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.language" />}>
          {url.language}
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.categories" />}>
          {url.categories}
        </KeyValue>
      </Col>
    </Row>
  </ContactPersonItem>
);

const ContactPersonURLs = ({ urls }) => {
  if (!urls.length) return null;

  const renderHeader = () => (
    <FormattedMessage id="ui-organizations.contactPeople.urls" />
  );

  const renderBody = () => (
    <EntitiesWithCollapsing
      renderEntity={renderURL}
      entities={urls}
      showMoreLabel={<FormattedMessage id="ui-organizations.contactPeople.showMoreURLs" />}
    />
  );

  return (
    <ContactPersonSection
      renderHeader={renderHeader}
      renderBody={renderBody}
    />
  );
};

ContactPersonURLs.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.object),
};

ContactPersonURLs.defaultProps = {
  urls: [],
};

export default ContactPersonURLs;
