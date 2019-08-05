import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray,
} from 'redux-form';

import {
  Col,
  RepeatableField,
  Row,
  Select,
} from '@folio/stripes/components';
import { FieldAutoSuggest } from '@folio/stripes-acq-components';

import CategoryDropdown from '../../Utils/CategoryDropdown';
import { Required } from '../../Utils/Validate';
import FieldLanguage from './FieldLanguage';
import createAddNewItem from './createAddNewItem';

const PhoneNumbers = ({ defaultLanguage, dropdownVendorCategories, dropdownPhoneType, dropdownLanguages }) => {
  const PhoneNumbersMF = (name, index, fields) => {
    const valueKey = 'phoneNumber';
    const phones = fields.getAll().filter((item, i) => item[valueKey] && i !== index);

    return (
      <Row>
        <Col
          data-test-phone-number
          xs={12}
          md={3}
        >
          <FieldAutoSuggest
            items={phones}
            labelId="ui-organizations.contactPeople.phoneNumber"
            name={`${name}.phoneNumber`}
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
          data-test-phone-type
          xs={12}
          md={3}
        >
          <Field
            label={<FormattedMessage id="ui-organizations.contactPeople.type" />}
            name={`${name}.type`}
            id={`${name}.type`}
            component={Select}
            fullWidth
            dataOptions={dropdownPhoneType}
          />
        </Col>
        <Col
          data-test-phone-language
          xs={12}
          md={3}
        >
          <FieldLanguage
            namePrefix={name}
            dropdownLanguages={dropdownLanguages}
          />
        </Col>
        <Col
          data-test-phone-category
          xs={12}
          md={3}
        >
          <CategoryDropdown
            dropdownVendorCategories={dropdownVendorCategories}
            name={name}
          />
        </Col>
      </Row>
    );
  };

  return (
    <FieldArray
      addLabel={<FormattedMessage id="ui-organizations.contactInfo.actions.addPhoneNumber" />}
      component={RepeatableField}
      id="phone-numbers"
      legend={<FormattedMessage id="ui-organizations.contactInfo.phoneNumbers" />}
      name="phoneNumbers"
      onAdd={createAddNewItem(defaultLanguage)}
      renderField={PhoneNumbersMF}
    />
  );
};

PhoneNumbers.propTypes = {
  defaultLanguage: PropTypes.string,
  dropdownPhoneType: PropTypes.arrayOf(PropTypes.object),
  dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default PhoneNumbers;
