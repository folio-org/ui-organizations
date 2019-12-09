import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  FieldArray,
} from 'redux-form';

import {
  Col,
  RepeatableField,
  Row,
  TextField,
} from '@folio/stripes/components';
import {
  validateRequired,
} from '@folio/stripes-acq-components';

import {
  FieldLanguage,
  FieldIsPrimary,
} from '../../../common/components';
import { createAddNewItem } from '../../../common/utils';
import CategoryDropdown from '../../../Utils/CategoryDropdown';

const EmailForm = ({ languageList, categories, dispatchChange }) => {
  const addNewEmail = useCallback((fields) => createAddNewItem()(fields), []);

  const renderEmailFields = (elem, index, fields) => {
    return (
      <Row>
        <Col
          data-test-contact-email-value
          xs={3}
        >
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-organizations.contactPeople.emails.value" />}
            name={`${elem}.value`}
            required
            validate={validateRequired}
          />
        </Col>

        <Col
          data-test-contact-email-description
          xs={3}
        >
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-organizations.contactPeople.emails.description" />}
            name={`${elem}.description`}
          />
        </Col>

        <Col
          data-test-contact-email-language
          xs={2}
        >
          <FieldLanguage
            namePrefix={elem}
            dropdownLanguages={languageList}
          />
        </Col>

        <Col
          data-test-contact-email-category
          xs={3}
        >
          <CategoryDropdown
            dropdownVendorCategories={categories}
            name={elem}
          />
        </Col>

        <Col
          data-test-contact-email-primary
          xs={1}
        >
          <FieldIsPrimary
            dispatchChange={dispatchChange}
            fields={fields}
            fieldIndex={index}
            fieldPrefix={elem}
            labelId="ui-organizations.primaryItem"
            vertical
          />
        </Col>
      </Row>
    );
  };

  return (
    <FieldArray
      addLabel={<FormattedMessage id="ui-organizations.contactPeople.addEmail" />}
      component={RepeatableField}
      id="emails"
      name="emails"
      renderField={renderEmailFields}
      onAdd={addNewEmail}
    />
  );
};

EmailForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  languageList: PropTypes.arrayOf(PropTypes.object),
  dispatchChange: PropTypes.func.isRequired,
};

export default EmailForm;
