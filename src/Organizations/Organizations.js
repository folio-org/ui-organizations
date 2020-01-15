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
        path="/organizations/create"
        component={OrganizationCreate}
      />

      <Route
        path="/organizations/:id/edit"
        component={OrganizationEdit}
      />

      <Route
        path="/organizations"
        component={OrganizationsListContainer}
      />
    </Switch>
  );
};

export default Organizations;
