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
  FieldAutoSuggestFinal,
} from '@folio/stripes-acq-components';

import {
  FieldLanguage,
  FieldIsPrimary,
} from '../../../../common/components';
import { createAddNewItem } from '../../../../common/utils';
import CategoryDropdown from '../../../../Utils/CategoryDropdown';
import { isURLValid } from '../../../../Utils/Validate';

import css from './ContactInfoCard.css';

const Urls = ({ defaultLanguage, dropdownVendorCategories }) => {
  const { change } = useForm();
  const UrlsMF = (name, index, fields) => {
    const valueKey = 'value';
    const urls = fields.value.filter((item, i) => item[valueKey] && i !== index);
    const nodeIsPrimary = (
      <FieldIsPrimary
        change={change}
        fields={fields}
        fieldIndex={index}
        fieldPrefix={name}
        labelId="ui-organizations.contactPeople.primaryUrl"
      />
    );

    return (
      <Card
        cardClass={css.contactInfoCard}
        headerStart={nodeIsPrimary}
      >
        <Row>
          <Col
            data-test-url-value
            xs={12}
            md={3}
          >
            <FieldAutoSuggestFinal
              items={urls}
              labelId="ui-organizations.contactInfo.url"
              name={`${name}.${valueKey}`}
              required
              validate={isURLValid}
              placeholder="http(s):// or ftp(s)://"
              valueKey={valueKey}
              // eslint-disable-next-line no-unused-vars
              onSelect={({ isPrimary, ...restItem }) => fields.update(index, restItem)}
              validateFields={[]}
              withFinalForm
            />
          </Col>
          <Col
            data-test-url-description
            xs={12}
            md={3}
          >
            <Field
              label={<FormattedMessage id="ui-organizations.contactInfo.description" />}
              name={`${name}.description`}
              component={TextField}
              fullWidth
              validateFields={[]}
              validate={isURLValid}
            />
          </Col>
          <Col
            data-test-url-language
            xs={12}
            md={3}
          >
            <FieldLanguage
              namePrefix={name}
            />
          </Col>
          <Col
            data-test-url-category
            xs={12}
            md={3}
          >
            <CategoryDropdown
              ariaLabelledBy="urlFormCategoriesLabel"
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
      addLabel={<FormattedMessage id="ui-organizations.contactInfo.addURL" />}
      component={RepeatableField}
      id="urls"
      legend={<FormattedMessage id="ui-organizations.contactInfo.urls" />}
      name="urls"
      onAdd={createAddNewItem(defaultLanguage)}
      renderField={UrlsMF}
    />
  );
};

Urls.propTypes = {
  defaultLanguage: PropTypes.string,
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default Urls;
