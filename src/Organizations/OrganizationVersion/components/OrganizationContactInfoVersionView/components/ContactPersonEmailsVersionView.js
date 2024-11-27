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

export const ContactPersonEmailsVersionView = ({ emails }) => {
  if (!emails?.length) return null;

  const renderBody = () => (
    <Row>
      <Col xs={12}>
        {emails?.map((email) => {
          return (
            <Card
              key={email.id}
              headerStart={(
                <ContactCardHeaderVersionView
                  name={`${email?._initialFieldPath}.isPrimary`}
                  isPrimary={email?.isPrimary}
                />
              )}
            >
              <Row>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${email?._initialFieldPath}.value`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.emailAddress" />}
                    value={email?.value}
                  />
                </Col>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${email?._initialFieldPath}.description`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.description" />}
                    value={email?.description}
                  />
                </Col>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${email?._initialFieldPath}.language`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.language" />}
                    value={LANG_LABEL_BY_CODE[email?.language] || email?.language}
                  />
                </Col>
                <Col xs={3}>
                  <VersionKeyValue
                    name={`${email?._initialFieldPath}.categories`}
                    label={<FormattedMessage id="ui-organizations.contactPeople.categories" />}
                    value={email.categories}
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
      renderHeader={() => <FormattedMessage id="ui-organizations.contactPeople.emails" />}
      renderBody={renderBody}
    />
  );
};

ContactPersonEmailsVersionView.propTypes = {
  emails: PropTypes.arrayOf(PropTypes.object),
};
