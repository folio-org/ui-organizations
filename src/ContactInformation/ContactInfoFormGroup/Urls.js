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

import CategoryDropdown from '../../Utils/CategoryDropdown';
import { isURLValid, Required } from '../../Utils/Validate';
import FieldLanguage from './FieldLanguage';
import createAddNewItem from './createAddNewItem';
import FieldIsPrimary from './FieldIsPrimary';
import css from './ContactInfoCard.css';

const Urls = ({ defaultLanguage, dispatchChange, dropdownLanguages, dropdownVendorCategories }) => {
  const UrlsMF = (name, index, fields) => {
    const valueKey = 'value';
    const urls = fields.getAll().filter((item, i) => item[valueKey] && i !== index);
    const nodeIsPrimary = (
      <FieldIsPrimary
        dispatchChange={dispatchChange}
        fields={fields}
        fieldIndex={index}
        fieldPrefix={name}
        labelId="ui-organizations.contactPeople.primaryUrl"
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
            data-test-url-value
            xs={12}
            md={3}
          >
            <FieldAutoSuggest
              items={urls}
              labelId="ui-organizations.contactInfo.url"
              name={`${name}.${valueKey}`}
              required
              validate={[Required, isURLValid]}
              placeholder="http(s):// or ftp(s)://"
              valueKey={valueKey}
              onSelect={(item) => {
                fields.remove(index);
                fields.insert(index, item);
              }}
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
            />
          </Col>
          <Col
            data-test-url-language
            xs={12}
            md={3}
          >
            <FieldLanguage
              namePrefix={name}
              dropdownLanguages={dropdownLanguages}
            />
          </Col>
          <Col
            data-test-url-category
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
  dispatchChange: PropTypes.func.isRequired,
  dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default Urls;
