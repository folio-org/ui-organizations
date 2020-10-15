import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Row,
  Col,
  Button,
  TextField,
  TextArea,
  Timepicker,
  Select,
  Checkbox,
  AccordionSet,
  Accordion,
  AccordionStatus,
} from '@folio/stripes/components';
import {
  FieldDatepickerFinal,
  validateURL,
} from '@folio/stripes-acq-components';

import TogglePassword from '../../../Utils/TogglePassword';
import {
  EDI_CODE_TYPES,
  FTP_TYPES,
  TRANSMISSION_MODES,
  CONNECTION_MODES,
} from '../../constants';

import css from './OrganizationEDIInfoForm.css';

class OrganizationEDIInfoForm extends Component {
  render() {
    return (
      <Col xs={12} className={css.leftPadding}>
        <AccordionStatus>
          <AccordionSet>
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
                  <Field
                    component={TextField}
                    fullWidth
                    id="vendorEdiCode"
                    label={<FormattedMessage id="ui-organizations.edi.vendorEDICode" />}
                    name="edi.vendorEdiCode"
                    validateFields={[]}
                  />
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
                    validateFields={[]}
                  />
                </Col>
                <Col
                  data-test-library-edi-code
                  xs={6}
                  md={3}
                >
                  <Field
                    component={TextField}
                    fullWidth
                    id="libEdiCode"
                    label={<FormattedMessage id="ui-organizations.edi.libraryEDICode" />}
                    name="edi.libEdiCode"
                    validateFields={[]}
                  />
                </Col>
                <Col
                  data-test-library-edi-type
                  xs={6}
                  md={3}
                >
                  <Field
                    component={Select}
                    dataOptions={EDI_CODE_TYPES}
                    fullWidth
                    label={<FormattedMessage id="ui-organizations.edi.libraryEDIType" />}
                    name="edi.libEdiType"
                    validateFields={[]}
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
                    validateFields={[]}
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
                    validateFields={[]}
                  />
                </Col>
                <Col
                  data-test-edi-naming-convention
                  xs={6}
                  md={3}
                >
                  <Field
                    component={TextField}
                    fullWidth
                    id="ediNamingConvention"
                    label={<FormattedMessage id="ui-organizations.edi.ediNamingConvention" />}
                    name="edi.ediNamingConvention"
                    validateFields={[]}
                  />
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
                    validateFields={[]}
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
                    validateFields={[]}
                  />
                  <Field
                    label={<FormattedMessage id="ui-organizations.edi.invoices" />}
                    name="edi.supportInvoice"
                    component={Checkbox}
                    type="checkbox"
                    validateFields={[]}
                  />
                </Col>
                <Col
                  data-test-notes
                  xs={6}
                  md={3}
                >
                  <Field
                    label={<FormattedMessage id="ui-organizations.edi.notes" />}
                    name="edi.notes"
                    component={TextArea}
                    fullWidth
                    validateFields={[]}
                  />
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
                    validateFields={[]}
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
                    validateFields={[]}
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
                    validate={validateURL}
                    component={TextField}
                    fullWidth
                    validateFields={[]}
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
                    validateFields={[]}
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
                    validateFields={[]}
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
                    validateFields={[]}
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
                    validateFields={[]}
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
                    validateFields={[]}
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
                    validateFields={[]}
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
                    validateFields={[]}
                  />
                </Col>
                <Col
                  data-test-date
                  xs={6}
                  md={3}
                >
                  <FieldDatepickerFinal
                    labelId="ui-organizations.edi.date"
                    name="edi.ediJob.date"
                    validateFields={[]}
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
                    validateFields={[]}
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
                        validateFields={[]}
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
                        validateFields={[]}
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
                        validateFields={[]}
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
                        validateFields={[]}
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
                        validateFields={[]}
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
                        validateFields={[]}
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
                        validateFields={[]}
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
                    validateFields={[]}
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
                    validateFields={[]}
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
                    validateFields={[]}
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
                    validateFields={[]}
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
                    validateFields={[]}
                  />
                </Col>
              </Row>
            </Accordion>
          </AccordionSet>
        </AccordionStatus>
      </Col>
    );
  }
}

export default OrganizationEDIInfoForm;
