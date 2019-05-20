import _ from 'lodash';
import languages from './Languages';

const languageLookUp = (langVal) => {
  const newLang = languages.slice(1);
  const getLanguage = _.find(newLang, { 'value': langVal });

  if (_.isEmpty(getLanguage)) return null;

  return getLanguage.label;
};

export default languageLookUp;
