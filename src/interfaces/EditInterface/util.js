import { INTERFACE_TYPES } from '../../common/constants';

export const getSelectOptions = (arrayOfStringValues) => arrayOfStringValues.map(type => ({
  value: type,
  label: type,
}));

export const INTERFACE_OPTIONS = getSelectOptions(INTERFACE_TYPES);
