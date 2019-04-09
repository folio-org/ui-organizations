import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
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
  Accordion
} from '@folio/stripes/components';
import { isURLValid } from '../Utils/Validate';
import css from './EdiInformationForm.css';
import TogglePassword from '../Utils/TogglePassword';

class EdiInformationForm extends Component {
  static propTypes = {
    parentResources: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      subSections: {
        ediBasicSection: true,
        ftpDetailsSection: true,
        schedulingSection: true
      }
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
    const { parentResources } = this.props;
    const vendorEdiCodeTypeDD = (parentResources.dropdown || {}).ediCodeTypeDD || [];
    const libraryEdiCodeTypeDD = (parentResources.dropdown || {}).ediCodeTypeDD || [];
    const ftpDD = (parentResources.dropdown || {}).ftpDD || [];
    const transmissionModeDD = (parentResources.dropdown || {}).transmissionModeDD || [];
    const connectionModeDD = (parentResources.dropdown || {}).connectionModeDD || [];

    return (
      <Col xs={12} className={css.leftPadding}>
        <AccordionSet accordionStatus={this.state.subSections} onToggle={this.onToggleSubSection}>
          <Accordion label="EDI Basic" id="ediBasicSection">
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.vendorEDICode" />} name="edi.vendor_edi_code" id="vendor_edi_code" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.vendorEDIType" />} name="edi.vendor_edi_type" id="vendor_edi_type" component={Select} dataOptions={vendorEdiCodeTypeDD} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.libraryEDICode" />} name="edi.lib_edi_code" id="lib_edi_code" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.libraryEDIType" />} name="edi.lib_edi_type" id="lib_edi_type" component={Select} dataOptions={libraryEdiCodeTypeDD} fullWidth />
                  </Col>
                  <Col xs={12} className={css.EDIInfoCheckbox}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.prorateTax" />} name="edi.prorate_tax" id="prorate_tax" component={Checkbox} />
                  </Col>
                  <Col xs={12} className={css.EDIInfoCheckbox}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.prorateFees" />} name="edi.prorate_fees" id="prorate_fees" component={Checkbox} />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.ediNamingConvention" />} name="edi.edi_naming_convention" id="edi_naming_convention" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.sendAccountNumber" />} name="edi.send_acct_num" id="send_acct_num" component={Checkbox} />
                  </Col>
                  <Col xs={12}>
                    <p>{<FormattedMessage id="ui-organizations.edi.whatMssgs" />}</p>
                    <Field label={<FormattedMessage id="ui-organizations.edi.supportOrder" />} name="edi.support_order" id="support_order" component={Checkbox} />
                    <Field label={<FormattedMessage id="ui-organizations.edi.supportInvoice" />} name="edi.support_invoice" id="support_invoice" component={Checkbox} />
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Field label={<FormattedMessage id="ui-organizations.edi.notes" />} name="edi.notes" id="edi_notes" component={TextArea} fullWidth />
              </Col>
            </Row>
            <br />
          </Accordion>
          <Accordion label={<FormattedMessage id="ui-organizations.edi.ftpDetails" />} id="ftpDetailsSection">
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.editFTP" />} name="edi.edi_ftp.ftp_format" id="edi_edit_ftp_format" component={Select} dataOptions={ftpDD} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.serverAddress" />} name="edi.edi_ftp.server_address" id="edi_server_address" type="text" validate={[isURLValid]} component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.username" />} name="edi.edi_ftp.username" id="edi_username" type="text" component={TextField} autoComplete="nope" fullWidth />
                  </Col>
                  <Col xs={12}>
                    <TogglePassword name="edi.edi_ftp.password" id="edi_password" buttonID="edi_password.button" />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.ftpMode" />} name="edi.edi_ftp.ftp_mode" id="edi_edi_ftp__mode" component={Select} dataOptions={transmissionModeDD} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.ftpConnectionMode" />} name="edi.edi_ftp.ftp_conn_mode" id="edi_edi_ftp_conn_mode" component={Select} dataOptions={connectionModeDD} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.ftpPort" />} name="edi.edi_ftp.ftp_port" id="edi_edit_ftp_ftp_port" type="text" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.orderDirectory" />} name="edi.edi_ftp.order_directory" id="edi_order_directory" type="text" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.invoiceDirectory" />} name="edi.edi_ftp.invoice_directory" id="edi_invoice_directory" type="text" component={TextField} fullWidth />
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Field label={<FormattedMessage id="ui-organizations.edi.notes" />} name="edi.edi_ftp.notes" id="edi_edi_ftp.notes" component={TextArea} fullWidth />
              </Col>
            </Row>
          </Accordion>
          <Accordion label="Scheduling" id="schedulingSection">
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12} className={css.EDIInfoCheckbox}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.scheduleEDI" />} name="edi.edi_job.schedule_edi" id="schedule_edi" component={Checkbox} />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.date" />} name="edi.edi_job.date" id="edi_edi_job.date" component={Datepicker} />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.time" />} name="edi.edi_job.time" id="edi_edi_job.time" placeholder="Select Time" component={Timepicker} timeZone="UTC" />
                  </Col>
                  <Col xs={12}>
                    <p className={css.fontSizeSmall}>{<FormattedMessage id="ui-organizations.edi.weekly" />}</p>
                    <Row>
                      <Col xs={12} md={6} className={css.EDIInfoCheckbox}>
                        <Field label="Monday" name="edi.edi_job.is_monday" id="is_monday" component={Checkbox} inline={false} />
                        <Field label="Tuesday" name="edi.edi_job.is_tuesday" id="is_tuesday" component={Checkbox} inline={false} />
                        <Field label="Wednesday" name="edi.edi_job.is_wednesday" id="is_wednesday" component={Checkbox} inline={false} />
                        <Field label="Thursday" name="edi.edi_job.is_thursday" id="is_thursday" component={Checkbox} inline={false} />
                      </Col>
                      <Col xs={12} md={6} className={css.EDIInfoCheckbox}>
                        <Field label="Friday" name="edi.edi_job.is_friday" id="is_friday" component={Checkbox} inline={false} />
                        <Field label="Saturday" name="edi.edi_job.is_saturday" id="is_saturday" component={Checkbox} inline={false} />
                        <Field label="Sunday" name="edi.edi_job.is_sunday" id="is_sunday" component={Checkbox} inline={false} />
                      </Col>
                    </Row>
                    <br />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <p className={css.fontSizeSmall}>{<FormattedMessage id="ui-organizations.edi.notificationOptions" />}</p>
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.sendToEmails" />} name="edi.edi_job.send_to_emails" id="send_to_emails" placeholder="Enter e-mail address(es)" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.notifyAllEDI" />} name="edi.edi_job.notify_all_edi" id="notify_all_edi" component={Checkbox} />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.notifyInvoiceOnly" />} name="edi.edi_job.notify_invoice_only" id="notify_invoice_only" component={Checkbox} />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.notifyErrorOnly" />} name="edi.edi_job.notify_error_only" id="notify_error_only" component={Checkbox} />
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Button>{<FormattedMessage id="ui-organizations.edi.checkNow" />}</Button>
              </Col>
              <Col xs={12}>
                <Field label={<FormattedMessage id="ui-organizations.edi.notes" />} name="edi.edi_job.scheduling_notes" id="edi_job.scheduling_notes" component={TextArea} fullWidth />
              </Col>
            </Row>
          </Accordion>
        </AccordionSet>
      </Col>
    );
  }
}

export default EdiInformationForm;
