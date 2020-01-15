import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, FieldArray } from 'redux-form';

import {
  Button,
  Col,
  IconButton,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import { Required, isURLValid } from '../../../Utils/Validate';
import css from './OrganizationAgreementsForm.css';

class OrganizationAgreementsForm extends Component {
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
            <Col xs={6}>
              <div><em>{<FormattedMessage id="ui-organizations.agreement.pleaseAddAgreements" />}</em></div>
            </Col>
          }
          {fields.map(this.renderSubForm)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button
            data-test-vendor-term-add
            onClick={() => fields.push({})}
          >
            <FormattedMessage id="ui-organizations.agreement.add" />
          </Button>
        </Col>
      </Row>
    );
  }

  renderSubForm = (elem, index, fields) => {
    return (
      <div key={index} className={css.panels}>
        <Row key={index}>
          <Col
            xs={6}
            md={3}
          >
            <Field
              component={TextField}
              fullWidth
              id={`${elem}.name`}
              label={<FormattedMessage id="ui-organizations.agreement.name" />}
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
              component={TextField}
              fullWidth
              id={`${elem}.discount`}
              label={<FormattedMessage id="ui-organizations.agreement.discountSym" />}
              name={`${elem}.discount`}
              type="number"
            />
          </Col>
          <Col
            xs={6}
            md={3}
          >
            <Field
              component={TextField}
              fullWidth
              id={`${elem}.referenceUrl`}
              label={<FormattedMessage id="ui-organizations.agreement.referenceUrl" />}
              name={`${elem}.referenceUrl`}
              type="text"
              validate={[isURLValid]}
            />
          </Col>
          <Col
            xs={5}
            md={2}
          >
            <Field
              component={TextArea}
              fullWidth
              id={`${elem}.notes`}
              label={<FormattedMessage id="ui-organizations.agreement.notes" />}
              name={`${elem}.notes`}
            />
          </Col>
          <Col
            xs={1}
            style={{ paddingTop: '20px' }}
          >
            <IconButton
              data-test-vendor-term-remove
              icon="trash"
              onClick={() => fields.remove(index)}
            >
              {<FormattedMessage id="ui-organizations.agreement.remove" />}
            </IconButton>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <FieldArray
        component={this.renderForm}
        id="agreements"
        name="agreements"
      />

    );
  }
}

export default OrganizationAgreementsForm;
