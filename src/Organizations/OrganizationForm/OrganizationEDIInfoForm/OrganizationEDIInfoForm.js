import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { Field } from 'redux-form';

import {
  Row,
  Col,
  Button,
  TextField,
  TextArea,
  Timepicker,
  Select,
  Checkbox,
  Datepicker,
  AccordionSet,
  Accordion,
} from '@folio/stripes/components';

import { isURLValid } from '../../../Utils/Validate';
import TogglePassword from '../../../Utils/TogglePassword';
import {
  EDI_CODE_TYPES,
  FTP_TYPES,
  TRANSMISSION_MODES,
  CONNECTION_MODES,
} from '../../constants';

import css from './OrganizationEDIInfoForm.css';

class OrganizationEDIInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subSections: {
        ediBasicSection: true,
        ftpDetailsSection: true,
        schedulingSection: true,
      },
    };
    this.onToggleSubSection = this.onToggleSubSection.bind(this);
  }

  onToggleSubSection(newAccordionStatus) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);

      newState.subSections = newAccordionStatus;

      return newState;
    });
  }

  render() {
    return (
      <Col xs={12} className={css.leftPadding}>
        <AccordionSet accordionStatus={this.state.subSections} onToggle={this.onToggleSubSection}>
          <Accordion
            label={<FormattedMessage id="ui-organizations.edi.ediBasic" />}
            id="ediBasicSection"
          >
            <Row>
              <Col
                data-test-vendor-edi-code
                xs={6}
                md={3}
              >
                <Field label={<FormattedMessage id="ui-organizations.edi.vendorEDICode" />} name="edi.vendorEdiCode" id="vendorEdiCode" component={TextField} fullWidth />
              </Col>
              <Col
                data-test-vendor-edi-type
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.vendorEDIType" />}
                  name="edi.vendorEdiType"
                  component={Select}
                  dataOptions={EDI_CODE_TYPES}
                  fullWidth
                />
              </Col>
              <Col
                data-test-library-edi-code
                xs={6}
                md={3}
              >
                <Field label={<FormattedMessage id="ui-organizations.edi.libraryEDICode" />} name="edi.libEdiCode" id="libEdiCode" component={TextField} fullWidth />
              </Col>
              <Col
                data-test-library-edi-type
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.libraryEDIType" />}
                  name="edi.libEdiType"
                  component={Select}
                  dataOptions={EDI_CODE_TYPES}
                  fullWidth
                />
              </Col>
              <Col
                data-test-prorate-tax
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.prorateTax" />}
                  name="edi.prorateTax"
                  component={Checkbox}
                  type="checkbox"
                  vertical
                />
              </Col>
              <Col
                data-test-prorate-fees
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.prorateFees" />}
                  name="edi.prorateFees"
                  component={Checkbox}
                  vertical
                  type="checkbox"
                />
              </Col>
              <Col
                data-test-edi-naming-convention
                xs={6}
                md={3}
              >
                <Field label={<FormattedMessage id="ui-organizations.edi.ediNamingConvention" />} name="edi.ediNamingConvention" id="ediNamingConvention" component={TextField} fullWidth />
              </Col>
              <Col
                data-test-send-acc-number
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.sendAccountNumber" />}
                  name="edi.sendAcctNum"
                  type="checkbox"
                  component={Checkbox}
                  vertical
                />
              </Col>
              <Col
                data-test-notifications
                xs={6}
                md={3}
              >
                <FormattedMessage id="ui-organizations.edi.receiveNotifications" />
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.orders" />}
                  name="edi.supportOrder"
                  component={Checkbox}
                  type="checkbox"
                />
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.invoices" />}
                  name="edi.supportInvoice"
                  component={Checkbox}
                  type="checkbox"
                />
              </Col>
              <Col
                data-test-notes
                xs={6}
                md={3}
              >
                <Field label={<FormattedMessage id="ui-organizations.edi.notes" />} name="edi.notes" component={TextArea} fullWidth />
              </Col>
            </Row>
          </Accordion>
          <Accordion label={<FormattedMessage id="ui-organizations.edi.ftpDetails" />} id="ftpDetailsSection">
            <Row>
              <Col
                data-test-edit-ftp
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.editFTP" />}
                  name="edi.ediFtp.ftpFormat"
                  component={Select}
                  dataOptions={FTP_TYPES}
                  fullWidth
                />
              </Col>
              <Col
                data-test-ftp-mode
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.ftpMode" />}
                  name="edi.ediFtp.ftpMode"
                  component={Select}
                  dataOptions={TRANSMISSION_MODES}
                  fullWidth
                />
              </Col>
              <Col
                data-test-server-address
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.serverAddress" />}
                  name="edi.ediFtp.serverAddress"
                  type="text"
                  validate={[isURLValid]}
                  component={TextField}
                  fullWidth
                />
              </Col>
              <Col
                data-test-ftp-connection-mode
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.ftpConnectionMode" />}
                  name="edi.ediFtp.ftpConnMode"
                  component={Select}
                  dataOptions={CONNECTION_MODES}
                  fullWidth
                />
              </Col>
            </Row>
            <Row>
              <Col
                data-test-username
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.username" />}
                  name="edi.ediFtp.username"
                  type="text"
                  component={TextField}
                  fullWidth
                />
              </Col>
              <Col
                data-test-password
                xs={6}
                md={3}
              >
                <TogglePassword
                  name="edi.ediFtp.password"
                  buttonID="ediPassword.button"
                />
              </Col>
            </Row>
            <Row>
              <Col
                data-test-ftp-port
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.ftpPort" />}
                  name="edi.ediFtp.ftpPort"
                  type="text"
                  component={TextField}
                  fullWidth
                />
              </Col>
              <Col
                data-test-order-directory
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.orderDirectory" />}
                  name="edi.ediFtp.orderDirectory"
                  type="text"
                  component={TextField}
                  fullWidth
                />
              </Col>
              <Col
                data-test-invoice-directory
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.invoiceDirectory" />}
                  name="edi.ediFtp.invoiceDirectory"
                  type="text"
                  component={TextField}
                  fullWidth
                />
              </Col>
              <Col
                data-test-notes
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.notes" />}
                  name="edi.ediFtp.notes"
                  component={TextArea}
                  fullWidth
                />
              </Col>
            </Row>
          </Accordion>
          <Accordion label="Scheduling" id="schedulingSection">
            <Row>
              <Col
                data-test-schedule-edi
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.scheduleEDI" />}
                  name="edi.ediJob.scheduleEdi"
                  component={Checkbox}
                  type="checkbox"
                  vertical
                />
              </Col>
              <Col
                data-test-date
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.date" />}
                  name="edi.ediJob.date"
                  component={Datepicker}
                />
              </Col>
              <Col
                data-test-time
                xs={6}
                md={3}
              >
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.time" />}
                  name="edi.ediJob.time"
                  placeholder="Select Time"
                  component={Timepicker}
                  timeZone="UTC"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <p className={css.fontSizeSmall}>
                  <FormattedMessage id="ui-organizations.edi.weekly" />
                </p>
                <Row>
                  <Col
                    data-test-monday
                    xs={6}
                    className={css.EDIInfoCheckbox}
                  >
                    <Field
                      component={Checkbox}
                      type="checkbox"
                      label={<FormattedMessage id="ui-organizations.edi.monday" />}
                      name="edi.ediJob.isMonday"
                    />
                  </Col>
                  <Col
                    data-test-friday
                    xs={6}
                    className={css.EDIInfoCheckbox}
                  >
                    <Field
                      component={Checkbox}
                      type="checkbox"
                      label={<FormattedMessage id="ui-organizations.edi.friday" />}
                      name="edi.ediJob.isFriday"
                    />
                  </Col>
                  <Col
                    data-test-tuesday
                    xs={6}
                    className={css.EDIInfoCheckbox}
                  >
                    <Field
                      component={Checkbox}
                      type="checkbox"
                      label={<FormattedMessage id="ui-organizations.edi.tuesday" />}
                      name="edi.ediJob.isTuesday"
                    />
                  </Col>
                  <Col
                    data-test-saturday
                    xs={6}
                    className={css.EDIInfoCheckbox}
                  >
                    <Field
                      component={Checkbox}
                      type="checkbox"
                      label={<FormattedMessage id="ui-organizations.edi.saturday" />}
                      name="edi.ediJob.isSaturday"
                    />
                  </Col>
                  <Col
                    data-test-wednesday
                    xs={6}
                    className={css.EDIInfoCheckbox}
                  >
                    <Field
                      component={Checkbox}
                      type="checkbox"
                      label={<FormattedMessage id="ui-organizations.edi.wednesday" />}
                      name="edi.ediJob.isWednesday"
                    />
                  </Col>
                  <Col
                    data-test-sunday
                    xs={6}
                    className={css.EDIInfoCheckbox}
                  >
                    <Field
                      component={Checkbox}
                      type="checkbox"
                      label={<FormattedMessage id="ui-organizations.edi.sunday" />}
                      name="edi.ediJob.isSunday"
                    />
                  </Col>
                  <Col
                    data-test-thursday
                    xs={6}
                    className={css.EDIInfoCheckbox}
                  >
                    <Field
                      component={Checkbox}
                      type="checkbox"
                      label={<FormattedMessage id="ui-organizations.edi.thursday" />}
                      name="edi.ediJob.isThursday"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <p className={css.fontSizeSmall}>
                  <FormattedMessage id="ui-organizations.edi.notificationOptions" />
                </p>
              </Col>
              <Col
                data-test-email
                xs={6}
                md={3}
              >
                <Field
                  component={TextField}
                  fullWidth
                  label={<FormattedMessage id="ui-organizations.edi.sendToEmails" />}
                  name="edi.ediJob.sendToEmails"
                  placeholder="Enter e-mail address(es)"
                />
              </Col>
              <Col
                data-test-notify-all
                xs={6}
                md={3}
              >
                <Field
                  component={Checkbox}
                  type="checkbox"
                  label={<FormattedMessage id="ui-organizations.edi.notifyAllEDI" />}
                  name="edi.ediJob.notifyAllEdi"
                  vertical
                />
              </Col>
              <Col
                data-test-notify-invoice
                xs={6}
                md={3}
              >
                <Field
                  component={Checkbox}
                  type="checkbox"
                  label={<FormattedMessage id="ui-organizations.edi.notifyInvoiceOnly" />}
                  name="edi.ediJob.notifyInvoiceOnly"
                  vertical
                />
              </Col>
              <Col
                data-test-notify-error
                xs={6}
                md={3}
              >
                <Field
                  component={Checkbox}
                  type="checkbox"
                  label={<FormattedMessage id="ui-organizations.edi.notifyErrorOnly" />}
                  name="edi.ediJob.notifyErrorOnly"
                  vertical
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button>
                  <FormattedMessage id="ui-organizations.edi.checkNow" />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col
                data-test-notes
                xs={6}
                md={3}
              >
                <Field
                  component={TextArea}
                  fullWidth
                  label={<FormattedMessage id="ui-organizations.edi.notes" />}
                  name="edi.ediJob.schedulingNotes"
                />
              </Col>
            </Row>
          </Accordion>
        </AccordionSet>
      </Col>
    );
  }
}

export default OrganizationEDIInfoForm;
