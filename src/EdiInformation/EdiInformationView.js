import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get, find, isNull, toString } from 'lodash';
import { Row, Col } from '@folio/stripes/components';
import css from './EdiInformationView.css';
import { PrintKeyValue, PrintBoolToCheckbox } from '../Utils/PrintKeyValue';

class EdiInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape({
      dropdown: PropTypes.shape({
        paymentMethodDD: PropTypes.array.isRequired,
        ediCodeTypeDD: PropTypes.object
      })
    })
  }

  constructor(props) {
    super(props);
    this.getVendorCodeTypeItem = this.getVendorCodeTypeItem.bind(this);
    this.getLibraryEdiCodeTypeDD = this.getLibraryEdiCodeTypeDD.bind(this);
  }

  getVendorCodeTypeItem(item) {
    const { parentResources: { dropdown: { ediCodeTypeDD } } } = this.props;
    if (isNull(item)) return '';
    const obj = find(ediCodeTypeDD, { value: item });
    if (obj.value === '') return '';
    return obj.label;
  }

  getLibraryEdiCodeTypeDD(item) {
    const { parentResources: { dropdown: { ediCodeTypeDD } } } = this.props;
    if (isNull(item)) return '';
    const obj = find(ediCodeTypeDD, { value: item });
    if (obj.value === '') return '';
    return obj.label;
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues || false;
    const ediFtp = initialValues.edi ? initialValues.edi.edi_ftp : null;
    const ediScheduling = initialValues.edi ? initialValues.edi.edi_job : null;

    if (dataVal) {
      return (
        <div className={css.horizontalLine}>
          {dataVal &&
            <Row>
              <Col xs={12}>
                <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.edi.ediBasic" />}</div>
              </Col>
              {PrintKeyValue('ui-organizations.edi.vendorEDICode', get(dataVal, 'edi.vendor_edi_code', ''), 3, false)}
              {PrintKeyValue('ui-organizations.edi.vendorEDIType', get(dataVal, 'edi.vendor_edi_type', ''), 3, false)}
              {PrintKeyValue('ui-organizations.edi.libraryEDICode', get(dataVal, 'edi.lib_edi_code', ''), 3, false)}
              {PrintKeyValue('ui-organizations.edi.libraryEDIType', this.getLibraryEdiCodeTypeDD(get(dataVal, 'edi.lib_edi_type', '')), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.prorateTax', get(dataVal, 'edi.prorate_tax'), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.prorateFees', get(dataVal, 'edi.prorate_fees'), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.ediNamingConvention', get(dataVal, 'edi.edi_naming_convention'), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.sendAccountNumber', get(dataVal, 'edi.send_acct_num'), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.supportOrder', get(dataVal, 'edi.support_order'), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.supportInvoice', get(dataVal, 'edi.support_invoice'), 3, false)}
              {PrintKeyValue('ui-organizations.edi.notes', get(dataVal, 'edi.notes', ''), 3, false)}
              <Col xs={12}>
                <hr />
              </Col>
            </Row>
          }
          {ediFtp &&
            <Row>
              <Col xs={12}>
                <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.edi.ftpDetails" />}</div>
              </Col>
              {PrintKeyValue('ui-organizations.edi.editFTP', get(ediFtp, ['ftp_format']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.serverAddress', get(ediFtp, ['server_address']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.username', get(ediFtp, ['username']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.password', get(ediFtp, ['password']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.ftpMode', get(ediFtp, ['ftp_mode']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.ftpPort', get(ediFtp, ['ftp_port']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.orderDirectory', get(ediFtp, ['order_directory']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.invoiceDirectory', get(ediFtp, ['invoice_directory']), 3, false)}
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
              {PrintBoolToCheckbox('ui-organizations.edi.scheduleEDI', toString(get(ediScheduling, ['schedule_edi'])), 3, false)}
              {PrintKeyValue('ui-organizations.edi.date', get(ediScheduling, ['date']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.time', get(ediScheduling, ['time']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.sendToEmails', get(ediScheduling, ['send_to_emails']), 3, false)}
              {PrintKeyValue('ui-organizations.edi.notifyAllEDI', get(ediScheduling, ['notify_all_edi']), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.notifyInvoiceOnly', toString(get(ediScheduling, ['notify_invoice_only'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.notifyErrorOnly', toString(get(ediScheduling, ['notify_error_only'])), 6, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.monday', toString(get(ediScheduling, ['is_monday'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.tuesday', toString(get(ediScheduling, ['is_tuesday'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.wednesday', toString(get(ediScheduling, ['is_wednesday'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.thursday', toString(get(ediScheduling, ['is_thursday'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.friday', toString(get(ediScheduling, ['is_friday'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.saturday', toString(get(ediScheduling, ['is_saturday'])), 3, false)}
              {PrintBoolToCheckbox('ui-organizations.edi.sunday', toString(get(ediScheduling, ['is_sunday'])), 3, false)}
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
