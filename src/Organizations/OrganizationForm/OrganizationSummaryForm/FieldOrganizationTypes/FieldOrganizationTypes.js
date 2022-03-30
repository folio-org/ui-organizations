import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  find,
  map,
} from 'lodash';

import { FieldMultiSelectionFinal } from '@folio/stripes-acq-components';

export const FieldOrganizationTypes = ({ organizationTypes, mutators }) => {
  const formatter = ({ option }) => {
    const item = find(organizationTypes, { id: option }) || option;

    if (!item) return option;

    return item.name;
  };

  const itemToString = item => item;

  const typeOptions = map(organizationTypes, 'id');

  const filter = (filterText, list) => {
    const renderedItems = filterText
      ? organizationTypes
        .filter(group => group.name.toLowerCase().includes(filterText.toLowerCase()))
        .map(({ id }) => id)
      : list;

    return { renderedItems };
  };

  const getSelectedTypes = (e) => {
    mutators.setType({}, e);
  };

  return (
    <FieldMultiSelectionFinal
      ariaLabelledBy="organizationFormTypesLabel"
      dataOptions={typeOptions}
      filter={filter}
      formatter={formatter}
      id="organizations-type"
      itemToString={itemToString}
      label={<FormattedMessage id="ui-organizations.summary.type" />}
      name="organizationTypes"
      onChange={getSelectedTypes}
    />
  );
};

FieldOrganizationTypes.propTypes = {
  organizationTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  mutators: PropTypes.shape({
    setType: PropTypes.func,
  }),
};
