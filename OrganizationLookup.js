import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Button,
  Card,
  Col,
  KeyValue,
  Layout,
  NoValue,
  Row,
  Tooltip,
} from '@folio/stripes/components';

import { AppIcon, Pluggable } from '@folio/stripes/core';

// This must return a function to render a link button

const propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }),
  onResourceSelected: PropTypes.func,
  resource: PropTypes.object,
};

const OrganizationLookup = ({
  disabled,
  id,
  input: { name, value },
  onResourceSelected,
  renderOrganizations,
  resource
}) => {
  let triggerButton = useRef(null);

  const renderOrganizationLinkButton = (v) => (
    <Pluggable
      dataKey={id}
      selectVendor={onResourceSelected}
      renderTrigger={(pluggableRenderProps) => {
        triggerButton = pluggableRenderProps.buttonRef;

        const organizationName = resource?.name;
        const buttonProps = {
          'aria-haspopup': 'true',
          'buttonRef': triggerButton,
          'buttonStyle': v ? 'default' : 'primary',
          'disabled': disabled,
          'id': `${id}-find-organizations-btn`,
          'marginBottom0': true,
          'name': name,
          'onClick': pluggableRenderProps.onClick,
        };

        if (value) {
          return (
            <Tooltip
              id={`${id}-organizations-button-tooltip`}
              text={<FormattedMessage id="ui-organizations.relatedOrganization.replaceOrganizationSpecific" values={{ organizationName }} />}
              triggerRef={triggerButton}
            >
              {({ ariaIds }) => (
                <Button
                  aria-labelledby={ariaIds.text}
                  {...buttonProps}
                >
                  <FormattedMessage id="ui-organizations.relatedOrganization.replaceOrganization" />
                </Button>
              )}
            </Tooltip>
          );
        }

        return (
          <Button
            {...buttonProps}
          >
            <FormattedMessage id="ui-organizations.relatedOrganization.linkOrganization" />
          </Button>
        );
      }}
      type="find-organization"
    >
      <FormattedMessage id="ui-organizations.relatedOrganization.noPlugin" />
    </Pluggable>
  );

  const defaultRenderOrganizations = () => (
    <div>
      <Row>
        <Col md={12} xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.main.name" />}
            value={resource.name ?? <NoValue />}
          />
        </Col>
      </Row>
    </div>
  );

  const renderEmpty = () => (
    <div>
      <Layout className="textCentered">
        <strong>
          <FormattedMessage id="ui-organizations.relatedOrganization.noneLinked" />
        </strong>
      </Layout>
      <Layout className="textCentered">
        <FormattedMessage id="ui-organizations.relatedOrganization.linkToStart" />
      </Layout>
    </div>
  );

  const renderFunction = () => {
    if (value) {
      if (renderOrganizations) {
        return renderOrganizations(resource);
      }

      return defaultRenderOrganizations();
    }

    return renderEmpty();
  };

  return (
    <Card
      cardStyle={value ? 'positive' : 'negative'}
      headerEnd={renderOrganizationLinkButton(value)}
      headerStart={(
        <AppIcon app="organizations" size="small">
          <strong>
            <FormattedMessage id="ui-organizations.meta.title" />
          </strong>
        </AppIcon>
      )}
      id={id}
      roundedBorder
    >
      {renderFunction()}
    </Card>
  );
};

OrganizationLookup.propTypes = propTypes;

export default OrganizationLookup;
