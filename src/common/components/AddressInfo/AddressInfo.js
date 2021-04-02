import React from 'react';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Card,
  Col,
  countries,
  Row,
  TextField,
} from '@folio/stripes/components';
import {
  FieldAutoSuggestFinal,
  FieldSelectionFinal,
  RepeatableFieldWithValidation,
} from '@folio/stripes-acq-components';

import CategoryDropdown from '../../../Utils/CategoryDropdown';
import {
  createAddNewItem,
  removeItem,
} from '../../utils';
import { validatePrimary } from '../../validation';
import FieldLanguage from '../FieldLanguage';
import FieldIsPrimary from '../FieldIsPrimary';

import css from './AddressInfo.css';

const AddressInfo = ({
  defaultLanguage,
  dropdownVendorCategories,
  intl,
}) => {
  const countriesOptions = countries.map(c => ({
    label: intl.formatMessage({ id: `stripes-components.countries.${c.alpha2}` }),
    value: c.alpha3,
  }));

  // eslint-disable-next-line react/prop-types
  const Address = (name, index, fields) => {
    const valueKey = 'addressLine1';
    const addresses = fields.value.filter((address, i) => address[valueKey] && i !== index);
    const nodeIsPrimary = (
      <FieldIsPrimary
        fields={fields}
        fieldIndex={index}
        fieldPrefix={name}
        labelId="ui-organizations.contactPeople.primaryAddress"
      />
    );

    return (
      <Card
        cardClass={css.contactInfoCard}
        headerStart={nodeIsPrimary}
      >
        <Row>
          <Col
            data-test-address-1
            xs={12}
            md={3}
          >
            <FieldAutoSuggestFinal
              id={`${name}.addressLine1`}
              items={addresses}
              labelId="ui-organizations.data.contactTypes.addressLine1"
              name={`${name}.addressLine1`}
              valueKey={valueKey}
              // eslint-disable-next-line no-unused-vars
              onSelect={({ isPrimary, ...restItem }) => fields.update(index, restItem)}
              validateFields={[]}
              withFinalForm
            />
          </Col>
          <Col
            data-test-address-2
            xs={12}
            md={3}
          >
            <Field
              label={<FormattedMessage id="ui-organizations.data.contactTypes.addressLine2" />}
              name={`${name}.addressLine2`}
              component={TextField}
              fullWidth
              validateFields={[]}
            />
          </Col>
          <Col
            data-test-address-city
            xs={12}
            md={3}
          >
            <Field
              label={<FormattedMessage id="ui-organizations.data.contactTypes.city" />}
              name={`${name}.city`}
              component={TextField}
              fullWidth
              validateFields={[]}
            />
          </Col>
          <Col
            data-test-address-state
            xs={12}
            md={3}
          >
            <Field
              label={<FormattedMessage id="ui-organizations.data.contactTypes.stateProviceOrRegion" />}
              name={`${name}.stateRegion`}
              id={`${name}.stateRegion`}
              component={TextField}
              fullWidth
              validateFields={[]}
            />
          </Col>
          <Col
            data-test-address-zip
            xs={12}
            md={3}
          >
            <Field
              label={<FormattedMessage id="ui-organizations.data.contactTypes.zipOrPostalCode" />}
              name={`${name}.zipCode`}
              id={`${name}.zipCode`}
              component={TextField}
              fullWidth
              validateFields={[]}
            />
          </Col>
          <Col
            data-test-address-country
            xs={12}
            md={3}
          >
            <FieldSelectionFinal
              label={<FormattedMessage id="ui-organizations.data.contactTypes.country" />}
              name={`${name}.country`}
              dataOptions={countriesOptions}
              validateFields={[]}
            />
          </Col>
          <Col
            data-test-address-language
            xs={12}
            md={3}
          >
            <FieldLanguage
              namePrefix={name}
            />
          </Col>
          <Col
            data-test-address-category
            xs={12}
            md={3}
          >
            <CategoryDropdown
              ariaLabelledBy="addressFormCategoriesLabel"
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
      addLabel={<FormattedMessage id="ui-organizations.contactInfo.actions.addAddress" />}
      component={RepeatableFieldWithValidation}
      id="addresses"
      legend={<FormattedMessage id="ui-organizations.data.contactTypes.address" />}
      name="addresses"
      onAdd={createAddNewItem(defaultLanguage)}
      onRemove={removeItem}
      renderField={Address}
      validate={validatePrimary}
    />
  );
};

AddressInfo.propTypes = {
  defaultLanguage: PropTypes.string,
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AddressInfo);
