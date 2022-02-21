import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  KeyValue,
  Col,
  Row,
  Checkbox,
  Button,
  NoValue,
  Headline,
  TextLink,
} from '@folio/stripes/components';
import {
  IfPermission,
} from '@folio/stripes/core';

import css from './OrganizationInterface.css';

const OrganizationInterface = ({ getCreds, item = {}, isNarrow = false }) => {
  const columnsAmount = isNarrow ? 6 : 3;
  const {
    type = [],
    name,
    uri,
    notes,
    available,
    deliveryMethod,
    statisticsFormat,
    locallyStored,
    onlineLocation,
    statisticsNotes,
  } = item;
  const [{ username, password }, setCreds] = React.useState({ username: '***', password: '***' });
  const [hasShowButton, setHasShowButton] = React.useState(true);
  const showCreds = async () => {
    if (hasShowButton) {
      const creds = await getCreds() || {};

      setCreds({
        username: creds.username || '',
        password: creds.password || '',
      });
    }
    setHasShowButton(!hasShowButton);
  };

  return (
    <div data-test-interface-pane-view>
      <Row>
        <Col xs={12}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.type" />}>
            <span className={css.wrapValue}>
              {type?.length ? type.join(', ') : <NoValue />}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.name" />}>
            <span className={css.wrapValue}>
              {name || <NoValue />}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.uri" />}>
            <span className={css.wrapValue}>
              {uri
                ? (
                  <TextLink
                    rel="noopener noreferrer"
                    target="_blank"
                    href={uri}
                  >
                    {uri}
                  </TextLink>
                )
                : <NoValue />
              }
            </span>
          </KeyValue>
        </Col>
        {!hasShowButton && (
          <>
            <Col xs={columnsAmount}>
              <KeyValue label={<FormattedMessage id="ui-organizations.interface.username" />}>
                <span className={css.wrapValue}>
                  {username || <NoValue />}
                </span>
              </KeyValue>
            </Col>
            <Col
              data-test-password
              xs={columnsAmount}
            >
              <KeyValue label={<FormattedMessage id="ui-organizations.interface.password" />}>
                <span className={css.wrapValue}>
                  {password || <NoValue />}
                </span>
              </KeyValue>
            </Col>
          </>
        )}
      </Row>
      <IfPermission perm="organizations-storage.interfaces.credentials.item.get">
        <Row>
          <Col xs={columnsAmount}>
            <Button
              data-test-show-creds
              onClick={showCreds}
            >
              <FormattedMessage id={`ui-organizations.edit.${hasShowButton ? 'showCredentials' : 'hideCredentials'}`} />
            </Button>
          </Col>
        </Row>
      </IfPermission>
      <Row>
        <Col xs={12}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.notes" />}>
            <span className={css.wrapValue}>
              {notes || <NoValue />}
            </span>
          </KeyValue>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Headline
            margin="none"
            size="large"
          >
            <FormattedMessage id="ui-organizations.interface.statistics" />
          </Headline>
        </Col>
      </Row>
      <Row>
        <Col xs={columnsAmount}>
          <Checkbox
            checked={Boolean(available)}
            disabled
            label={<FormattedMessage id="ui-organizations.interface.available" />}
            vertical
          />
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.deliveryMethod" />}>
            <span className={css.wrapValue}>
              {deliveryMethod || <NoValue />}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.statisticsFormat" />}>
            <span className={css.wrapValue}>
              {statisticsFormat || <NoValue />}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.locallyStored" />}>
            <span className={css.wrapValue}>
              {locallyStored || <NoValue />}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.onlineLocation" />}>
            <span className={css.wrapValue}>
              {onlineLocation || <NoValue />}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.statisticsNotes" />}>
            <span className={css.wrapValue}>
              {statisticsNotes || <NoValue />}
            </span>
          </KeyValue>
        </Col>
      </Row>
    </div>
  );
};

OrganizationInterface.propTypes = {
  getCreds: PropTypes.func.isRequired,
  isNarrow: PropTypes.bool,
  item: PropTypes.object.isRequired,
};

export default OrganizationInterface;
