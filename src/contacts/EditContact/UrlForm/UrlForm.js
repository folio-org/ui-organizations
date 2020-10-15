import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Col,
  RepeatableField,
  Row,
  TextField,
  Label,
} from '@folio/stripes/components';

import {
  FieldLanguage,
  ButtonIsPrimary,
} from '../../../common/components';
import { createAddNewItem } from '../../../common/utils';
import { isURLValid } from '../../../Utils/Validate';
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
      xs={2}
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
      xs={2}
    >
      <Label>
        <FormattedMessage id="ui-organizations.primaryItem" />
      </Label>
    </Col>
  </Row>
);

const UrlForm = ({ categories, change }) => {
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
            validate={isURLValid}
            ariaLabelledBy="urlFormValueLabel"
            validateFields={[]}
          />
        </Col>

        <Col
          data-test-contact-url-description
          xs={2}
        >
          <Field
            component={TextField}
            name={`${elem}.description`}
            ariaLabelledBy="urlFormDescriptionLabel"
            validateFields={[]}
          />
        </Col>

        <Col
          data-test-contact-url-language
          xs={2}
        >
          <FieldLanguage
            namePrefix={elem}
            aria-labelledby="urlFormLanguageLabel"
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
          xs={2}
        >
          <ButtonIsPrimary
            change={change}
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
  change: PropTypes.func.isRequired,
};

export default UrlForm;
