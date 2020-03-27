import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Row, Col, KeyValue } from '@folio/stripes/components';
import { LANG_LABEL_BY_CODE } from '@folio/stripes-acq-components';

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
          {LANG_LABEL_BY_CODE[url.language] || url.language}
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

const ContactPersonURLs = ({ urls, withCollapsing }) => {
  if (!urls.length) return null;

  const renderHeader = () => (
    <FormattedMessage id="ui-organizations.contactPeople.urls" />
  );

  const renderBody = () => (
    withCollapsing ? (
      <EntitiesWithCollapsing
        renderEntity={renderURL}
        entities={urls}
        showMoreLabel={<FormattedMessage id="ui-organizations.contactPeople.showMoreURLs" />}
      />
    ) : urls.map(renderURL)
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
  withCollapsing: PropTypes.bool,
};

ContactPersonURLs.defaultProps = {
  urls: [],
  withCollapsing: true,
};

export default ContactPersonURLs;
