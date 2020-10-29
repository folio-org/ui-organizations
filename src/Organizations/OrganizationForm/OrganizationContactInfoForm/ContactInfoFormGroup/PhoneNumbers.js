import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useForm } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Card,
  Col,
  RepeatableField,
  Row,
} from '@folio/stripes/components';
import {
  FieldAutoSuggestFinal,
  FieldSelectFinal,
  validateRequired,
} from '@folio/stripes-acq-components';

import {
  FieldLanguage,
  FieldIsPrimary,
} from '../../../../common/components';
import { createAddNewItem } from '../../../../common/utils';
import CategoryDropdown from '../../../../Utils/CategoryDropdown';

import css from './ContactInfoCard.css';

const PhoneNumbers = ({
  defaultLanguage,
  dropdownPhoneType,
  dropdownVendorCategories,
}) => {
  const { change } = useForm();
  const PhoneNumbersMF = (name, index, fields) => {
    const valueKey = 'phoneNumber';
    const phones = fields.value.filter((item, i) => item[valueKey] && i !== index);
    const nodeIsPrimary = (
      <FieldIsPrimary
        change={change}
        fields={fields}
        fieldIndex={index}
        fieldPrefix={name}
        labelId="ui-organizations.contactPeople.primaryPhone"
      />
    );

    return (
      <Card
        cardClass={css.contactInfoCard}
        headerStart={nodeIsPrimary}
      >
        <Row>
          <Col
            data-test-phone-number
            xs={12}
            md={3}
          >
            <FieldAutoSuggestFinal
              items={phones}
              labelId="ui-organizations.contactPeople.phoneNumber"
              name={`${name}.phoneNumber`}
              required
              validate={validateRequired}
              valueKey={valueKey}
              // eslint-disable-next-line no-unused-vars
              onSelect={({ isPrimary, ...restItem }) => fields.update(index, restItem)}
              validateFields={[]}
              withFinalForm
            />
          </Col>
          <Col
            data-test-phone-type
            xs={12}
            md={3}
          >
            <FieldSelectFinal
              label={<FormattedMessage id="ui-organizations.contactPeople.type" />}
              name={`${name}.type`}
              id={`${name}.type`}
              dataOptions={dropdownPhoneType}
              validateFields={[]}
            />
          </Col>
          <Col
            data-test-phone-language
            xs={12}
            md={3}
          >
            <FieldLanguage
              namePrefix={name}
            />
          </Col>
          <Col
            data-test-phone-category
            xs={12}
            md={3}
          >
            <CategoryDropdown
              ariaLabelledBy="phoneFormCategoriesLabel"
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
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default PhoneNumbers;
