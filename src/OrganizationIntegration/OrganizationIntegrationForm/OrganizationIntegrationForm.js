import React, {
  useMemo,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';

import stripesForm from '@folio/stripes/final-form';
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
  PaneFooter,
  Row,
} from '@folio/stripes/components';

import {
  handleKeyCommand,
} from '@folio/stripes-acq-components';

import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import { IntegrationInfoForm } from './IntegrationInfoForm';
import { EdiForm } from './EdiForm';
import { FtpForm } from './FtpForm';
import { SchedulingForm } from './SchedulingForm';

const OrganizationIntegrationForm = ({
  acqMethods,
  accounts,
  defaultIntegration,
  onClose,
  paneTitle,
  handleSubmit,
  pristine,
  submitting,
}) => {
  const history = useHistory();
  const accordionStatusRef = useRef();
  const paneFooter = useMemo(
    () => {
      const end = (
        <Button
          id="clickable-save-contact-person-footer"
          type="submit"
          buttonStyle="primary mega"
          disabled={pristine || submitting}
          onClick={handleSubmit}
        >
          <FormattedMessage id="ui-organizations.button.saveAndClose" />
        </Button>
      );

      const start = (
        <FormattedMessage id="ui-organizations.button.cancel">
          {(btnLabel) => (
            <Button
              id="clickable-close-contact-person-footer"
              buttonStyle="default mega"
              onClick={onClose}
            >
              {btnLabel}
            </Button>
          )}
        </FormattedMessage>
      );

      return (
        <PaneFooter
          renderStart={start}
          renderEnd={end}
        />
      );
    },
    [submitting, pristine, handleSubmit, onClose],
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
      name: 'cancel',
      shortcut: 'esc',
      handler: handleKeyCommand(onClose),
    },
    {
      name: 'save',
      handler: handleKeyCommand(handleSubmit, { disabled: pristine || submitting }),
    },
  ];

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
        defaultWidth="fill"
        dismissible
        id="integration-form"
        footer={paneFooter}
        onClose={onClose}
        paneTitle={paneTitle}
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
              <AccordionSet id="org-integration-form-accordion-set">
                <IntegrationInfoForm defaultIntegration={defaultIntegration} />

                <EdiForm
                  acqMethods={acqMethods}
                  accounts={accounts}
                />

                <FtpForm />

                <SchedulingForm />
              </AccordionSet>
            </AccordionStatus>
          </Col>
        </Row>
      </Pane>
    </HasCommand>
  );
};

OrganizationIntegrationForm.propTypes = {
  acqMethods: PropTypes.arrayOf(PropTypes.object),
  accounts: PropTypes.arrayOf(PropTypes.string),
  defaultIntegration: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  paneTitle: PropTypes.node.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default stripesForm({
  enableReinitialize: true,
  navigationCheck: true,
  subscription: { values: true },
})(OrganizationIntegrationForm);
