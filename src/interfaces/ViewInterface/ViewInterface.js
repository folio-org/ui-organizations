import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Pane,
  Icon,
  Button,
  Row,
  Col,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { EDIT_INTERFACE_URL } from '../constants';
import InterfaceView from '../../Interface/InterfaceView/InterfaceView';

const ViewInterface = ({ onClose, item, baseUrl, unassign, deleteInterface, getCreds }) => {
  // eslint-disable-next-line react/prop-types
  const getActionMenu = ({ onToggle }) => {
    const interfaceId = item.id;
    const editUrl = `${baseUrl}/${interfaceId}/${EDIT_INTERFACE_URL}`;

    return (
      <div data-test-view-interface-actions>
        <Button
          data-test-interface-action-edit
          buttonStyle="dropdownItem"
          to={editUrl}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-organizations.interface.button.edit" />
          </Icon>
        </Button>
        <Button
          data-test-interface-action-copy
          buttonStyle="dropdownItem"
          onClick={onToggle}
        >
          <Icon icon="duplicate">
            <FormattedMessage id="ui-organizations.interface.button.copy" />
          </Icon>
        </Button>
        {interfaceId && (
          <Button
            data-test-interface-action-unassign
            buttonStyle="dropdownItem"
            onClick={() => {
              onToggle();
              unassign();
            }}
          >
            <Icon icon="document">
              <FormattedMessage id="ui-organizations.interface.button.unassign" />
            </Icon>
          </Button>
        )}
        <Button
          data-test-interface-action-delete
          buttonStyle="dropdownItem"
          onClick={() => {
            onToggle();
            deleteInterface();
          }}
        >
          <Icon icon="trash">
            <FormattedMessage id="ui-organizations.interface.button.delete" />
          </Icon>
        </Button>
      </div>
    );
  };

  return (
    <Pane
      id="view-interface"
      appIcon={<AppIcon app="organizations" appIconKey="organizations" />}
      actionMenu={getActionMenu}
      defaultWidth="fill"
      dismissible
      onClose={onClose}
      paneTitle={item.name}
    >
      <Row>
        <Col
          xs={12}
          md={8}
          mdOffset={2}
        >
          <InterfaceView
            getCreds={getCreds}
            item={item}
          />
        </Col>
      </Row>
    </Pane>
  );
};

ViewInterface.propTypes = {
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  baseUrl: PropTypes.string.isRequired,
  unassign: PropTypes.func.isRequired,
  deleteInterface: PropTypes.func.isRequired,
  getCreds: PropTypes.func.isRequired,
};

export default ViewInterface;
