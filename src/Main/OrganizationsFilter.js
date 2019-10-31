import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { AccordionSet } from '@folio/stripes/components';
import {
  AcqCheckboxFilter,
  AcqTagsFilter,
  CountryFilter,
  LanguageFilter,
  PAYMENT_METHOD_OPTIONS,
} from '@folio/stripes-acq-components';

import {
  FILTERS,
  DEFAULT_FILTERS,
  BOOLEAN_OPTIONS,
  STATUS_OPTIONS,
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

      <AcqTagsFilter
        activeFilters={activeFilters[FILTERS.TAGS]}
        id={FILTERS.TAGS}
        name={FILTERS.TAGS}
        onChange={onChange}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.IS_VENDOR]}
        labelId="ui-organizations.filterConfig.isVendor"
        name={FILTERS.IS_VENDOR}
        onChange={onChange}
        options={BOOLEAN_OPTIONS}
      />

      <CountryFilter
        activeFilters={activeFilters[FILTERS.ADDRESS_COUNTRY]}
        labelId="ui-organizations.filterConfig.country"
        name={FILTERS.ADDRESS_COUNTRY}
        onChange={onChange}
      />

      <LanguageFilter
        activeFilters={activeFilters[FILTERS.LANGUAGE]}
        labelId="ui-organizations.filterConfig.languages"
        name={FILTERS.LANGUAGE}
        onChange={onChange}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.PAYMENT_METHOD]}
        labelId="ui-organizations.filterConfig.paymentMethod"
        name={FILTERS.PAYMENT_METHOD}
        onChange={onChange}
        options={PAYMENT_METHOD_OPTIONS}
      />

      {/* UIORG-91 - Add the Stats filter to the Organization filters */}
      {/* <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.STATS_AVAILABLE]}
        labelId="ui-organizations.filterConfig.statsAvailable"
        name={FILTERS.STATS_AVAILABLE}
        onChange={onChange}
        options={BOOLEAN_OPTIONS}
      /> */}

    </AccordionSet>
  );
};

OrganizationsFilter.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OrganizationsFilter;
