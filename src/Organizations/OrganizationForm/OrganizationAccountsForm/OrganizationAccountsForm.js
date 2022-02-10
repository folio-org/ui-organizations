import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import PropTypes from 'prop-types';

import {
  Button,
  Col,
  IconButton,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import {
  AcqUnitsField,
  FieldSelectFinal,
  PAYMENT_METHOD_OPTIONS,
  validateRequired,
} from '@folio/stripes-acq-components';

import { ORGANIZATION_STATUS } from '../../../common/constants';
import { FieldAccountNumber } from './FieldAccountNumber';
import css from './OrganizationAccountsForm.css';

class OrganizationAccountsForm extends Component {
  renderForm = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          {fields.length === 0 && (
            <div>
              <em>
                <FormattedMessage id="ui-organizations.accounts.pleaseAddAccount" />
              </em>
            </div>
          )}
          {fields.map((elem, index) => this.renderSubForm(elem, index, fields))}
        </Col>
        <Col
          xs={12}
          style={{ paddingTop: '10px' }}
        >
          <Button
            data-test-add-account-button
            onClick={() => fields.push({})}
          >
            <FormattedMessage id="ui-organizations.accounts.add" />
          </Button>
        </Col>
      </Row>
    );
  };

  renderSubForm = (elem, index, fields) => {
    const isEditMode = Boolean(this.props.initialAccounts?.[index]?.name);

    return (
      <div
        className={css.panels}
        key={index}
      >
        <Row key={index}>
          <Col
            xs={6}
            md={3}
          >
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-organizations.accounts.name" />}
              name={`${elem}.name`}
              required
              validate={validateRequired}
              validateFields={[]}
            />
          </Col>
          <Col
            xs={6}
            md={3}
          >
            <FieldAccountNumber name={`${elem}.accountNo`} />
          </Col>
          <Col
            xs={6}
            md={3}
          >
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-organizations.accounts.description" />}
              name={`${elem}.description`}
              validateFields={[]}
            />
          </Col>
          <Col
            xs={6}
            md={3}
          >
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-organizations.accounts.payable" />}
              name={`${elem}.appSystemNo`}
              validateFields={[]}
            />
          </Col>
          <Col
            xs={6}
            md={3}
          >
            <FieldSelectFinal
              dataOptions={PAYMENT_METHOD_OPTIONS}
              label={<FormattedMessage id="ui-organizations.accounts.paymentMethod" />}
              name={`${elem}.paymentMethod`}
              validateFields={[]}
            />
          </Col>
          <Col
            xs={6}
            md={3}
          >
            <Field
              component={Select}
              fullWidth
              label={<FormattedMessage id="ui-organizations.accounts.account.accountStatus" />}
              name={`${elem}.accountStatus`}
              placeholder=" "
              required
              validate={validateRequired}
              validateFields={[]}
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
            <Field
              component={TextField}
              fullWidth
              id={`${elem}.contactInfo`}
              label={<FormattedMessage id="ui-organizations.accounts.account.contactInfo" />}
              name={`${elem}.contactInfo`}
              validateFields={[]}
            />
          </Col>
          <Col
            xs={6}
            md={3}
          >
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-organizations.accounts.libraryCode" />}
              name={`${elem}.libraryCode`}
              validateFields={[]}
            />
          </Col>
          <Col
            xs={6}
            md={3}
          >
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-organizations.accounts.libraryEDICode" />}
              name={`${elem}.libraryEdiCode`}
              validateFields={[]}
            />
          </Col>
          <Col
            xs={6}
            md={3}
          >
            <Field
              component={TextArea}
              fullWidth
              id={`${elem}.notes`}
              label={<FormattedMessage id="ui-organizations.accounts.notes" />}
              name={`${elem}.notes`}
              validateFields={[]}
            />
          </Col>
          <Col
            xs={6}
            md={3}
          >
            <AcqUnitsField
              id={`account-acq-units-${index}`}
              name={`${elem}.acqUnitIds`}
              isEdit={isEditMode}
              preselectedUnits={this.props.initialAccounts?.[index]?.acqUnitIds || undefined}
              isFinal
            />
          </Col>
          <Col
            xs={12}
            style={{ textAlign: 'right' }}
          >
            <IconButton
              data-test-remove-account-button
              icon="trash"
              onClick={() => fields.remove(index)}
            >
              <FormattedMessage id="ui-organizations.accounts.remove" />
            </IconButton>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    return (
      <FieldArray
        name="accounts"
        component={this.renderForm}
        validateFields={[]}
      />
    );
  }
}

OrganizationAccountsForm.propTypes = {
  initialAccounts: PropTypes.arrayOf(PropTypes.object),
};

export default OrganizationAccountsForm;
