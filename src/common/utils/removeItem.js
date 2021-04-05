export function removeItem(fields, idx) {
  const fieldToRemove = fields.value[idx];

  if (fieldToRemove.isPrimary && fields.length === 2) {
    const idxToUpdate = idx ? 0 : 1;

    fields.update(idxToUpdate, { ...fields.value[idxToUpdate], isPrimary: true });
  }

  fields.remove(idx);
}
