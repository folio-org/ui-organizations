import find from 'lodash/find';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { OptionSegment } from '@folio/stripes/components';
import { FieldMultiSelectionFinal } from '@folio/stripes-acq-components';

import { filterCategories } from './utils';

function CategoryDropdown({
  dropdownVendorCategories,
  name,
  withLabel,
  ariaLabelledBy,
  onChange: onChangeProp,
}) {
  const { change } = useForm();

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

  const onChange = useCallback((value) => {
    change(fieldName, value);

    if (onChangeProp) onChangeProp(value);
  }, [onChangeProp]);

  return (
    <FieldMultiSelectionFinal
      label={withLabel ? <FormattedMessage id="ui-organizations.data.contactTypes.categories" /> : undefined}
      ariaLabelledBy={ariaLabelledBy}
      name={fieldName}
      dataOptions={dataOptions}
      itemToString={toString}
      formatter={formatter}
      filter={filterItems}
      onChange={onChange}
    />
  );
}

CategoryDropdown.propTypes = {
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  withLabel: PropTypes.bool,
  ariaLabelledBy: PropTypes.string,
  onChange: PropTypes.func,
};

CategoryDropdown.defaultProps = {
  withLabel: true,
};

export default CategoryDropdown;
