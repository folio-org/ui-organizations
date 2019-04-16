import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import { Row, Col, Button, TextField, TextArea, Select } from '@folio/stripes/components';
import { Required } from '../Utils/Validate';
import css from './AccountsForm.css';
import { getDropDownItems } from '../common/utils/dropdown';


class AccountsForm extends Component {
  static propTypes = {
    parentResources: PropTypes.shape({
      dropdown: PropTypes.shape({
        paymentMethodDD: PropTypes.array.isRequired,
        statusDD: PropTypes.array.isRequired
      })
    })
  };

  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
  }

  renderForm = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          {fields.length === 0 &&
            <div><em>{<FormattedMessage id="ui-organizations.accounts.pleaseAddAccount" />}</em></div>
          }
          {fields.map(this.renderSubForm)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>{<FormattedMessage id="ui-organizations.accounts.add" />}</Button>
        </Col>
      </Row>
    );
  };

  renderSubForm = (elem, index, fields) => {
    const { parentResources } = this.props;
    const paymentMethodDD = getDropDownItems(parentResources, 'paymentMethodDD', true);
    const statusDD = getDropDownItems(parentResources, 'statusDD', true);
    return (
      <div key={index} className={css.panels}>
        <Row key={index}>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12}>
                <Field label={<FormattedMessage id="ui-organizations.accounts.name" />} name={`${elem}.name`} id={`${elem}.name`} validate={[Required]} component={TextField} fullWidth required />
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
                <Field label={<FormattedMessage id="ui-organizations.accounts.description" />} name={`${elem}.description`} id={`${elem}.description`} component={TextField} fullWidth />
              </Col>
              <Col xs={12}>
                <Field label={<FormattedMessage id="ui-organizations.accounts.payable" />} name={`${elem}.appSystemNo`} id={`${elem}.appSystemNo`} component={TextField} fullWidth />
              </Col>
              <Col xs={12}>
                <Field
                  label={<FormattedMessage id="ui-organizations.accounts.paymentMethod" />}
                  name={`${elem}.paymentMethod`}
                  placeholder=" "
                  dataOptions={paymentMethodDD}
                  validate={[Required]}
                  component={Select}
                  fullWidth
                  required
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12}>
                <Field
                  label={<FormattedMessage id="ui-organizations.accounts.accountStatus" />}
                  name={`${elem}.accountStatus`}
                  component={Select}
                  placeholder=" "
                  dataOptions={statusDD}
                  validate={[Required]}
                  required
                  fullWidth
                />
              </Col>
              <Col xs={12}>
                <Field label="Contact Info" name={`${elem}.contactInfo`} id={`${elem}.contactInfo`} component={TextField} fullWidth />
              </Col>
              <Col xs={12}>
                <Field
                  label={<FormattedMessage id="ui-organizations.accounts.libraryCode" />}
                  name={`${elem}.libraryCode`}
                  validate={[Required]}
                  required
                  component={TextField}
                  fullWidth
                />
              </Col>
              <Col xs={12}>
                <Field
                  label={<FormattedMessage id="ui-organizations.accounts.libraryEDICode" />}
                  name={`${elem}.libraryEdiCode`}
                  validate={[Required]}
                  required
                  component={TextField}
                  fullWidth
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Field label="notes" name={`${elem}.notes`} id={`${elem}.notes`} component={TextArea} fullWidth />
          </Col>
          <Col xs={12} style={{ textAlign: 'right' }}>
            <Button onClick={() => fields.remove(index)} buttonStyle="danger">
              Remove
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
          <FieldArray label="Accounts" name="accounts" id="accounts" component={this.renderForm} />
          <br />
        </Col>
      </Row>
    );
  }
}

export default AccountsForm;
