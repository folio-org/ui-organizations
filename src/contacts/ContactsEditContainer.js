import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import {
  Button,
  Pane,
  PaneMenu,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import {
  CONTACTS_API,
} from '../common/constants';

function getLastMenu(handleSubmit) {
  return (
    <PaneMenu>
      <FormattedMessage id="ui-organizations.contacts.button.submit">
        {(title) => (
          <Button
            buttonStyle="primary"
            marginBottom0
            onClick={handleSubmit}
            title={title}
            type="submit"
          >
            {title}
          </Button>
        )}
      </FormattedMessage>
    </PaneMenu>
  );
}

class ContactsEditContainer extends Component {
  static manifest = Object.freeze({
    contact: {
      type: 'okapi',
      path: (queryParams, pathComponents) => {
        if (pathComponents.id) return `${CONTACTS_API}/${pathComponents.id}`;
        return undefined;
      }
    },
  });

  render() {
    const { onSubmit, onClose, match, resources } = this.props;
    const isNew = !match.params.id;
    const loadedContact = get(resources, 'contact.records[0]', {});
    const contact = isNew ? {} : loadedContact;
    const { firstName, lastName } = contact;
    const name = `${lastName}, ${firstName}`;
    const paneTitle = isNew
      ? <FormattedMessage id="ui-organizations.contacts.create.paneTitle" />
      : <FormattedMessage id="ui-organizations.contacts.edit.paneTitle" values={{ name }} />;

    return (
      <Pane
        appIcon={<AppIcon app="organizations" appIconKey="organizations" />}
        defaultWidth="fill"
        dismissible
        lastMenu={getLastMenu(onSubmit)}
        onClose={onClose}
        paneTitle={paneTitle}
      >
        Edit component
      </Pane>
    );
  }
}

ContactsEditContainer.propTypes = {
  onSubmit: PropTypes.func,
  match: PropTypes.object,
  onClose: PropTypes.func,
  resources: PropTypes.object,
};

export default ContactsEditContainer;
