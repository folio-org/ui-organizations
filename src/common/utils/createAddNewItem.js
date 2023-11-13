export function createAddNewItem(defaultLanguage, initialData = {}) {
  return fields => {
    const newItem = { ...initialData };

    if (defaultLanguage) newItem.language = defaultLanguage;
    if (fields.length === 0) newItem.isPrimary = true;

    fields.push(newItem);
  };
}
