import {
  validateRequired,
  validateURL,
} from '@folio/stripes-acq-components';

const isURLValid = (value) => {
  const validateRequiredMessage = validateRequired(value);

  if (validateRequiredMessage) return validateRequiredMessage;

  return validateURL(value);
};

export { isURLValid };
