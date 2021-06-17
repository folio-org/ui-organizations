import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { OptionSegment } from '@folio/stripes/components';
import { FieldMultiSelectionFinal } from '@folio/stripes-acq-components';

import { filterCategories } from './utils';

function CategoryDropdown({ dropdownVendorCategories, name, withLabel, ariaLabelledBy }) {
  const fieldName = name ? `${name}.categories` : 'categories';
  const toString = useCallback((option) => (
    option ? `${fieldName}-${option}` : option
  ), [fieldName]);
  const formatter = useCallback(({ option, searchTerm }) => {
    const item = find(dropdownVendorCategories, { id: option }) || option;

    if (!item) return option;

    return <OptionSegment searchTerm={searchTerm}>{item.value}</OptionSegment>;
  }, [dropdownVendorCategories]);

  const filterItems = useCallback((filterText, list) => {
    return filterCategories({
      filterText,
      list,
      categories: dropdownVendorCategories,
    });
  }, [dropdownVendorCategories]);

  const dataOptions = useMemo(() => {
    if (!dropdownVendorCategories) return [];

    return dropdownVendorCategories.map(item => item.id) || [];
  }, [dropdownVendorCategories]);

  return (
    <FieldMultiSelectionFinal
      label={withLabel ? <FormattedMessage id="ui-organizations.data.contactTypes.categories" /> : undefined}
      ariaLabelledBy={ariaLabelledBy}
      name={fieldName}
      dataOptions={dataOptions}
      itemToString={toString}
      formatter={formatter}
      filter={filterItems}
    />
  );
}

CategoryDropdown.propTypes = {
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  withLabel: PropTypes.bool,
  ariaLabelledBy: PropTypes.string,
};

CategoryDropdown.defaultProps = {
  withLabel: true,
};

export default CategoryDropdown;
