import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field, useForm } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Card,
  Col,
  RepeatableField,
  Row,
  TextField,
} from '@folio/stripes/components';
import {
  FieldAutoSuggest,
  validateRequired,
} from '@folio/stripes-acq-components';

import {
  FieldLanguage,
  FieldIsPrimary,
} from '../../../../common/components';
import { createAddNewItem } from '../../../../common/utils';
import CategoryDropdown from '../../../../Utils/CategoryDropdown';

import css from './ContactInfoCard.css';

const EmailAddresses = ({ defaultLanguage, dropdownVendorCategories }) => {
  const { change } = useForm();
  const EmailsMF = (name, index, fields) => {
    const valueKey = 'value';
    const emails = fields.value.filter((item, i) => item[valueKey] && i !== index);
    const nodeIsPrimary = (
      <FieldIsPrimary
        change={change}
        fields={fields}
        fieldIndex={index}
        fieldPrefix={name}
        labelId="ui-organizations.contactPeople.primaryEmail"
      />
    );

    return (
      <Card
        cardClass={css.contactInfoCard}
        headerStart={nodeIsPrimary}
      >
        <Row>
          <Col
            data-test-email-value
            xs={12}
            md={3}
          >
            <FieldAutoSuggest
              items={emails}
              labelId="ui-organizations.contactInfo.emailAddress"
              name={`${name}.${valueKey}`}
              required
              validate={validateRequired}
              valueKey={valueKey}
              // eslint-disable-next-line no-unused-vars
              onSelect={({ isPrimary, ...restItem }) => fields.update(index, restItem)}
              validateFields={[]}
              withFinalForm
            />
          </Col>
          <Col
            data-test-email-description
            xs={12}
            md={3}
          >
            <Field
              label={<FormattedMessage id="ui-organizations.contactInfo.description" />}
              name={`${name}.description`}
              component={TextField}
              fullWidth
              validateFields={[]}
            />
          </Col>
          <Col
            data-test-email-language
            xs={12}
            md={3}
          >
            <FieldLanguage
              namePrefix={name}
            />
          </Col>
          <Col
            data-test-email-category
            xs={12}
            md={3}
          >
            <CategoryDropdown
              ariaLabelledBy="emailFormCategoriesLabel"
              dropdownVendorCategories={dropdownVendorCategories}
              name={name}
            />
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <FieldArray
      addLabel={<FormattedMessage id="ui-organizations.contactInfo.actions.addEmail" />}
      component={RepeatableField}
      id="emails"
      legend={<FormattedMessage id="ui-organizations.contactInfo.emailAddress" />}
      name="emails"
      onAdd={createAddNewItem(defaultLanguage)}
      renderField={EmailsMF}
    />
  );
};

EmailAddresses.propTypes = {
  defaultLanguage: PropTypes.string,
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default EmailAddresses;
