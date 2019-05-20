import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { MultiSelection } from '@folio/stripes/components';

class CategoryDropdown extends Component {
  static propTypes = {
    dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
  };

  // Multi Select
  toString = (option) => option;
  formatter = ({ option }) => {
    const { dropdownVendorCategories } = this.props;
    const item = find(dropdownVendorCategories, { id: option }) || option;

    if (!item) return option;

    return <div key={item.id}>{item.value}</div>;
  };

  filterItems = (filterText, list) => {
    const filterRegExp = new RegExp(`^${filterText}`, 'i');
    const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;

    return { renderedItems };
  };

  dataOptions() {
    const { dropdownVendorCategories } = this.props;

    if (!dropdownVendorCategories) return [];

    return dropdownVendorCategories.map(item => item.id) || [];
  }
  // End Multi Select

  render() {
    const { name } = this.props;

    return (
      <Field
        component={MultiSelection}
        label={<FormattedMessage id="ui-organizations.data.contactTypes.categories" />}
        name={`${name}.categories`}
        style={{ height: '80px' }}
        onBlur={(e) => { e.preventDefault(); }}
        dataOptions={this.dataOptions()}
        itemToString={this.toString}
        formatter={this.formatter}
        filter={this.filterItems}
      />
    );
  }
}

export default CategoryDropdown;
