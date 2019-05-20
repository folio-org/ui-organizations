import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Icon } from '@folio/stripes/components';
import { AddressInfoView, PhoneNumbersView, EmailView, UrlsView } from './ContactInfoViewGroup';

class ContactInformationView extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape({
      dropdown: PropTypes.object.isRequired,
    }),
  };

  getVendorcategory() {
    const { parentResources } = this.props;
    const data = ((parentResources || {}).vendorCategory || {}).records || [];

    if (data.length === 0) return null;

    return data;
  }

  render() {
    const { initialValues } = this.props;

    if (!initialValues) {
      return (
        <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
      );
    }

    return (
      <div style={{ width: '100%' }}>
        <Row>
          <div style={{ width: '100%' }}>
            <AddressInfoView dataVal={initialValues.addresses} dropdownVendorCategories={this.getVendorcategory()} />
            <PhoneNumbersView
              dataVal={initialValues.phoneNumbers}
              dropdownVendorCategories={this.getVendorcategory()}
            />
            <EmailView dataVal={initialValues.emails} dropdownVendorCategories={this.getVendorcategory()} />
            <UrlsView dataVal={initialValues.urls} dropdownVendorCategories={this.getVendorcategory()} />
          </div>
        </Row>
      </div>
    );
  }
}

export default ContactInformationView;
