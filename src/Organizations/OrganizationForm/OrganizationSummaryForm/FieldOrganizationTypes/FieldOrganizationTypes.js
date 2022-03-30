import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-final-form';
import PropTypes from 'prop-types';

import { FieldMultiSelectionFinal } from '@folio/stripes-acq-components';

export const FieldOrganizationTypes = ({ organizationTypes }) => {
  const { change } = useForm();

  const formatter = ({ option }) => {
    const item = organizationTypes.find(e => e.id === option);

    if (!item) return option;

    return item.name;
  };

  const itemToString = item => item;

  const typeOptions = organizationTypes.map(({ id }) => id);

  const filter = (filterText, list) => {
    const renderedItems = filterText
      ? organizationTypes
        .filter(group => group.name.toLowerCase().includes(filterText.toLowerCase()))
        .map(({ id }) => id)
      : list;

    return { renderedItems };
  };

  const onChangeTypes = useCallback((types) => {
    change('organizationTypes', types);
  }, [change]);

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
      onChange={onChangeTypes}
    />
  );
};

FieldOrganizationTypes.propTypes = {
  organizationTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
