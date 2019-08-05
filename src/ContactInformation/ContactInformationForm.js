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
  defaultLanguage,
  dropdownCountry,
  dropdownLanguages,
  dropdownPhoneType,
  dropdownVendorCategories,
}) => {
  return (
    <Row>
      <Col xs={12}>
        <AddressInfo
          defaultLanguage={defaultLanguage}
          dropdownCountry={dropdownCountry}
          dropdownLanguages={dropdownLanguages}
          dropdownVendorCategories={dropdownVendorCategories}
        />
      </Col>
      <Col xs={12}>
        <PhoneNumbers
          defaultLanguage={defaultLanguage}
          dropdownLanguages={dropdownLanguages}
          dropdownVendorCategories={dropdownVendorCategories}
          dropdownPhoneType={dropdownPhoneType}
        />
      </Col>
      <Col xs={12}>
        <EmailAddresses
          defaultLanguage={defaultLanguage}
          dropdownLanguages={dropdownLanguages}
          dropdownVendorCategories={dropdownVendorCategories}
        />
      </Col>
      <Col xs={12}>
        <Urls
          defaultLanguage={defaultLanguage}
          dropdownLanguages={dropdownLanguages}
          dropdownVendorCategories={dropdownVendorCategories}
        />
      </Col>
    </Row>
  );
};

ContactInformationForm.propTypes = {
  defaultLanguage: PropTypes.string,
  dropdownCountry: PropTypes.arrayOf(PropTypes.object),
  dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
  dropdownPhoneType: PropTypes.arrayOf(PropTypes.object),
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default ContactInformationForm;
