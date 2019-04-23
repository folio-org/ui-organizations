import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray,
} from 'redux-form';

import {
  Button,
  Checkbox,
  Col,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import { ORGANIZATION_STATUS } from '../common/constants';
import { Required } from '../Utils/Validate';
import css from './SummaryForm.css';

class SummaryForm extends Component {
  static propTypes = {
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
  };

  renderList = ({ fields }) => {
    return (
      <Row>
        <Col xs={6}>
          <div className={css.subHeadings}>
            {<FormattedMessage id="ui-organizations.summary.alternativeNames" />}
          </div>
        </Col>
        <Col xs={12}>
          {fields.length === 0 &&
            <div>
              <em>
                {<FormattedMessage id="ui-organizations.summary.pleaseAddAltNames" />}
              </em>
            </div>
          }
          {fields.map(this.renderSubFields)}
        </Col>
        <Col
          xs={12}
          style={{ paddingTop: '10px' }}
        >
          <Button
            data-test-add-name-button
            onClick={() => fields.push({})}
          >
            {<FormattedMessage id="ui-organizations.summary.add" />}
          </Button>
        </Col>
      </Row>
    );
  }

  renderSubFields = (elem, index, fields) => {
    return (
      <div
        className={css.panels}
        key={index}
      >
        <Row>
          <Col xs={5}>
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-organizations.summary.alias" />}
              name={`${elem}.value`}
              required
              validate={[Required]}
            />
          </Col>
          <Col xs={5}>
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-organizations.summary.description" />}
              name={`${elem}.description`}
            />
          </Col>
          <Col xs={1}>
            <Button
              buttonStyle="danger"
              data-test-remove-name-button
              onClick={() => fields.remove(index)}
              style={{ marginTop: '23px' }}
            >
              {<FormattedMessage id="ui-organizations.summary.remove" />}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <Field
            component={TextField}
            fullWidth
            id="name"
            label={<FormattedMessage id="ui-organizations.summary.name" />}
            name="name"
            required
            validate={[Required]}
          />
        </Col>
        <Col
          xs={12}
          md={6}
        >
          <Field
            component={Checkbox}
            label={<FormattedMessage id="ui-organizations.summary.isVendor" />}
            name="isVendor"
            type="checkbox"
          />
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-organizations.summary.code" />}
            name="code"
            required
            validate={[Required]}
          />
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-organizations.summary.accountingCode" />}
            name="erpCode"
          />
          <Field
            component={Select}
            fullWidth
            label={<FormattedMessage id="ui-organizations.summary.organizationStatus" />}
            name="status"
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
          <Field
            component={Select}
            dataOptions={this.props.dropdownLanguages}
            fullWidth
            label={<FormattedMessage id="ui-organizations.summary.defaultLanguage" />}
            name="language"
          />
        </Col>
        <Col
          xs={12}
          md={6}
        >
          <Field
            label={<FormattedMessage id="ui-organizations.summary.description" />}
            name="description"
            component={TextArea}
            style={{ width: '100%', height: '139px' }}
          />
        </Col>
        <Col xs={12}>
          <FieldArray
            label="Vendor Names"
            name="aliases"
            component={this.renderList}
          />
        </Col>
      </Row>
    );
  }
}

export default SummaryForm;
