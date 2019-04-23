import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Button,
  Pane,
  Icon,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

class ContactsView extends Component {
  getActionMenu = ({ onToggle }) => {
    const { match, baseUrl } = this.props;
    const { params } = match;
    const editUrl = `${baseUrl}/${params.id}/edit`;

    return (
      <Fragment>
        {params.id && (
          <Button
            data-test-contacts-action-edit
            buttonStyle="dropdownItem"
            to={editUrl}
          >
            <Icon icon="edit">
              <FormattedMessage id="ui-organizations.contacts.button.edit" />
            </Icon>
          </Button>
        )}
        <Button
          data-test-contacts-action-copy
          buttonStyle="dropdownItem"
          onClick={() => {
            onToggle();
          }}
        >
          <Icon icon="duplicate">
            <FormattedMessage id="ui-organizations.contacts.button.copy" />
          </Icon>
        </Button>
        <Button
          data-test-contacts-action-unassign
          buttonStyle="dropdownItem"
          onClick={() => {
            onToggle();
          }}
        >
          <Icon icon="document">
            <FormattedMessage id="ui-organizations.contacts.button.unassign" />
          </Icon>
        </Button>
        <Button
          data-test-contacts-action-delete
          buttonStyle="dropdownItem"
          onClick={() => {
            onToggle();
          }}
        >
          <Icon icon="trash">
            <FormattedMessage id="ui-organizations.contacts.button.delete" />
          </Icon>
        </Button>
      </Fragment>
    );
  };

  render() {
    const { onClose } = this.props;
    const name = 'test name';

    return (
      <Pane
        actionMenu={this.getActionMenu}
        appIcon={<AppIcon app="organizations" appIconKey="organizations" />}
        defaultWidth="fill"
        dismissible
        onClose={onClose}
        paneTitle={<FormattedMessage id="ui-organizations.contacts.view.paneTitle" values={{ name }} />}
      >
        View component
      </Pane>
    );
  }
}

ContactsView.propTypes = {
  onClose: PropTypes.func,
  match: PropTypes.object,
  baseUrl: PropTypes.string,
};

export default ContactsView;
