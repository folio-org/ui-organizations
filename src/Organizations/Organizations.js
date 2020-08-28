import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import {
  NOTES_ROUTE,
  ORGANIZATIONS_ROUTE,
} from '../common/constants';
import { Notes } from './Notes';
import { OrganizationsListContainer } from './OrganizationsList';
import { OrganizationCreate } from './OrganizationCreate';
import { OrganizationEdit } from './OrganizationEdit';

const Organizations = () => {
  return (
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
  );
};

export default Organizations;
