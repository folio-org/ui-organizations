import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import { OrganizationsListContainer } from './OrganizationsList';

const Organizations = () => {
  return (
    <Switch>
      <Route component={OrganizationsListContainer} />
    </Switch>
  );
};

export default Organizations;
