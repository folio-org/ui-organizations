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
  TextField,
} from '@folio/stripes/components';
import { FieldAutoSuggest } from '@folio/stripes-acq-components';

import CategoryDropdown from '../../Utils/CategoryDropdown';

const AddressInfo = ({ dropdownCountry, dropdownLanguages, dropdownVendorCategories }) => {
  // eslint-disable-next-line react/prop-types
  const Address = (name, index, fields) => {
    const valueKey = 'addressLine1';
    const addresses = fields.getAll().filter((address, i) => address[valueKey] && i !== index);

    return (
      <Row>
        <Col xs={12} md={3}>
          <FieldAutoSuggest
            name={`${name}.addressLine1`}
            labelId="ui-organizations.data.contactTypes.addressLine1"
            items={addresses}
            valueKey={valueKey}
            onSelect={(item) => {
              fields.remove(index);
              fields.insert(index, item);
            }}
          />
        </Col>
        <Col xs={12} md={3}>
          <Field label={<FormattedMessage id="ui-organizations.data.contactTypes.addressLine2" />} name={`${name}.addressLine2`} id={`${name}.addressLine2`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label={<FormattedMessage id="ui-organizations.data.contactTypes.city" />} name={`${name}.city`} id={`${name}.city`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label={<FormattedMessage id="ui-organizations.data.contactTypes.stateProviceOrRegion" />} name={`${name}.stateRegion`} id={`${name}.stateRegion`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label={<FormattedMessage id="ui-organizations.data.contactTypes.zipOrPostalCode" />} name={`${name}.zipCode`} id={`${name}.zipCode`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field
            label={<FormattedMessage id="ui-organizations.data.contactTypes.country" />}
            name={`${name}.country`}
            component={Select}
            dataOptions={dropdownCountry}
            fullWidth
          />
        </Col>
        <Col xs={12} md={3}>
          <Field label={<FormattedMessage id="ui-organizations.data.contactTypes.language" />} name={`${name}.language`} id={`${name}.language`} component={Select} dataOptions={dropdownLanguages} fullWidth />
        </Col>
        <Col xs={12} md={3}>
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
      addLabel={<FormattedMessage id="ui-organizations.contactInfo.actions.addAddress" />}
      component={RepeatableField}
      legend={<FormattedMessage id="ui-organizations.data.contactTypes.address" />}
      name="addresses"
      renderField={Address}
    />
  );
};

AddressInfo.propTypes = {
  dropdownCountry: PropTypes.arrayOf(PropTypes.object),
  dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default AddressInfo;
