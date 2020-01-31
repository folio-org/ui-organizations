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
  dispatchChange,
  vendorCategories,
}) => {
  return (
    <Row>
      <Col xs={12}>
        <AddressInfo
          defaultLanguage={defaultLanguage}
          dispatchChange={dispatchChange}
          dropdownVendorCategories={vendorCategories}
        />
      </Col>
      <Col xs={12}>
        <PhoneNumbers
          defaultLanguage={defaultLanguage}
          dispatchChange={dispatchChange}
          dropdownVendorCategories={vendorCategories}
          dropdownPhoneType={phoneTypesList}
        />
      </Col>
      <Col xs={12}>
        <EmailAddresses
          defaultLanguage={defaultLanguage}
          dispatchChange={dispatchChange}
          dropdownVendorCategories={vendorCategories}
        />
      </Col>
      <Col xs={12}>
        <Urls
          defaultLanguage={defaultLanguage}
          dispatchChange={dispatchChange}
          dropdownVendorCategories={vendorCategories}
        />
      </Col>
    </Row>
  );
};

OrganizationContactInfoForm.propTypes = {
  defaultLanguage: PropTypes.string,
  dispatchChange: PropTypes.func,
  vendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default OrganizationContactInfoForm;
