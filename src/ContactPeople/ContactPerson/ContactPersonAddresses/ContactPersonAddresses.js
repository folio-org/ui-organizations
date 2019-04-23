import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { EntitiesWithCollapsing } from '../../../common/components';
import ContactPersonSection from '../ContactPersonSection';
import ContactPersonAddress from './ContactPersonAddress';

const renderAddress = address => <ContactPersonAddress address={address} />;

const ContactPersonAddresses = ({ addresses }) => {
  if (!addresses.length) return null;

  const renderHeader = () => (
    <FormattedMessage id="ui-organizations.contactPeople.addresses" />
  );

  const renderBody = () => (
    <EntitiesWithCollapsing
      renderEntity={renderAddress}
      entities={addresses}
      showMoreLabel={<FormattedMessage id="ui-organizations.contactPeople.showMoreAddresses" />}
    />
  );

  return (
    <ContactPersonSection
      renderHeader={renderHeader}
      renderBody={renderBody}
    />
  );
};

ContactPersonAddresses.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object),
};

ContactPersonAddresses.defaultProps = {
  addresses: [],
};

export default ContactPersonAddresses;
