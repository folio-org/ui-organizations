import React from 'react';
import PropTypes from 'prop-types';

import ContactAddress from './ContactAddress';

const ContactAddresses = ({ addresses }) => (
  addresses.map((address, i) => (
    <ContactAddress address={address} key={i} />
  ))
);

ContactAddresses.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object),
};

ContactAddresses.defaultProps = {
  addresses: [],
};

export default ContactAddresses;
