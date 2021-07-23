import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import {
  Button,
  checkScope,
  Col,
  collapseAllSections,
  expandAllSections,
  HasCommand,
  Icon,
  Pane,
  Row,
} from '@folio/stripes/components';
import {
  AppIcon,
  IfPermission,
  useStripes,
} from '@folio/stripes/core';
import { handleKeyCommand } from '@folio/stripes-acq-components';

import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import { EDIT_INTERFACE_URL } from '../constants';
import { OrganizationInterface } from '../../Organizations';

const ViewInterface = ({ onClose, item, baseUrl, unassign, deleteInterface, getCreds }) => {
  const history = useHistory();
  const accordionStatusRef = useRef();

  const stripes = useStripes();

  const interfaceId = item.id;
  const editUrl = `${baseUrl}/${interfaceId}/${EDIT_INTERFACE_URL}`;

  // eslint-disable-next-line react/prop-types
  const getActionMenu = ({ onToggle }) => {
    return (
      <div data-test-view-interface-actions>
        <IfPermission perm="organizations-storage.interfaces.item.put">
          <Button
            data-test-interface-action-edit
            buttonStyle="dropdownItem"
            to={editUrl}
          >
            <Icon icon="edit">
              <FormattedMessage id="ui-organizations.interface.button.edit" />
            </Icon>
          </Button>
        </IfPermission>

        {interfaceId && (
          <Button
            data-test-interface-action-unassign
            data-testid="unassign-interface"
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
        <IfPermission perm="organizations-storage.interfaces.item.delete">
          <Button
            data-test-interface-action-delete
            data-testid="delete-interface"
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
        </IfPermission>
      </div>
    );
  };

  const shortcuts = [
    {
      name: 'edit',
      handler: handleKeyCommand(() => {
        if (stripes.hasPerm('organizations-storage.interfaces.item.put')) history.push(editUrl);
      }),
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
    {
      name: 'search',
      handler: handleKeyCommand(() => history.push(ORGANIZATIONS_ROUTE)),
    },
  ];

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
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
            <OrganizationInterface
              getCreds={getCreds}
              item={item}
            />
          </Col>
        </Row>
      </Pane>
    </HasCommand>
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
