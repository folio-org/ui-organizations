import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory, useParams, useLocation } from 'react-router';

import { AppIcon } from '@folio/stripes/core';
import {
  AccordionSet,
  AccordionStatus,
  Button,
  checkScope,
  Col,
  collapseAllSections,
  ExpandAllButton,
  expandAllSections,
  HasCommand,
  Pane,
  Row,
  MenuSection,
  Icon,
  ConfirmationModal,
} from '@folio/stripes/components';

import {
  useShowCallout,
  LoadingPane,
  handleKeyCommand,
  useIntegrationConfigs,
  useModalToggle,
  useOrganization,
} from '@folio/stripes-acq-components';

import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import {
  useAcqMethods,
  useIntegrationConfig,
  useIntegrationConfigMutation,
} from '../../common/hooks';
import { buildAvailableAccounts } from '../utils';
import { IntegrationInfoView } from './IntegrationInfoView';
import { EdiView } from './EdiView';
import { FtpView } from './FtpView';
import { SchedulingView } from './SchedulingView';

const OrganizationIntegrationView = ({ orgId }) => {
  const history = useHistory();
  const location = useLocation();
  const accordionStatusRef = useRef();
  const { id } = useParams();
  const showCallout = useShowCallout();

  const [isRemoveConfirmation, toggleRemoveConfirmation] = useModalToggle();

  const { integrationConfig, isLoading } = useIntegrationConfig(id);
  const { organization, isLoading: isOrgLoading } = useOrganization(orgId);
  const { acqMethods, isLoading: isAcqMethodsLoading } = useAcqMethods();
  const { integrationConfigs, isLoading: isIntegrationsLoading } = useIntegrationConfigs({ organizationId: orgId });

  const onEdit = useCallback(
    () => {
      history.push({
        pathname: `/organizations/${orgId}/integration/${id}/edit`,
        search: location.search,
      });
    },
    [history, id, location.search, orgId],
  );

  const onClose = useCallback(
    () => {
      history.push({
        pathname: `/organizations/view/${orgId}`,
        search: location.search,
      });
    },
    [history, location.search, orgId],
  );

  const { mutateIntegrationConfig } = useIntegrationConfigMutation({
    method: 'delete',
    onSuccess: () => {
      showCallout({
        message: <FormattedMessage id="ui-organizations.integration.message.delete.success" />,
      });
      onClose();
    },
    onError: () => {
      showCallout({
        message: <FormattedMessage id="ui-organizations.integration.message.delete.error" />,
        type: 'error',
      });
    },
  });

  const onRemove = useCallback(
    () => mutateIntegrationConfig(integrationConfig),
    [integrationConfig, mutateIntegrationConfig],
  );

  // eslint-disable-next-line react/prop-types
  const renderActionMenu = ({ onToggle }) => (
    <MenuSection id="integration-actions">
      <Button
        buttonStyle="dropdownItem"
        data-testid="edit-integration-action"
        onClick={onEdit}
      >
        <Icon
          size="small"
          icon="edit"
        >
          <FormattedMessage id="ui-organizations.view.edit" />
        </Icon>
      </Button>

      <Button
        buttonStyle="dropdownItem"
        data-testid="remove-integration-action"
        onClick={() => {
          onToggle();
          toggleRemoveConfirmation();
        }}
      >
        <Icon
          size="small"
          icon="trash"
        >
          <FormattedMessage id="ui-organizations.view.delete" />
        </Icon>
      </Button>
    </MenuSection>
  );

  const shortcuts = [
    {
      name: 'search',
      handler: handleKeyCommand(() => history.push(ORGANIZATIONS_ROUTE)),
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
    {
      name: 'edit',
      handler: handleKeyCommand(onEdit),
    },
  ];

  if (isLoading || isOrgLoading || isIntegrationsLoading || isAcqMethodsLoading) {
    return (
      <LoadingPane
        id="integration-view-loading"
        data-testid="integration-view-loading"
        onClose={onClose}
      />
    );
  }

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Pane
        appIcon={
          <AppIcon
            app="organizations"
            appIconKey="organizations"
          />
        }
        actionMenu={renderActionMenu}
        defaultWidth="fill"
        dismissible
        id="integration-view"
        onClose={onClose}
        paneTitle={integrationConfig.exportTypeSpecificParameters?.vendorEdiOrdersExportConfig?.configName}
      >
        <Row>
          <Col
            xs={12}
            md={8}
            mdOffset={2}
          >
            <AccordionStatus ref={accordionStatusRef}>
              <Row end="xs">
                <Col xs={12}>
                  <ExpandAllButton />
                </Col>
              </Row>
              <AccordionSet>
                <IntegrationInfoView
                  integrationConfig={integrationConfig
                    ?.exportTypeSpecificParameters
                    ?.vendorEdiOrdersExportConfig
                  }
                />
                <EdiView
                  vendorEdiOrdersExportConfig={integrationConfig
                    ?.exportTypeSpecificParameters
                    ?.vendorEdiOrdersExportConfig
                  }
                  acqMethods={acqMethods}
                  accounts={buildAvailableAccounts(organization, integrationConfigs, integrationConfig)}
                />

                <FtpView ediFtp={integrationConfig
                  ?.exportTypeSpecificParameters
                  ?.vendorEdiOrdersExportConfig
                  ?.ediFtp}
                />

                <SchedulingView ediSchedule={integrationConfig
                  ?.exportTypeSpecificParameters
                  ?.vendorEdiOrdersExportConfig
                  ?.ediSchedule}
                />
              </AccordionSet>
            </AccordionStatus>
          </Col>
        </Row>

        {isRemoveConfirmation && (
          <ConfirmationModal
            id="integration-remove-confirmation"
            confirmLabel={<FormattedMessage id="ui-organizations.integration.confirmation.confirm" />}
            heading={<FormattedMessage id="ui-organizations.integration.confirmation.heading" />}
            message={<FormattedMessage id="ui-organizations.integration.confirmation.message" />}
            onCancel={toggleRemoveConfirmation}
            onConfirm={onRemove}
            open
          />
        )}
      </Pane>
    </HasCommand>
  );
};

OrganizationIntegrationView.propTypes = {
  orgId: PropTypes.string.isRequired,
};

export default OrganizationIntegrationView;
