import React from 'react';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';
import { SubmissionError } from 'redux-form';

import { ERROR_CODE_GENERIC } from '@folio/stripes-acq-components';

const ERROR_CODE_DUP_CODE = '-1';

export const handleSaveErrorResponse = async (intl, showCallout, response) => {
  let errorCode = null;

  try {
    const responseJson = await response.json();

    errorCode = get(responseJson, 'errors.0.code', ERROR_CODE_GENERIC);
  } catch (e) {
    errorCode = ERROR_CODE_GENERIC;
  }

  const message = (
    <FormattedMessage
      id={`ui-organizations.save.error.${errorCode}`}
      defaultMessage={intl.formatMessage({ id: `ui-organizations.save.error.${ERROR_CODE_GENERIC}` })}
    />
  );

  showCallout({
    message,
    type: 'error',
  });

  if (errorCode === ERROR_CODE_DUP_CODE) {
    throw new SubmissionError({
      code: <FormattedMessage id={`ui-organizations.save.error.${ERROR_CODE_DUP_CODE}`} />,
    });
  }
};
