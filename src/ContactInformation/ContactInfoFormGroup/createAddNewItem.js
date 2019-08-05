function createAddNewItem(defaultLanguage) {
  return fields => {
    const newItem = defaultLanguage
      ? { language: defaultLanguage }
      : {};

    fields.push(newItem);
  };
}

export default createAddNewItem;
