// eslint-disable-next-line import/prefer-default-export
export function createAddNewItem(defaultLanguage) {
  return fields => {
    const newItem = {};

    if (defaultLanguage) newItem.language = defaultLanguage;
    if (fields.length === 0) newItem.isPrimary = true;

    fields.push(newItem);
  };
}
