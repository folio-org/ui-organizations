import { get } from 'lodash';

export const EMPTY_DROPDOWN_ITEM = { label: '', value: '' };

export const getDropDownItems = (resource, propName, isRequired) => {
  const items = get(resource, `dropdown.${propName}`, []);

  return isRequired
    ? items
    : [EMPTY_DROPDOWN_ITEM, ...items];
};
