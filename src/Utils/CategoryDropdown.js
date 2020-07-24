import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { FieldMultiSelection } from '@folio/stripes-acq-components';

function CategoryDropdown({ dropdownVendorCategories, name, withLabel, ariaLabelledBy, id }) {
  const toString = useCallback((option) => (
    option ? `${id}-${option}` : null
  ), [id]);
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
      name={name ? `${name}.categories` : 'categories'}
      dataOptions={dataOptions}
      itemToString={toString}
      formatter={formatter}
      filter={filterItems}
      id={id}
    />
  );
}

CategoryDropdown.propTypes = {
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  withLabel: PropTypes.bool,
  ariaLabelledBy: PropTypes.string,
  id: PropTypes.string.isRequired,
};

CategoryDropdown.defaultProps = {
  withLabel: true,
};

export default CategoryDropdown;
