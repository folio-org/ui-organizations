import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Card,
  Col,
  Row,
  TextLink,
} from '@folio/stripes/components';
import {
  LANG_LABEL_BY_CODE,
  VersionKeyValue,
} from '@folio/stripes-acq-components';

import { ContactPersonSection } from '../../../../../ContactPeople/ContactPerson';
import { ContactCardHeaderVersionView } from './ContactCardHeaderVersionView';

export const ContactPersonURLsVersionView = ({ urls }) => {
  if (!urls?.length) return null;

  const renderBody = () => (
    <Row>
      <Col xs={12}>
        {urls?.map((url) => {
          return (
            <Card
              key={url.id}
              headerStart={(
                <ContactCardHeaderVersionView
                  name={`${url?._initialFieldPath}.isPrimary`}
                  isPrimary={url?.isPrimary}
                />
              )}
            >
              <Row>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${url?._initialFieldPath}.value`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.url" />}
                  >
                    <TextLink
                      rel="noopener noreferrer"
                      target="_blank"
                      href={url.value}
                    >
                      {url.value}
                    </TextLink>
                  </VersionKeyValue>
                </Col>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${url?._initialFieldPath}.description`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.description" />}
                    value={url?.description}
                  />
                </Col>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${url?._initialFieldPath}.language`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.language" />}
                    value={LANG_LABEL_BY_CODE[url?.language] || url?.language}
                  />
                </Col>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${url?._initialFieldPath}.categories`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.categories" />}
                    value={url.categories}
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

  return (
    <ContactPersonSection
      renderHeader={() => <FormattedMessage id="ui-organizations.contactPeople.urls" />}
      renderBody={renderBody}
    />
  );
};

ContactPersonURLsVersionView.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.object),
};
