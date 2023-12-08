import isEqual from 'lodash/isEqual';
import keyBy from 'lodash/keyBy';

/**
 * Detects added, modified and deleted items in an array.
 * The function assumes that each element of the array is an object structure.
*/
export const getArrayItemsChanges = (initialValues = [], values = []) => {
  const initialValuesMap = keyBy(initialValues, 'id');
  const valuesMap = keyBy(values, 'id');

  const { created, updated } = values.reduce((acc, item) => {
    const initItem = initialValuesMap[item.id];

    if (!initItem) {
      acc.created.push(item);
    } else if (!isEqual(initItem, item)) {
      acc.updated.push(item);
    }

    return acc;
  }, { created: [], updated: [] });

  const deleted = initialValues.reduce((acc, initItem) => {
    const item = valuesMap[initItem.id];

    if (!item) {
      acc.push(initItem);
    }

    return acc;
  }, []);

  return {
    created,
    updated,
    deleted,
  };
};
