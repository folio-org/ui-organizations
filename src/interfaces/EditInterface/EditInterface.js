import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { useHistory } from 'react-router';

import stripesForm from '@folio/stripes/final-form';
import {
  AppIcon,
  IfPermission,
} from '@folio/stripes/core';
import {
  Button,
  Checkbox,
  checkScope,
  Col,
  HasCommand,
  Headline,
  Pane,
  PaneMenu,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import {
  handleKeyCommand,
  validateRequired,
  validateURL,
} from '@folio/stripes-acq-components';

import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import TogglePassword from '../../Utils/TogglePassword';
import { INTERFACE_OPTIONS } from './util';

const EditInterface = ({
  handleSubmit,
  onClose,
  paneTitle,
  pristine,
  submitting,
  formatDD,
  deliveryMethodDD,
}) => {
  const history = useHistory();
  const getLastMenu = () => (
    <PaneMenu>
      <FormattedMessage id="ui-organizations.interface.button.save">
        {(title) => (
          <Button
            buttonStyle="primary"
            disabled={pristine || submitting}
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

  const shortcuts = [
    {
      name: 'cancel',
      shortcut: 'esc',
      handler: handleKeyCommand(onClose),
    },
    {
      name: 'save',
      handler: handleKeyCommand(handleSubmit, { disabled: pristine || submitting }),
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
        appIcon={
          <AppIcon
            app="organizations"
            appIconKey="organizations"
          />
        }
        defaultWidth="fill"
        dismissible
        id="edit-interface"
        lastMenu={getLastMenu()}
        onClose={onClose}
        paneTitle={paneTitle}
      >
        <Row>
          <Col
            xs={12}
            md={8}
            mdOffset={2}
          >
            <Row>
              <Col xs={6}>
                <Field
                  component={Select}
                  dataOptions={INTERFACE_OPTIONS}
                  fullWidth
                  label={<FormattedMessage id="ui-organizations.interface.type" />}
                  multiple
                  name="type"
                  type="select"
                />
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                md={6}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.interface.name" />}
                  name="name"
                  required
                  validate={validateRequired}
                  component={TextField}
                  fullWidth
                />
              </Col>
              <Col xs={12} md={6}>
                <Field
                  label={<FormattedMessage id="ui-organizations.interface.uri" />}
                  name="uri"
                  type="url"
                  validate={validateURL}
                  component={TextField}
                  fullWidth
                />
              </Col>
              <IfPermission perm="ui-organizations.creds.manage">
                <Col xs={12} md={6}>
                  <Field
                    label={<FormattedMessage id="ui-organizations.interface.username" />}
                    name="username"
                    component={TextField}
                    fullWidth
                  />
                </Col>
                <Col xs={12} md={6}>
                  <TogglePassword
                    name="password"
                    buttonID="button"
                  />
                </Col>
              </IfPermission>
              <Col xs={12}>
                <Field
                  label={<FormattedMessage id="ui-organizations.interface.notes" />}
                  name="notes"
                  component={TextArea}
                  fullWidth
                />
              </Col>
              <Col xs={12}>
                <Headline
                  margin="none"
                  size="large"
                >
                  <FormattedMessage id="ui-organizations.interface.statistics" />
                </Headline>
              </Col>
              <Col xs={12} md={6}>
                <Field
                  label={<FormattedMessage id="ui-organizations.interface.available" />}
                  name="available"
                  component={Checkbox}
                  type="checkbox"
                />
              </Col>
              <Col xs={12} md={6}>
                <Field
                  label={<FormattedMessage id="ui-organizations.interface.deliveryMethod" />}
                  name="deliveryMethod"
                  component={Select}
                  fullWidth
                  dataOptions={deliveryMethodDD}
                />
              </Col>
              <Col xs={12} md={6}>
                <Field
                  label={<FormattedMessage id="ui-organizations.interface.statisticsFormat" />}
                  name="statisticsFormat"
                  component={Select}
                  fullWidth
                  dataOptions={formatDD}
                />
              </Col>
              <Col xs={12} md={6}>
                <Field
                  label={<FormattedMessage id="ui-organizations.interface.locallyStored" />}
                  name="locallyStored"
                  component={TextField}
                  fullWidth
                />
              </Col>
              <Col xs={12} md={6}>
                <Field
                  label={<FormattedMessage id="ui-organizations.interface.onlineLocation" />}
                  name="onlineLocation"
                  component={TextField}
                  fullWidth
                />
              </Col>
              <Col xs={12} md={6}>
                <Field
                  label={<FormattedMessage id="ui-organizations.interface.statisticsNotes" />}
                  name="statisticsNotes"
                  component={TextArea}
                  fullWidth
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Pane>
    </HasCommand>
  );
};

EditInterface.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  paneTitle: PropTypes.node.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  formatDD: PropTypes.arrayOf(PropTypes.object),
  deliveryMethodDD: PropTypes.arrayOf(PropTypes.object),
};

export default stripesForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  navigationCheck: true,
})(EditInterface);
