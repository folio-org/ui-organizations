import { isEmpty, isNil } from 'lodash';

const CatIDToLabel = (data, catItems) => {
  if (isEmpty(data) || isNil(catItems)) return data;
  const arr = [];

  data.map((item) => {
    if (!isNil(item) && (typeof item === 'string')) {
      for (const key in catItems) {
        if (item === catItems[key].id) return arr.push(catItems[key].value);
      }

      return item;
    }

    return false;
  });

  return arr.join(', ');
};

export default CatIDToLabel;
