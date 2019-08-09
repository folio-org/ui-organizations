import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { EntitiesWithCollapsing } from '../../../common/components';
import ContactPersonSection from '../ContactPersonSection';
import ContactPersonAddress from './ContactPersonAddress';

const renderAddressFn = (address, i) => <ContactPersonAddress address={address} key={i} />;

const ContactPersonAddresses = ({ addresses, withCollapsing, renderAddress }) => {
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

ContactPersonAddresses.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object),
  withCollapsing: PropTypes.bool,
  renderAddress: PropTypes.func,
};

ContactPersonAddresses.defaultProps = {
  addresses: [],
  withCollapsing: true,
  renderAddress: renderAddressFn,
};

export default ContactPersonAddresses;
