import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Col,
  Row,
  TextField,
  Label,
} from '@folio/stripes/components';
import {
  RepeatableFieldWithValidation,
  validateRequired,
} from '@folio/stripes-acq-components';

import {
  FieldLanguage,
  ButtonIsPrimary,
} from '../../../common/components';
import {
  createAddNewItem,
  removeItem,
} from '../../../common/utils';
import { validatePrimary } from '../../../common/validation';
import CategoryDropdown from '../../../Utils/CategoryDropdown';

const headLabels = (
  <Row>
    <Col
      data-test-contact-email-label-value
      xs={3}
    >
      <Label
        id="emailFormValueLabel"
        required
      >
        <FormattedMessage id="ui-organizations.contactPeople.emails.value" />
      </Label>
    </Col>

    <Col
      data-test-contact-email-label-description
      xs={2}
    >
      <Label id="emailFormDescriptionLabel">
        <FormattedMessage id="ui-organizations.contactPeople.emails.description" />
      </Label>
    </Col>

    <Col
      data-test-contact-email-label-language
      xs={2}
    >
      <Label id="emailFormLanguageLabel">
        <FormattedMessage id="ui-organizations.contactInfo.language" />
      </Label>
    </Col>

    <Col
      data-test-contact-email-label-category
      xs={3}
    >
      <Label id="emailFormCategoriesLabel">
        <FormattedMessage id="ui-organizations.data.contactTypes.categories" />
      </Label>
    </Col>

    <Col
      data-test-contact-email-label-primary
      xs={2}
    >
      <Label>
        <FormattedMessage id="ui-organizations.primaryItem" />
      </Label>
    </Col>
  </Row>
);

const EmailForm = ({ categories }) => {
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
            name={`${elem}.value`}
            required
            validate={validateRequired}
            ariaLabelledBy="emailFormValueLabel"
            validateFields={[]}
          />
        </Col>

        <Col
          data-test-contact-email-description
          xs={2}
        >
          <Field
            component={TextField}
            name={`${elem}.description`}
            ariaLabelledBy="emailFormDescriptionLabel"
            validateFields={[]}
          />
        </Col>

        <Col
          data-test-contact-email-language
          xs={2}
        >
          <FieldLanguage
            namePrefix={elem}
            withLabel={false}
            aria-labelledby="emailFormLanguageLabel"
          />
        </Col>

        <Col
          data-test-contact-email-category
          xs={3}
        >
          <CategoryDropdown
            dropdownVendorCategories={categories}
            name={elem}
            withLabel={false}
            ariaLabelledBy="emailFormCategoriesLabel"
          />
        </Col>

        <Col
          data-test-contact-email-primary
          xs={2}
        >
          <ButtonIsPrimary
            fields={fields}
            fieldIndex={index}
            labelId="ui-organizations.primaryItem"
          />
        </Col>
      </Row>
    );
  };

  return (
    <FieldArray
      headLabels={headLabels}
      addLabel={<FormattedMessage id="ui-organizations.contactPeople.addEmail" />}
      component={RepeatableFieldWithValidation}
      id="emails"
      name="emails"
      renderField={renderEmailFields}
      onAdd={addNewEmail}
      onRemove={removeItem}
      validate={validatePrimary}
    />
  );
};

EmailForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
};

export default EmailForm;
