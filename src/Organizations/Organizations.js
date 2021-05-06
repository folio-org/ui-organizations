import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import {
  checkScope,
  CommandList,
  defaultKeyboardShortcuts,
  HasCommand,
} from '@folio/stripes/components';

import {
  NOTES_ROUTE,
  ORGANIZATIONS_ROUTE,
} from '../common/constants';
import { Notes } from './Notes';
import { OrganizationsListContainer } from './OrganizationsList';
import { OrganizationCreate } from './OrganizationCreate';
import { OrganizationEdit } from './OrganizationEdit';

const Organizations = () => {
  const focusSearchField = () => {
    const el = document.getElementById('input-record-search');

    if (el) {
      el.focus();
    }
  };

  const shortcuts = [
    {
      name: 'search',
      handler: focusSearchField,
    },
  ];

  return (
    <CommandList commands={defaultKeyboardShortcuts}>
      <HasCommand
        commands={shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      >
        <Switch>
          <Route
            path={NOTES_ROUTE}
            component={Notes}
          />

          <Route
            path="/organizations/create"
            component={OrganizationCreate}
          />

          <Route
            path="/organizations/:id/edit"
            component={OrganizationEdit}
          />

          <Route
            path={ORGANIZATIONS_ROUTE}
            component={OrganizationsListContainer}
          />
        </Switch>
      </HasCommand>
    </CommandList>
  );
};

export default Organizations;
