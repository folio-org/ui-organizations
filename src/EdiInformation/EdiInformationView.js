import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get, find, isNull, toString } from 'lodash';
import { Row, Col } from '@folio/stripes/components';
import css from './EdiInformationView.css';
import { PrintKeyValue, PrintBoolToCheckbox } from '../Utils/PrintKeyValue';

class EdiInformationView extends React.Component {
  static propTypes = {
    organization: PropTypes.object,
    parentResources: PropTypes.shape({
      dropdown: PropTypes.shape({
        paymentMethodDD: PropTypes.array.isRequired,
        ediCodeTypeDD: PropTypes.array.isRequired
      })
    })
  };

  constructor(props) {
    super(props);
    this.getVendorCodeTypeItem = this.getVendorCodeTypeItem.bind(this);
    this.getLibraryEdiCodeTypeDD = this.getLibraryEdiCodeTypeDD.bind(this);
  }

  getVendorCodeTypeItem(item) {
    const { parentResources: { dropdown: { ediCodeTypeDD } } } = this.props;
    if (isNull(item)) return '';
    const obj = find(ediCodeTypeDD, { value: item });
    if (!obj) return '';
    return obj.label;
  }

  getLibraryEdiCodeTypeDD(item) {
    const { parentResources: { dropdown: { ediCodeTypeDD } } } = this.props;
    if (isNull(item)) return '';
    const obj = find(ediCodeTypeDD, { value: item });
    if (!obj) return '';
    return obj.label;
  }

  render() {
    const { organization } = this.props;
    const ediFtp = organization.edi ? organization.edi.ediFtp : null;
    const ediScheduling = organization.edi ? organization.edi.ediJob : null;

    if (organization) {
      return (
        <div className={css.horizontalLine}>
          <Row>
            <Col xs={12}>
              <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.edi.ediBasic" />}</div>
            </Col>
            {PrintKeyValue('ui-organizations.edi.vendorEDICode', get(organization, 'edi.vendorEdiCode', ''), 3, false)}
            {PrintKeyValue('ui-organizations.edi.vendorEDIType', get(organization, 'edi.vendorEdiType', ''), 3, false)}
            {PrintKeyValue('ui-organizations.edi.libraryEDICode', get(organization, 'edi.libEdiCode', ''), 3, false)}
            {PrintKeyValue('ui-organizations.edi.libraryEDIType', this.getLibraryEdiCodeTypeDD(get(organization, 'edi.libEdiType', '')), 3, false)}
            {PrintBoolToCheckbox('ui-organizations.edi.prorateTax', get(organization, 'edi.prorateTax'), 3, false)}
            {PrintBoolToCheckbox('ui-organizations.edi.prorateFees', get(organization, 'edi.prorateFees'), 3, false)}
            {PrintKeyValue('ui-organizations.edi.ediNamingConvention', get(organization, 'edi.ediNamingConvention'), 3)}
            {PrintBoolToCheckbox('ui-organizations.edi.sendAccountNumber', get(organization, 'edi.sendAcctNum'), 3, false)}
            {PrintBoolToCheckbox('ui-organizations.edi.orders', get(organization, 'edi.supportOrder'), 3, false)}
            {PrintBoolToCheckbox('ui-organizations.edi.invoices', get(organization, 'edi.supportInvoice'), 3, false)}
            {PrintKeyValue('ui-organizations.edi.notes', get(organization, 'edi.notes', ''), 3, false)}
            <Col xs={12}>
              <hr />
            </Col>
          </Row>
          {ediFtp &&
            <Row>
              <Col xs={12}>
                <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.edi.ftpDetails" />}</div>
              </Col>
              {PrintKeyValue('ui-organizations.edi.editFTP', get(ediFtp, ['ftpFormat']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.serverAddress', get(ediFtp, ['serverAddress']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.username', get(ediFtp, ['username']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.password', get(ediFtp, ['password']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.ftpMode', get(ediFtp, ['ftpMode']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.ftpPort', get(ediFtp, ['ftpPort']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.orderDirectory', get(ediFtp, ['orderDirectory']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.invoiceDirectory', get(ediFtp, ['invoiceDirectory']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.notes', get(ediFtp, ['notes']), 3, false)}
              <Col xs={12}>
                <hr />
              </Col>
            </Row>
          }
          {ediScheduling &&
            <Row>
              <Col xs={12}>
                <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.edi.scheduling" />}</div>
              </Col>
              {PrintBoolToCheckbox('ui-organizations.edi.scheduleEDI', toString(get(ediScheduling, ['scheduleEdi'])), 3, false)}
              {PrintKeyValue('ui-organizations.edi.date', get(ediScheduling, ['date']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.time', get(ediScheduling, ['time']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.sendToEmails', get(ediScheduling, ['sendToEmails']), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.notifyAllEDI', !!get(ediScheduling, 'notifyAllEdi'), 3)}
              {PrintBoolToCheckbox('ui-organizations.edi.notifyInvoiceOnly', toString(get(ediScheduling, ['notifyInvoiceOnly'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.notifyErrorOnly', toString(get(ediScheduling, ['notifyErrorOnly'])), 6, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.monday', toString(get(ediScheduling, ['isMonday'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.tuesday', toString(get(ediScheduling, ['isTuesday'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.wednesday', toString(get(ediScheduling, ['isWednesday'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.thursday', toString(get(ediScheduling, ['isThursday'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.friday', toString(get(ediScheduling, ['isFriday'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.saturday', toString(get(ediScheduling, ['isSaturday'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.sunday', toString(get(ediScheduling, ['isSunday'])), 3, false)}
            </Row>
          }
        </div>
      );
    } else {
      return (
        <div>
          <p>{<FormattedMessage id="ui-organizations.edi.noEdiInfo" />}</p>
          <br />
        </div>
      );
    }
  }
}

export default EdiInformationView;
