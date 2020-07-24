import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { FieldMultiSelection } from '@folio/stripes-acq-components';

function CategoryDropdown({ dropdownVendorCategories, name, withLabel, ariaLabelledBy }) {
  const fieldName = name ? `${name}.categories` : 'categories';
  const toString = useCallback((option) => (
    option ? `${fieldName}-${option}` : option
  ), [fieldName]);
  const formatter = useCallback(({ option }) => {
    const item = find(dropdownVendorCategories, { id: option }) || option;

    if (!item) return option;

    return <div key={item.id}>{item.value}</div>;
  }, [dropdownVendorCategories]);

  const filterItems = useCallback((filterText, list) => {
    const filterRegExp = new RegExp(`^${filterText}`, 'i');
    const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;

    return { renderedItems };
  }, []);

  const dataOptions = useMemo(() => {
    if (!dropdownVendorCategories) return [];

    return dropdownVendorCategories.map(item => item.id) || [];
  }, [dropdownVendorCategories]);

  return (
    <FieldMultiSelection
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
