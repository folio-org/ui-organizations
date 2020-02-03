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
  Label,
} from '@folio/stripes/components';
import {
  validateRequired,
} from '@folio/stripes-acq-components';

import {
  FieldLanguage,
  ButtonIsPrimary,
} from '../../../common/components';
import { createAddNewItem } from '../../../common/utils';
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
      xs={3}
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
      xs={1}
    >
      <Label>
        <FormattedMessage id="ui-organizations.primaryItem" />
      </Label>
    </Col>
  </Row>
);

const EmailForm = ({ categories, dispatchChange }) => {
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
          />
        </Col>

        <Col
          data-test-contact-email-description
          xs={3}
        >
          <Field
            component={TextField}
            name={`${elem}.description`}
            ariaLabelledBy="emailFormDescriptionLabel"
          />
        </Col>

        <Col
          data-test-contact-email-language
          xs={2}
        >
          <FieldLanguage
            namePrefix={elem}
            withLabel={false}
            ariaLabelledBy="emailFormLanguageLabel"
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
          xs={1}
        >
          <ButtonIsPrimary
            dispatchChange={dispatchChange}
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
  dispatchChange: PropTypes.func.isRequired,
};

export default EmailForm;
