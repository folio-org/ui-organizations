import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { MultiSelection } from '@folio/stripes/components';

const toString = (option) => option;

function CategoryDropdown({ dropdownVendorCategories, name }) {
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
    <Field
      component={MultiSelection}
      label={<FormattedMessage id="ui-organizations.data.contactTypes.categories" />}
      name={name ? `${name}.categories` : 'categories'}
      style={{ height: '80px' }}
      onBlur={(e) => { e.preventDefault(); }}
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
};

export default CategoryDropdown;
