import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray,
} from 'redux-form';

import {
  Checkbox,
  Col,
  ConfirmationModal,
  RepeatableField,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import {
  validateRequired,
} from '@folio/stripes-acq-components';

import { ORGANIZATION_STATUS } from '../../../common/constants';
import { FieldLanguage } from '../../../common/components';
import resetVendorFields from './resetVendorFields';

class OrganizationSummaryForm extends Component {
  static propTypes = {
    dispatchChange: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
  };

  state = {
    isVendorUncheckConfirm: false,
  };

  renderAlias = (elem) => {
    return (
      <Row>
        <Col xs>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-organizations.summary.alias" />}
            name={`${elem}.value`}
            required
            validate={[validateRequired]}
          />
        </Col>
        <Col xs>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-organizations.summary.description" />}
            name={`${elem}.description`}
          />
        </Col>
      </Row>
    );
  };

  hideVendorUncheckConfirm = () => {
    this.setState({ isVendorUncheckConfirm: false });
    this.props.dispatchChange('isVendor', true);
  };

  handleVendorUncheck = () => {
    this.setState({ isVendorUncheckConfirm: false });
    this.resetVendorFields();
  };

  resetVendorFields = () => {
    const { dispatchChange } = this.props;

    resetVendorFields.forEach(field => dispatchChange(field, null));
  };

  onChangeIsVendor = (e, value) => {
    const { initialValues } = this.props;

    if (initialValues.id && !value) this.setState({ isVendorUncheckConfirm: true });
  };

  render() {
    const { isVendorUncheckConfirm } = this.state;

    return (
      <Row>
        <Col
          xs={6}
          md={3}
        >
          <Field
            component={TextField}
            fullWidth
            id="name"
            label={<FormattedMessage id="ui-organizations.summary.name" />}
            name="name"
            required
            validate={[validateRequired]}
          />
        </Col>
        <Col
          xs={6}
          md={3}
        >
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-organizations.summary.code" />}
            name="code"
            required
            validate={[validateRequired]}
          />
        </Col>
        <Col
          xs={6}
          md={3}
        >
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-organizations.summary.accountingCode" />}
            name="erpCode"
          />
        </Col>
        <Col
          xs={6}
          md={3}
        >
          <Field
            component={Select}
            fullWidth
            label={<FormattedMessage id="ui-organizations.summary.organizationStatus" />}
            name="status"
            placeholder=" "
            required
            validate={[validateRequired]}
          >
            {Object.keys(ORGANIZATION_STATUS).map((key) => (
              <FormattedMessage
                id={`ui-organizations.organizationStatus.${key}`}
                key={key}
              >
                {(message) => <option value={ORGANIZATION_STATUS[key]}>{message}</option>}
              </FormattedMessage>
            ))}
          </Field>
        </Col>
        <Col
          xs={6}
          md={3}
        >
          <FieldLanguage
            labelId="ui-organizations.summary.defaultLanguage"
            name="language"
          />
        </Col>
        <Col
          xs={6}
          md={3}
        >
          <Field
            component={Checkbox}
            label={<FormattedMessage id="ui-organizations.summary.isVendor" />}
            name="isVendor"
            type="checkbox"
            onChange={this.onChangeIsVendor}
            vertical
          />
        </Col>
        <Col
          xs={6}
          md={3}
        >
          <Field
            label={<FormattedMessage id="ui-organizations.summary.description" />}
            name="description"
            component={TextArea}
          />
        </Col>
        <Col xs={6}>
          <FieldArray
            addLabel={<FormattedMessage id="ui-organizations.summary.add" />}
            component={RepeatableField}
            id="aliases"
            legend={<FormattedMessage id="ui-organizations.summary.alternativeNames" />}
            name="aliases"
            renderField={this.renderAlias}
          />
        </Col>

        {isVendorUncheckConfirm && (
          <ConfirmationModal
            id="uncheck-is-vendor-confirmation"
            confirmLabel={<FormattedMessage id="ui-organizations.vendor.confirmation.confirm" />}
            heading={<FormattedMessage id="ui-organizations.vendor.confirmation.heading" />}
            message={<FormattedMessage id="ui-organizations.vendor.confirmation.message" />}
            onCancel={this.hideVendorUncheckConfirm}
            onConfirm={this.handleVendorUncheck}
            open
          />
        )}
      </Row>
    );
  }
}

export default OrganizationSummaryForm;
