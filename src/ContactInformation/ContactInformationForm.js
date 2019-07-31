import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import {
  AddressInfo,
  EmailAddresses,
  PhoneNumbers,
  Urls,
} from './ContactInfoFormGroup';

const ContactInformationForm = ({
  dropdownCountry,
  dropdownLanguages,
  dropdownPhoneType,
  dropdownVendorCategories,
}) => {
  return (
    <Row>
      <Col xs={12}>
        <AddressInfo
          dropdownCountry={dropdownCountry}
          dropdownLanguages={dropdownLanguages}
          dropdownVendorCategories={dropdownVendorCategories}
        />
      </Col>
      <Col xs={12}>
        <PhoneNumbers
          dropdownLanguages={dropdownLanguages}
          dropdownVendorCategories={dropdownVendorCategories}
          dropdownPhoneType={dropdownPhoneType}
        />
      </Col>
      <Col xs={12}>
        <EmailAddresses
          dropdownLanguages={dropdownLanguages}
          dropdownVendorCategories={dropdownVendorCategories}
        />
      </Col>
      <Col xs={12}>
        <Urls
          dropdownLanguages={dropdownLanguages}
          dropdownVendorCategories={dropdownVendorCategories}
        />
      </Col>
    </Row>
  );
};

ContactInformationForm.propTypes = {
  dropdownCountry: PropTypes.arrayOf(PropTypes.object),
  dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
  dropdownPhoneType: PropTypes.arrayOf(PropTypes.object),
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default ContactInformationForm;
