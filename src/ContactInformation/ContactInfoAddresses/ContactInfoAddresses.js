import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { EntitiesWithCollapsing } from '../../common/components';
import ContactPersonSection from '../../ContactPeople/ContactPerson/ContactPersonSection';
import ContactInfoAddress from './ContactInfoAddress';

const renderAddress = address => <ContactInfoAddress address={address} />;

const ContactInfoAddresses = ({ addresses, withCollapsing }) => {
  if (!addresses.length) return null;

  const renderHeader = () => (
    <FormattedMessage id="ui-organizations.contactPeople.addresses" />
  );

  const renderBody = () => (
    withCollapsing ? (
      <EntitiesWithCollapsing
        renderEntity={renderAddress}
        entities={addresses}
        showMoreLabel={<FormattedMessage id="ui-organizations.contactPeople.showMoreAddresses" />}
      />
    ) : addresses.map(renderAddress)
  );

  return (
    <ContactPersonSection
      renderHeader={renderHeader}
      renderBody={renderBody}
    />
  );
};

ContactInfoAddresses.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object),
  withCollapsing: PropTypes.bool,
};

ContactInfoAddresses.defaultProps = {
  addresses: [],
  withCollapsing: true,
};

export default ContactInfoAddresses;
