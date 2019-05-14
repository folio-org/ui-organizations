import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import stripesForm from '@folio/stripes/form';
import { AppIcon } from '@folio/stripes/core';
import {
  Button,
  Checkbox,
  Col,
  Pane,
  PaneMenu,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import { isURLValid } from '../../Utils/Validate';
import TogglePassword from '../../Utils/TogglePassword';
import { shapeOptions } from './const';

import css from './EditInterface.css';

class EditInterface extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    paneTitle: PropTypes.node.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    formatDD: shapeOptions,
    deliveryMethodDD: shapeOptions,
  };

  getLastMenu = () => {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
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
  }

  render() {
    const {
      deliveryMethodDD,
      formatDD,
      onClose,
      paneTitle,
    } = this.props;

    return (
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
        lastMenu={this.getLastMenu()}
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
              <Col
                xs={12}
                md={6}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.interface.name" />}
                  name="name"
                  component={TextField}
                  fullWidth
                />
              </Col>
              <Col xs={12} md={6}>
                <Field
                  label={<FormattedMessage id="ui-organizations.interface.uri" />}
                  name="uri"
                  type="url"
                  validate={[isURLValid]}
                  component={TextField}
                  fullWidth
                />
              </Col>
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
              <Col xs={12}>
                <Field
                  label={<FormattedMessage id="ui-organizations.interface.notes" />}
                  name="notes"
                  component={TextArea}
                  fullWidth
                />
              </Col>
              <Col xs={12}>
                <div className={css.subHeadings}>
                  <FormattedMessage id="ui-organizations.interface.statistics" />
                </div>
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
    );
  }
}

export default stripesForm({
  enableReinitialize: true,
  form: 'EditInterface',
  navigationCheck: true,
})(EditInterface);
