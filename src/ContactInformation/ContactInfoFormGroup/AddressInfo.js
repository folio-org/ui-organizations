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
  Select,
  TextField,
} from '@folio/stripes/components';
import { FieldAutoSuggest } from '@folio/stripes-acq-components';

import CategoryDropdown from '../../Utils/CategoryDropdown';
import FieldLanguage from './FieldLanguage';
import createAddNewItem from './createAddNewItem';
import FieldIsPrimary from './FieldIsPrimary';
import css from './ContactInfoCard.css';

const AddressInfo = ({
  defaultLanguage,
  dispatchChange,
  dropdownCountry,
  dropdownLanguages,
  dropdownVendorCategories,
}) => {
  // eslint-disable-next-line react/prop-types
  const Address = (name, index, fields) => {
    const valueKey = 'addressLine1';
    const addresses = fields.getAll().filter((address, i) => address[valueKey] && i !== index);
    const nodeIsPrimary = (
      <FieldIsPrimary
        dispatchChange={dispatchChange}
        fields={fields}
        fieldIndex={index}
        fieldPrefix={name}
        labelId="ui-organizations.contactPeople.primaryAddress"
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
            data-test-address-1
            xs={12}
            md={3}
          >
            <FieldAutoSuggest
              id={`${name}.addressLine1`}
              items={addresses}
              labelId="ui-organizations.data.contactTypes.addressLine1"
              name={`${name}.addressLine1`}
              valueKey={valueKey}
              onSelect={(item) => {
                fields.remove(index);
                fields.insert(index, item);
              }}
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
            />
          </Col>
          <Col
            data-test-address-country
            xs={12}
            md={3}
          >
            <Field
              label={<FormattedMessage id="ui-organizations.data.contactTypes.country" />}
              name={`${name}.country`}
              component={Select}
              dataOptions={dropdownCountry}
              fullWidth
            />
          </Col>
          <Col
            data-test-address-language
            xs={12}
            md={3}
          >
            <FieldLanguage
              namePrefix={name}
              dropdownLanguages={dropdownLanguages}
            />
          </Col>
          <Col
            data-test-address-category
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
      addLabel={<FormattedMessage id="ui-organizations.contactInfo.actions.addAddress" />}
      component={RepeatableField}
      id="addresses"
      legend={<FormattedMessage id="ui-organizations.data.contactTypes.address" />}
      name="addresses"
      onAdd={createAddNewItem(defaultLanguage)}
      renderField={Address}
    />
  );
};

AddressInfo.propTypes = {
  defaultLanguage: PropTypes.string,
  dispatchChange: PropTypes.func.isRequired,
  dropdownCountry: PropTypes.arrayOf(PropTypes.object),
  dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default AddressInfo;
