import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';
import { withRouter } from 'react-router';

import {
  KeyValue,
  Col,
  Row,
  Checkbox,
  Button,
} from '@folio/stripes/components';
import {
  IfPermission,
  stripesConnect,
} from '@folio/stripes/core';

import { interfaceCredentialsResource } from '../../common/resources';
import css from './InterfaceView.css';

const InterfaceView = ({ resources, item = {}, isNarrow = false }) => {
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
  const showCreds = () => {
    const creds = (!get(resources, 'interfaceCredentialsfailed') && get(resources, 'interfaceCredentials.records.0')) || {};

    setCreds({
      username: creds.username || '',
      password: creds.password || '',
    });
  };

  return (
    <div data-test-interface-pane-view>
      <Row>
        <Col xs={12}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.type" />}>
            <span className={css.wrapValue}>
              {type.join(', ')}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.name" />}>
            <span className={css.wrapValue}>
              {name}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.uri" />}>
            <span className={css.wrapValue}>
              {uri}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.username" />}>
            <span className={css.wrapValue}>
              {username}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount - 1}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.password" />}>
            <span className={css.wrapValue}>
              {password}
            </span>
          </KeyValue>
        </Col>
        <Col xs={1}>
          <IfPermission perm="organizations-storage.interfaces.credentials.item.get">
            <Button onClick={showCreds}>
              <FormattedMessage id="ui-organizations.edit.show" />
            </Button>
          </IfPermission>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.notes" />}>
            <span className={css.wrapValue}>
              {notes}
            </span>
          </KeyValue>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className={css.subHeadings}>
            <b>{<FormattedMessage id="ui-organizations.interface.statistics" />}</b>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.available" />}>
            <Checkbox
              type="checkbox"
              checked={Boolean(available)}
              disabled
            />
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.deliveryMethod" />}>
            <span className={css.wrapValue}>
              {deliveryMethod}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.statisticsFormat" />}>
            <span className={css.wrapValue}>
              {statisticsFormat}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.locallyStored" />}>
            <span className={css.wrapValue}>
              {locallyStored}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.onlineLocation" />}>
            <span className={css.wrapValue}>
              {onlineLocation}
            </span>
          </KeyValue>
        </Col>
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.statisticsNotes" />}>
            <span className={css.wrapValue}>
              {statisticsNotes}
            </span>
          </KeyValue>
        </Col>
      </Row>
    </div>
  );
};

InterfaceView.manifest = {
  interfaceCredentials: interfaceCredentialsResource,
};

InterfaceView.propTypes = {
  item: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  isNarrow: PropTypes.bool,
};

export default withRouter(stripesConnect(InterfaceView));
