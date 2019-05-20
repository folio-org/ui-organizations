import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Accordion } from '@folio/stripes/components';

import { SECTIONS } from '../common/constants';
import { AgreementsView } from '../Agreements';
import { VendorInformationView } from '../VendorInformation';
import { EdiInformationView } from '../EdiInformation';
import { AccountsView } from '../Accounts';

const ViewVendorBlocks = ({ organization, parentResources }) => (
  <React.Fragment>
    <Accordion
      label={<FormattedMessage id="ui-organizations.vendorInformation" />}
      id={SECTIONS.vendorInformationSection}
    >
      <VendorInformationView organization={organization} />
    </Accordion>
    <Accordion
      label={<FormattedMessage id="ui-organizations.vendorTerms" />}
      id={SECTIONS.vendorTermsSection}
    >
      <AgreementsView agreements={organization.agreements} />
    </Accordion>
    <Accordion
      label={<FormattedMessage id="ui-organizations.ediInformation" />}
      id={SECTIONS.ediInformationSection}
    >
      <EdiInformationView
        organization={organization}
        parentResources={parentResources}
      />
    </Accordion>
    <Accordion
      label={<FormattedMessage id="ui-organizations.accounts" />}
      id={SECTIONS.accountsSection}
    >
      <AccountsView accounts={organization.accounts} />
    </Accordion>
  </React.Fragment>
);

ViewVendorBlocks.propTypes = {
  organization: PropTypes.object,
  parentResources: PropTypes.shape({
    dropdown: PropTypes.shape({
      paymentMethodDD: PropTypes.array.isRequired,
      ediCodeTypeDD: PropTypes.array.isRequired,
    }),
  }),
};

export default ViewVendorBlocks;
