import { get } from 'lodash';

export const getResourceDataList = (resources, resName, defaultValue = []) => {
  return (!get(resources, `${resName}.failed`) && get(resources, `${resName}.records`)) || defaultValue;
};

export const getResourceDataItem = (resources, resName, defaultValue = {}) => {
  const list = getResourceDataList(resources, resName);

  return get(list, '0') || defaultValue;
};
