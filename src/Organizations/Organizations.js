import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import { OrganizationsListContainer } from './OrganizationsList';
import { OrganizationCreate } from './OrganizationCreate';
import { OrganizationEdit } from './OrganizationEdit';

const Organizations = () => {
  return (
    <Switch>
      <Route
        path="/organizations/new_view/create"
        component={OrganizationCreate}
      />

      <Route
        path="/organizations/new_view/:id/edit"
        component={OrganizationEdit}
      />

      <Route
        path="/organizations/new_view"
        component={OrganizationsListContainer}
      />
    </Switch>
  );
};

export default Organizations;
