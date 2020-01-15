import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { OrganizationAccount } from './OrganizationAccount';

const OrganizationAccounts = ({ accounts }) => {
  if (!accounts.length) {
    return (
      <p>
        <FormattedMessage id="ui-organizations.accounts.noAccountsAvail" />
      </p>
    );
  }

  return (
    <div>
      {
        accounts.map((account, idx) => (
          <OrganizationAccount
            key={idx}
            name={account.name}
            accountNo={account.accountNo}
            description={account.description}
            appSystemNo={account.appSystemNo}
            paymentMethod={account.paymentMethod}
            contactInfo={account.contactInfo}
            libraryCode={account.libraryCode}
            libraryEdiCode={account.libraryEdiCode}
            notes={account.notes}
          />
        ))
      }
    </div>
  );
};

OrganizationAccounts.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
};

OrganizationAccounts.defaultProps = {
  accounts: [],
};

export default OrganizationAccounts;
