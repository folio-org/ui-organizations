import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import { AddressInfo } from '../../../common/components';
import phoneTypesList from '../../../Utils/PhoneTypes';

import {
  EmailAddresses,
  PhoneNumbers,
  Urls,
} from './ContactInfoFormGroup';

const OrganizationContactInfoForm = ({
  defaultLanguage,
  vendorCategories,
}) => {
  return (
    <Row data-testid="org-contacts-info-form">
      <Col xs={12}>
        <AddressInfo
          defaultLanguage={defaultLanguage}
          dropdownVendorCategories={vendorCategories}
        />
      </Col>
      <Col xs={12}>
        <PhoneNumbers
          defaultLanguage={defaultLanguage}
          dropdownVendorCategories={vendorCategories}
          dropdownPhoneType={phoneTypesList}
        />
      </Col>
      <Col xs={12}>
        <EmailAddresses
          defaultLanguage={defaultLanguage}
          dropdownVendorCategories={vendorCategories}
        />
      </Col>
      <Col xs={12}>
        <Urls
          defaultLanguage={defaultLanguage}
          dropdownVendorCategories={vendorCategories}
        />
      </Col>
    </Row>
  );
};

OrganizationContactInfoForm.propTypes = {
  defaultLanguage: PropTypes.string,
  vendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default OrganizationContactInfoForm;
