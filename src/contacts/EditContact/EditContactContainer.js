import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import {
  Button,
  Pane,
  PaneMenu,
  Row,
  Col,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { categoriesResource, contactResource } from '../../common/resources';
import EditContact from './EditContact';

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

class EditContactContainer extends Component {
  static manifest = Object.freeze({
    contact: contactResource,
    categories: categoriesResource,
  });

  render() {
    const { onSubmit, onClose, match, resources, stripes } = this.props;
    const isNew = !match.params.id;
    const loadedContact = get(resources, 'contact.records[0]', {});
    const categories = get(resources, 'categories.records', []);
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
        id="edit-contact"
        lastMenu={getLastMenu(onSubmit)}
        onClose={onClose}
        paneTitle={paneTitle}
      >
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <EditContact
              categories={categories}
              initialValues={contact}
              stripes={stripes}
            />
          </Col>
        </Row>
      </Pane>
    );
  }
}

EditContactContainer.propTypes = {
  match: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  resources: PropTypes.object,
  stripes: PropTypes.object,
};

export default EditContactContainer;
