import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  KeyValue,
  Col,
  Row,
  Checkbox
} from '@folio/stripes/components';

import css from './InterfaceView.css';

export const InterfaceView = ({ item = {}, isNarrow = false }) => {
  const columnsAmount = isNarrow ? 6 : 3;
  const {
    name,
    uri,
    username,
    password,
    notes,
    available,
    deliveryMethod,
    statisticsFormat,
    locallyStored,
    onlineLocation,
    statisticsNotes,
  } = item;

  return (
    <div data-test-interface-pane-view>
      <Row>
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
        <Col xs={columnsAmount}>
          <KeyValue label={<FormattedMessage id="ui-organizations.interface.password" />}>
            <span className={css.wrapValue}>
              {password}
            </span>
          </KeyValue>
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

InterfaceView.propTypes = {
  item: PropTypes.object.isRequired,
  isNarrow: PropTypes.bool,
};

export default InterfaceView;
