import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { FormattedMessage, useIntl } from 'react-intl';

import { OptionSegment } from '@folio/stripes/components';
import { FieldMultiSelectionFinal } from '@folio/stripes-acq-components';

import { VENDOR_DEFAULT_CATEGORIES } from '../common/constants';

function CategoryDropdown({ dropdownVendorCategories, name, withLabel, ariaLabelledBy }) {
  const intl = useIntl();
  const fieldName = name ? `${name}.categories` : 'categories';
  const toString = useCallback((option) => (
    option ? `${fieldName}-${option}` : option
  ), [fieldName]);
  const formatter = useCallback(({ option, searchTerm }) => {
    const item = find(dropdownVendorCategories, { id: option }) || option;

    if (!item) return option;

    const translationKey = VENDOR_DEFAULT_CATEGORIES[item.value];

    return (
      <OptionSegment searchTerm={searchTerm}>
        {translationKey
          ? intl.formatMessage({
            id: `ui-organizations.contactInfo.vendorCategory.${translationKey}`,
            defaultMessage: item.value,
          })
          : item.value
        }
      </OptionSegment>
    );
  }, [dropdownVendorCategories, intl]);

  const filterItems = useCallback((filterText, list) => {
    const filterRegExp = new RegExp(`^${filterText}`, 'i');

    const matchedCats = dropdownVendorCategories?.filter(({ value }) => {
      const translationKey = VENDOR_DEFAULT_CATEGORIES[value];
      const categoryValue = translationKey
        ? intl.formatMessage({
          id: `ui-organizations.contactInfo.vendorCategory.${translationKey}`,
          defaultMessage: value,
        })
        : value;

      return categoryValue.search(filterRegExp) !== -1;
    });

    const matchedCatsExact = matchedCats?.filter(({ value }) => {
      const translationKey = VENDOR_DEFAULT_CATEGORIES[value];
      const categoryValue = translationKey
        ? intl.formatMessage({
          id: `ui-organizations.contactInfo.vendorCategory.${translationKey}`,
          defaultMessage: value,
        })
        : value;

      return categoryValue === filterText;
    });
    const matchedCatIds = matchedCats.map(({ id }) => id);
    const renderedItems = filterText ? list.filter(catId => matchedCatIds.includes(catId)) : list;
    const exactMatch = filterText ? (matchedCatsExact?.length === 1) : false;

    return { renderedItems, exactMatch };
  }, [dropdownVendorCategories, intl]);

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
