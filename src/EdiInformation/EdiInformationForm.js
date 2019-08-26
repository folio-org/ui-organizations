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
  Accordion,
} from '@folio/stripes/components';
import { isURLValid } from '../Utils/Validate';
import css from './EdiInformationForm.css';
import TogglePassword from '../Utils/TogglePassword';
import { getDropDownItems } from '../common/utils/dropdown';

class EdiInformationForm extends Component {
  static propTypes = {
    parentResources: PropTypes.object,
  };

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
    const { parentResources } = this.props;
    const vendorEdiCodeTypeDD = getDropDownItems(parentResources, 'ediCodeTypeDD', false);
    const libraryEdiCodeTypeDD = getDropDownItems(parentResources, 'ediCodeTypeDD', false);
    const ftpDD = getDropDownItems(parentResources, 'ftpDD', false);
    const transmissionModeDD = getDropDownItems(parentResources, 'transmissionModeDD', false);
    const connectionModeDD = getDropDownItems(parentResources, 'connectionModeDD', false);

    return (
      <Col xs={12} className={css.leftPadding}>
        <AccordionSet accordionStatus={this.state.subSections} onToggle={this.onToggleSubSection}>
          <Accordion
            label={<FormattedMessage id="ui-organizations.edi.ediBasic" />}
            id="ediBasicSection"
          >
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.vendorEDICode" />} name="edi.vendorEdiCode" id="vendorEdiCode" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field
                      label={<FormattedMessage id="ui-organizations.edi.vendorEDIType" />}
                      name="edi.vendorEdiType"
                      component={Select}
                      dataOptions={vendorEdiCodeTypeDD}
                      fullWidth
                    />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.libraryEDICode" />} name="edi.libEdiCode" id="libEdiCode" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field
                      label={<FormattedMessage id="ui-organizations.edi.libraryEDIType" />}
                      name="edi.libEdiType"
                      component={Select}
                      dataOptions={libraryEdiCodeTypeDD}
                      fullWidth
                    />
                  </Col>
                  <Col xs={12} className={css.EDIInfoCheckbox}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.prorateTax" />} name="edi.prorateTax" id="prorateTax" component={Checkbox} />
                  </Col>
                  <Col xs={12} className={css.EDIInfoCheckbox}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.prorateFees" />} name="edi.prorateFees" id="prorateFees" component={Checkbox} />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.ediNamingConvention" />} name="edi.ediNamingConvention" id="ediNamingConvention" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.sendAccountNumber" />} name="edi.sendAcctNum" id="sendAcctNum" component={Checkbox} />
                  </Col>
                  <Col xs={12}>
                    <p>{<FormattedMessage id="ui-organizations.edi.receiveNotifications" />}</p>
                    <Field label={<FormattedMessage id="ui-organizations.edi.orders" />} name="edi.supportOrder" id="supportOrder" component={Checkbox} />
                    <Field label={<FormattedMessage id="ui-organizations.edi.invoices" />} name="edi.supportInvoice" id="supportInvoice" component={Checkbox} />
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Field label={<FormattedMessage id="ui-organizations.edi.notes" />} name="edi.notes" component={TextArea} fullWidth />
              </Col>
            </Row>
            <br />
          </Accordion>
          <Accordion label={<FormattedMessage id="ui-organizations.edi.ftpDetails" />} id="ftpDetailsSection">
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <Field
                      label={<FormattedMessage id="ui-organizations.edi.editFTP" />}
                      name="edi.ediFtp.ftpFormat"
                      component={Select}
                      dataOptions={ftpDD}
                      fullWidth
                    />
                  </Col>
                  <Col xs={12}>
                    <Field
                      label={<FormattedMessage id="ui-organizations.edi.serverAddress" />}
                      name="edi.ediFtp.serverAddress"
                      type="text"
                      validate={[isURLValid]}
                      component={TextField}
                      fullWidth
                    />
                  </Col>
                  <Col xs={12}>
                    <Field
                      label={<FormattedMessage id="ui-organizations.edi.username" />}
                      name="edi.ediFtp.username"
                      type="text"
                      component={TextField}
                      fullWidth
                    />
                  </Col>
                  <Col xs={12}>
                    <TogglePassword
                      name="edi.ediFtp.password"
                      buttonID="ediPassword.button"
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <Field
                      label={<FormattedMessage id="ui-organizations.edi.ftpMode" />}
                      name="edi.ediFtp.ftpMode"
                      component={Select}
                      dataOptions={transmissionModeDD}
                      fullWidth
                    />
                  </Col>
                  <Col xs={12}>
                    <Field
                      label={<FormattedMessage id="ui-organizations.edi.ftpConnectionMode" />}
                      name="edi.ediFtp.ftpConnMode"
                      component={Select}
                      dataOptions={connectionModeDD}
                      fullWidth
                    />
                  </Col>
                  <Col xs={12}>
                    <Field
                      label={<FormattedMessage id="ui-organizations.edi.ftpPort" />}
                      name="edi.ediFtp.ftpPort"
                      type="text"
                      component={TextField}
                      fullWidth
                    />
                  </Col>
                  <Col xs={12}>
                    <Field
                      label={<FormattedMessage id="ui-organizations.edi.orderDirectory" />}
                      name="edi.ediFtp.orderDirectory"
                      type="text"
                      component={TextField}
                      fullWidth
                    />
                  </Col>
                  <Col xs={12}>
                    <Field
                      label={<FormattedMessage id="ui-organizations.edi.invoiceDirectory" />}
                      name="edi.ediFtp.invoiceDirectory"
                      type="text"
                      component={TextField}
                      fullWidth
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
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
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12} className={css.EDIInfoCheckbox}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.scheduleEDI" />} name="edi.ediJob.scheduleEdi" id="scheduleEdi" component={Checkbox} />
                  </Col>
                  <Col xs={12}>
                    <Field
                      label={<FormattedMessage id="ui-organizations.edi.date" />}
                      name="edi.ediJob.date"
                      component={Datepicker}
                    />
                  </Col>
                  <Col xs={12}>
                    <Field
                      label={<FormattedMessage id="ui-organizations.edi.time" />}
                      name="edi.ediJob.time"
                      placeholder="Select Time"
                      component={Timepicker}
                      timeZone="UTC"
                    />
                  </Col>
                  <Col xs={12}>
                    <p className={css.fontSizeSmall}>{<FormattedMessage id="ui-organizations.edi.weekly" />}</p>
                    <Row>
                      <Col xs={12} md={6} className={css.EDIInfoCheckbox}>
                        <Field label="Monday" name="edi.ediJob.isMonday" id="isMonday" component={Checkbox} inline={false} />
                        <Field label="Tuesday" name="edi.ediJob.isTuesday" id="isTuesday" component={Checkbox} inline={false} />
                        <Field label="Wednesday" name="edi.ediJob.isWednesday" id="isWednesday" component={Checkbox} inline={false} />
                        <Field label="Thursday" name="edi.ediJob.isThursday" id="isThursday" component={Checkbox} inline={false} />
                      </Col>
                      <Col xs={12} md={6} className={css.EDIInfoCheckbox}>
                        <Field label="Friday" name="edi.ediJob.isFriday" id="isFriday" component={Checkbox} inline={false} />
                        <Field label="Saturday" name="edi.ediJob.isSaturday" id="isSaturday" component={Checkbox} inline={false} />
                        <Field label="Sunday" name="edi.ediJob.isSunday" id="isSunday" component={Checkbox} inline={false} />
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
                    <Field label={<FormattedMessage id="ui-organizations.edi.sendToEmails" />} name="edi.ediJob.sendToEmails" id="sendToEmails" placeholder="Enter e-mail address(es)" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.notifyAllEDI" />} name="edi.ediJob.notifyAllEdi" id="notifyAllEdi" component={Checkbox} />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.notifyInvoiceOnly" />} name="edi.ediJob.notifyInvoiceOnly" id="notifyInvoiceOnly" component={Checkbox} />
                  </Col>
                  <Col xs={12}>
                    <Field label={<FormattedMessage id="ui-organizations.edi.notifyErrorOnly" />} name="edi.ediJob.notifyErrorOnly" id="notifyErrorOnly" component={Checkbox} />
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Button>{<FormattedMessage id="ui-organizations.edi.checkNow" />}</Button>
              </Col>
              <Col xs={12}>
                <Field
                  label={<FormattedMessage id="ui-organizations.edi.notes" />}
                  name="edi.ediJob.schedulingNotes"
                  component={TextArea}
                  fullWidth
                />
              </Col>
            </Row>
          </Accordion>
        </AccordionSet>
      </Col>
    );
  }
}

export default EdiInformationForm;
