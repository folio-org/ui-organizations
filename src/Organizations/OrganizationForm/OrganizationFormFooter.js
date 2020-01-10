import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  PaneFooter,
} from '@folio/stripes/components';

const OrganizationFormFooter = ({ isSaveDisabled, saveOrganization, cancelForm }) => {
  const onCancel = useCallback(() => cancelForm(), [cancelForm]);

  const start = (
    <FormattedMessage id="ui-organizations.button.cancel">
      {(btnLabel) => (
        <Button
          id="clickable-close-orgazitation-dialog-footer"
          buttonStyle="default mega"
          onClick={onCancel}
        >
          {btnLabel}
        </Button>
      )}
    </FormattedMessage>
  );

  const end = (
    <Button
      id="organization-form-save"
      type="submit"
      buttonStyle="primary mega"
      disabled={isSaveDisabled}
      onClick={saveOrganization}
    >
      {<FormattedMessage id="ui-organizations.button.saveAndClose" />}
    </Button>
  );

  return (
    <PaneFooter
      renderStart={start}
      renderEnd={end}
    />
  );
};

OrganizationFormFooter.propTypes = {
  isSaveDisabled: PropTypes.bool,
  saveOrganization: PropTypes.func.isRequired,
  cancelForm: PropTypes.func.isRequired,
};

export default OrganizationFormFooter;
