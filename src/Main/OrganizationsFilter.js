import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { AccordionSet } from '@folio/stripes/components';
import { AcqCheckboxFilter } from '@folio/stripes-acq-components';

import COUNTRY_OPTIONS from '../Utils/Country';
import LANGUAGE_OPTIONS from '../Utils/Languages';

import {
  FILTERS,
  DEFAULT_FILTERS,
  BOOLEAN_OPTIONS,
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
  PAYMENT_METHOD_OPTIONS_FOR_FILTER,
} from './constants';

const OrganizationsFilter = ({ activeFilters, onChange }) => {
  useEffect(() => {
    DEFAULT_FILTERS.forEach(onChange);
  }, [onChange]);

  return (
    <AccordionSet>
      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.STATUS]}
        labelId="ui-organizations.filterConfig.vendorStatus"
        name={FILTERS.STATUS}
        onChange={onChange}
        options={STATUS_OPTIONS}
        closedByDefault={false}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.ADDRESS_CATEGORY]}
        labelId="ui-organizations.filterConfig.addressCategory"
        name={FILTERS.ADDRESS_CATEGORY}
        onChange={onChange}
        options={CATEGORY_OPTIONS}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.CONTACT_CATEGORY]}
        labelId="ui-organizations.filterConfig.contactPeopleCategory"
        name={FILTERS.CONTACT_CATEGORY}
        onChange={onChange}
        options={CATEGORY_OPTIONS}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.ADDRESS_COUNTRY]}
        labelId="ui-organizations.filterConfig.country"
        name={FILTERS.ADDRESS_COUNTRY}
        onChange={onChange}
        options={COUNTRY_OPTIONS}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.LANGUAGE]}
        labelId="ui-organizations.filterConfig.languages"
        name={FILTERS.LANGUAGE}
        onChange={onChange}
        options={LANGUAGE_OPTIONS}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.PAYMENT_METHOD]}
        labelId="ui-organizations.filterConfig.paymentMethod"
        name={FILTERS.PAYMENT_METHOD}
        onChange={onChange}
        options={PAYMENT_METHOD_OPTIONS_FOR_FILTER}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.STATS_AVAILABLE]}
        labelId="ui-organizations.filterConfig.statsAvailable"
        name={FILTERS.STATS_AVAILABLE}
        onChange={onChange}
        options={BOOLEAN_OPTIONS}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.IS_VENDOR]}
        labelId="ui-organizations.filterConfig.isVendor"
        name={FILTERS.IS_VENDOR}
        onChange={onChange}
        options={BOOLEAN_OPTIONS}
      />
    </AccordionSet>
  );
};

OrganizationsFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  activeFilters: PropTypes.object.isRequired,
};

export default OrganizationsFilter;
