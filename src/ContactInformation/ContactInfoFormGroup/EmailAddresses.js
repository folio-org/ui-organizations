import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray,
} from 'redux-form';

import {
  Card,
  Col,
  RepeatableField,
  Row,
  TextField,
} from '@folio/stripes/components';
import { FieldAutoSuggest } from '@folio/stripes-acq-components';

import {
  FieldLanguage,
  FieldIsPrimary,
} from '../../common/components';
import { createAddNewItem } from '../../common/utils';
import CategoryDropdown from '../../Utils/CategoryDropdown';
import { Required } from '../../Utils/Validate';

import css from './ContactInfoCard.css';

const EmailAddresses = ({ defaultLanguage, dispatchChange, dropdownLanguages, dropdownVendorCategories }) => {
  const EmailsMF = (name, index, fields) => {
    const valueKey = 'value';
    const emails = fields.getAll().filter((item, i) => item[valueKey] && i !== index);
    const nodeIsPrimary = (
      <FieldIsPrimary
        dispatchChange={dispatchChange}
        fields={fields}
        fieldIndex={index}
        fieldPrefix={name}
        labelId="ui-organizations.contactPeople.primaryEmail"
      />
    );

    return (
      <Card
        cardClass={css.contactInfoCard}
        hasMargin
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
              validate={[Required]}
              valueKey={valueKey}
              onSelect={(item) => {
                fields.remove(index);
                fields.insert(index, item);
              }}
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
            />
          </Col>
          <Col
            data-test-email-language
            xs={12}
            md={3}
          >
            <FieldLanguage
              namePrefix={name}
              dropdownLanguages={dropdownLanguages}
            />
          </Col>
          <Col
            data-test-email-category
            xs={12}
            md={3}
          >
            <CategoryDropdown
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
  dispatchChange: PropTypes.func.isRequired,
  dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default EmailAddresses;
