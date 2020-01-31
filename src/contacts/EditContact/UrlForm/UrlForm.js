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
      data-test-contact-url-label-value
      xs={3}
    >
      <Label
        id="urlFormValueLabel"
        required
      >
        <FormattedMessage id="ui-organizations.contactPeople.urls.value" />
      </Label>
    </Col>

    <Col
      data-test-contact-url-label-description
      xs={3}
    >
      <Label id="urlFormDescriptionLabel">
        <FormattedMessage id="ui-organizations.contactPeople.urls.description" />
      </Label>
    </Col>

    <Col
      data-test-contact-url-label-language
      xs={2}
    >
      <Label id="urlFormLanguageLabel">
        <FormattedMessage id="ui-organizations.contactInfo.language" />
      </Label>
    </Col>

    <Col
      data-test-contact-url-label-category
      xs={3}
    >
      <Label id="urlFormCategoriesLabel">
        <FormattedMessage id="ui-organizations.data.contactTypes.categories" />
      </Label>
    </Col>

    <Col
      data-test-contact-url-label-primary
      xs={1}
    >
      <Label>
        <FormattedMessage id="ui-organizations.primaryItem" />
      </Label>
    </Col>
  </Row>
);

const UrlForm = ({ categories, dispatchChange }) => {
  const addNewUrl = useCallback((fields) => createAddNewItem()(fields), []);

  const renderEmailFields = (elem, index, fields) => {
    return (
      <Row>
        <Col
          data-test-contact-url-value
          xs={3}
        >
          <Field
            component={TextField}
            name={`${elem}.value`}
            required
            validate={validateRequired}
            ariaLabelledBy="urlFormValueLabel"
          />
        </Col>

        <Col
          data-test-contact-url-description
          xs={3}
        >
          <Field
            component={TextField}
            name={`${elem}.description`}
            ariaLabelledBy="urlFormDescriptionLabel"
          />
        </Col>

        <Col
          data-test-contact-url-language
          xs={2}
        >
          <FieldLanguage
            namePrefix={elem}
            ariaLabelledBy="urlFormLanguageLabel"
            withLabel={false}
          />
        </Col>

        <Col
          data-test-contact-url-category
          xs={3}
        >
          <CategoryDropdown
            dropdownVendorCategories={categories}
            name={elem}
            ariaLabelledBy="urlFormCategoriesLabel"
            withLabel={false}
          />
        </Col>

        <Col
          data-test-contact-url-primary
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
      addLabel={<FormattedMessage id="ui-organizations.contactPeople.addUrl" />}
      component={RepeatableField}
      headLabel={headLabels}
      id="urls"
      name="urls"
      onAdd={addNewUrl}
      renderField={renderEmailFields}
    />
  );
};

UrlForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  dispatchChange: PropTypes.func.isRequired,
};

export default UrlForm;
