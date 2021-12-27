import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import {
  CommandList,
  defaultKeyboardShortcuts,
  Paneset,
} from '@folio/stripes/components';

import { OrganizationIntegrationView } from './OrganizationIntegrationView';
import { OrganizationIntegrationCreate } from './OrganizationIntegrationCreate';
import { OrganizationIntegrationEdit } from './OrganizationIntegrationEdit';

export const OrganizationIntegration = () => {
  const { orgId } = useParams();
  const { url } = useRouteMatch();

  return (
    <CommandList commands={defaultKeyboardShortcuts}>
      <Paneset isRoot>
        <Switch>
          <Route
            path={`${url}/:id/view`}
            render={() => <OrganizationIntegrationView orgId={orgId} />}
          />
          <Route
            path={`${url}/:id/edit`}
            render={() => <OrganizationIntegrationEdit orgId={orgId} />}
          />
          <Route
            path={`${url}/create`}
            render={() => <OrganizationIntegrationCreate orgId={orgId} />}
          />
        </Switch>
      </Paneset>
    </CommandList>
  );
};
