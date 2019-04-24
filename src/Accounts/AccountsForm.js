import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray,
} from 'redux-form';

import {
  Button,
  Col,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import { getDropDownItems } from '../common/utils/dropdown';
import { ORGANIZATION_STATUS } from '../common/constants';
import { Required } from '../Utils/Validate';
import css from './AccountsForm.css';

class AccountsForm extends Component {
  static propTypes = {
    parentResources: PropTypes.shape({
      dropdown: PropTypes.shape({
        paymentMethodDD: PropTypes.array.isRequired,
      })
    })
  };

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
    const { parentResources } = this.props;
    const paymentMethodDD = getDropDownItems(parentResources, 'paymentMethodDD', true);

    return (
      <div
        className={css.panels}
        key={index}
      >
        <Row key={index}>
          <Col
            xs={12}
            md={6}
          >
            <Row>
              <Col xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  label={<FormattedMessage id="ui-organizations.accounts.name" />}
                  name={`${elem}.name`}
                  required
                  validate={[Required]}
                />
              </Col>
              <Col xs={12}>
                <Field
                  label={<FormattedMessage id="ui-organizations.accounts.accountNumber" />}
                  name={`${elem}.accountNo`}
                  validate={[Required]}
                  required
                  component={TextField}
                  fullWidth
                />
              </Col>
              <Col xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  label={<FormattedMessage id="ui-organizations.accounts.description" />}
                  name={`${elem}.description`}
                />
              </Col>
              <Col xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  label={<FormattedMessage id="ui-organizations.accounts.payable" />}
                  name={`${elem}.appSystemNo`}
                />
              </Col>
              <Col xs={12}>
                <Field
                  component={Select}
                  dataOptions={paymentMethodDD}
                  fullWidth
                  label={<FormattedMessage id="ui-organizations.accounts.paymentMethod" />}
                  name={`${elem}.paymentMethod`}
                  placeholder=" "
                  required
                  validate={[Required]}
                />
              </Col>
            </Row>
          </Col>
          <Col
            xs={12}
            md={6}
          >
            <Row>
              <Col xs={12}>
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
              <Col xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  id={`${elem}.contactInfo`}
                  label={<FormattedMessage id="ui-organizations.accounts.account.contactInfo" />}
                  name={`${elem}.contactInfo`}
                />
              </Col>
              <Col xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  label={<FormattedMessage id="ui-organizations.accounts.libraryCode" />}
                  name={`${elem}.libraryCode`}
                  required
                  validate={[Required]}
                />
              </Col>
              <Col xs={12}>
                <Field
                  component={TextField}
                  fullWidth
                  label={<FormattedMessage id="ui-organizations.accounts.libraryEDICode" />}
                  name={`${elem}.libraryEdiCode`}
                  required
                  validate={[Required]}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
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
            <Button
              buttonStyle="danger"
              data-test-remove-account-button
              onClick={() => fields.remove(index)}
            >
              {<FormattedMessage id="ui-organizations.accounts.remove" />}
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray
            label="Accounts"
            name="accounts"
            component={this.renderForm}
          />
          <br />
        </Col>
      </Row>
    );
  }
}

export default AccountsForm;
