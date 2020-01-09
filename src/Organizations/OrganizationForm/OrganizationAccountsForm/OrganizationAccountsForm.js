import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  FieldArray,
} from 'redux-form';

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
  FieldSelect,
  PAYMENT_METHOD_OPTIONS,
} from '@folio/stripes-acq-components';

import { ORGANIZATION_STATUS } from '../../../common/constants';
import { Required } from '../../../Utils/Validate';
import css from './OrganizationAccountsForm.css';

class OrganizationAccountsForm extends Component {
  renderForm = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          {fields.length === 0 &&
            <div>
              <em>
                {<FormattedMessage id="ui-organizations.accounts.pleaseAddAccount" />}
              </em>
            </div>
          }
          {fields.map(this.renderSubForm)}
        </Col>
        <Col
          xs={12}
          style={{ paddingTop: '10px' }}
        >
          <Button
            data-test-add-account-button
            onClick={() => fields.push({})}
          >
            {<FormattedMessage id="ui-organizations.accounts.add" />}
          </Button>
        </Col>
      </Row>
    );
  };

  renderSubForm = (elem, index, fields) => {
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
              validate={[Required]}
            />
          </Col>
          <Col
            xs={6}
            md={3}
          >
            <Field
              label={<FormattedMessage id="ui-organizations.accounts.accountNumber" />}
              name={`${elem}.accountNo`}
              validate={[Required]}
              required
              component={TextField}
              fullWidth
            />
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
            />
          </Col>
          <Col
            xs={6}
            md={3}
          >
            <FieldSelect
              dataOptions={PAYMENT_METHOD_OPTIONS}
              label={<FormattedMessage id="ui-organizations.accounts.paymentMethod" />}
              name={`${elem}.paymentMethod`}
              required
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
              validate={[Required]}
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
              required
              validate={[Required]}
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
              required
              validate={[Required]}
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
              {<FormattedMessage id="ui-organizations.accounts.remove" />}
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
      />
    );
  }
}

export default OrganizationAccountsForm;
