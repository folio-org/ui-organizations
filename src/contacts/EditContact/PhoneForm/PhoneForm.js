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
  FieldSelect,
} from '@folio/stripes-acq-components';

import {
  FieldLanguage,
  FieldIsPrimary,
} from '../../../common/components';
import { createAddNewItem } from '../../../common/utils';
import CategoryDropdown from '../../../Utils/CategoryDropdown';

const PhoneForm = ({ languageList, categories, dispatchChange, phoneTypesList }) => {
  const addNewPhone = useCallback((fields) => createAddNewItem()(fields), []);

  const renderEmailFields = (elem, index, fields) => {
    return (
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-organizations.contactPeople.phoneNumbers.phoneNumber" />}
            name={`${elem}.phoneNumber`}
            required
            validate={validateRequired}
          />
        </Col>

        <Col xs={3}>
          <FieldSelect
            label={<FormattedMessage id="ui-organizations.contactPeople.phoneNumbers.type" />}
            name={`${elem}.type`}
            dataOptions={phoneTypesList}
          />
        </Col>

        <Col xs={2}>
          <FieldLanguage
            namePrefix={elem}
            dropdownLanguages={languageList}
          />
        </Col>

        <Col xs={3}>
          <CategoryDropdown
            dropdownVendorCategories={categories}
            name={elem}
          />
        </Col>

        <Col xs={1}>
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
      addLabel={<FormattedMessage id="ui-organizations.contactPeople.addPhoneNumber" />}
      component={RepeatableField}
      id="phoneNumbers"
      name="phoneNumbers"
      onAdd={addNewPhone}
      renderField={renderEmailFields}
    />
  );
};

PhoneForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  languageList: PropTypes.arrayOf(PropTypes.object),
  dispatchChange: PropTypes.func.isRequired,
  phoneTypesList: PropTypes.arrayOf(PropTypes.object),
};

PhoneForm.defaultProps = {
  languageList: [],
  phoneTypesList: [],
};

export default PhoneForm;
