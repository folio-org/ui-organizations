import PropTypes from 'prop-types';
import { useContext } from 'react';
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
  VersionViewContext,
} from '@folio/stripes-acq-components';

import { ContactPersonSection } from '../../../../../ContactPeople/ContactPerson';

export const ContactPersonURLsVersionView = ({ urls }) => {
  const versionContext = useContext(VersionViewContext);

  if (!urls?.length) return null;

  const renderBody = () => (
    <Row>
      <Col xs={12}>
        {urls?.map((url) => {
          const isPrimaryValue = (
            <h4 style={{ margin: 0 }}>
              <FormattedMessage id={`ui-organizations.${url?.isPrimary ? 'primaryItem' : 'alternateItem'}`} />
            </h4>
          );
          const headerStart = versionContext?.paths?.includes(`${url?._initialFieldPath}.isPrimary`)
            ? <mark>{isPrimaryValue}</mark>
            : isPrimaryValue;

          return (
            <Card headerStart={headerStart}>
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
