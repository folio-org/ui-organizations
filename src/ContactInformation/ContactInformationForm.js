import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import { AddressInfo } from '../common/components';
import languageList from '../Utils/Languages';
import phoneTypesList from '../Utils/PhoneTypes';

import {
  EmailAddresses,
  PhoneNumbers,
  Urls,
} from './ContactInfoFormGroup';

const ContactInformationForm = ({
  defaultLanguage,
  dispatchChange,
  dropdownVendorCategories,
}) => {
  return (
    <Row>
      <Col xs={12}>
        <AddressInfo
          defaultLanguage={defaultLanguage}
          dispatchChange={dispatchChange}
          dropdownLanguages={languageList}
          dropdownVendorCategories={dropdownVendorCategories}
        />
      </Col>
      <Col xs={12}>
        <PhoneNumbers
          defaultLanguage={defaultLanguage}
          dispatchChange={dispatchChange}
          dropdownLanguages={languageList}
          dropdownVendorCategories={dropdownVendorCategories}
          dropdownPhoneType={phoneTypesList}
        />
      </Col>
      <Col xs={12}>
        <EmailAddresses
          defaultLanguage={defaultLanguage}
          dispatchChange={dispatchChange}
          dropdownLanguages={languageList}
          dropdownVendorCategories={dropdownVendorCategories}
        />
      </Col>
      <Col xs={12}>
        <Urls
          defaultLanguage={defaultLanguage}
          dispatchChange={dispatchChange}
          dropdownLanguages={languageList}
          dropdownVendorCategories={dropdownVendorCategories}
        />
      </Col>
    </Row>
  );
};

ContactInformationForm.propTypes = {
  defaultLanguage: PropTypes.string,
  dispatchChange: PropTypes.func,
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default ContactInformationForm;
