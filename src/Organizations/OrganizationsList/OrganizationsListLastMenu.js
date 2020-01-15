import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  PaneMenu,
  Button,
} from '@folio/stripes/components';
import { IfPermission } from '@folio/stripes/core';

const OrganizationsListLastMenu = () => {
  return (
    <IfPermission perm="ui-organizations.create">
      <PaneMenu>
        <FormattedMessage id="stripes-smart-components.addNew">
          {ariaLabel => (
            <Button
              id="clickable-neworganization"
              aria-label={ariaLabel}
              to="/organizations/create"
              buttonStyle="primary"
              marginBottom0
            >
              <FormattedMessage id="stripes-smart-components.new" />
            </Button>
          )}
        </FormattedMessage>
      </PaneMenu>
    </IfPermission>
  );
};

export default OrganizationsListLastMenu;
