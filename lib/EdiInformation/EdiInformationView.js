import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';
import uuid from 'uuid';

import Route from 'react-router-dom/Route';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import Button from '@folio/stripes-components/lib/Button';

import LanguageList from "../Utils/Languages";
import css from "./EdiInformationView.css";

class EdiInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    onCloseDetails: PropTypes.func.isRequired,
    parentMutator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues !== null ? initialValues.edi : false;
    const edi_ftp = initialValues !== null ? initialValues.edi.edi_ftp : null;
    const edi_job = initialValues !== null ? initialValues.edi.edi_job : null;
    if (dataVal) {
      return (
        <div className={css.horizontalLine}>
          {dataVal &&
            <Row>
              <Col xs={12}>
                <h4 className={css.title}>EDI Basic</h4>
              </Col>
              <Col xs={3}>
                <KeyValue label="Vendor EDI Code" value={_.get(dataVal, ['vendor_edi_code'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Vendor EDI Type" value={_.get(dataVal, ['vendor_edi_type'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Library EDI Code" value={_.get(dataVal, ['lib_edi_code'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Library EDI Type" value={_.get(dataVal, ['lib_edi_type'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Prorate Tax" value={_.get(dataVal, ['prorate_tax']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Prorate Fees" value={_.get(dataVal, ['prorate_fees']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="EDI Naming Convention" value={_.get(dataVal, ['edi_naming_convention'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Send Account Number" value={_.get(dataVal, ['send_acct_num']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Support Order" value={_.get(dataVal, ['support_order']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Support Invoice" value={_.get(dataVal, ['support_invoice']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Notes" v alue={_.get(dataVal, ['notes']).toString()} />
              </Col>
              <Col xs={12}>
                <hr />
              </Col>
            </Row>
          }
          {edi_ftp &&
            <Row>
              <Col xs={12}>
                <h4 className={css.title}>FTP Details</h4>
              </Col>
              <Col xs={3}>
                <KeyValue label="EDI FTP" value={_.get(edi_ftp, ['ftp_format'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Server Address" value={_.get(edi_ftp, ['server_address'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Username" value={_.get(edi_ftp, ['username'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Password" value={_.get(edi_ftp, ['password'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="FTP Mode" value={_.get(edi_ftp, ['ftp_mode'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="FTP Connection Mode" value={_.get(edi_ftp, ['ftp_conn_mode'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="FTP Port" value={_.get(edi_ftp, ['ftp_port']).toString()} />
              </Col>
              <Col xs={6}>
                <KeyValue label="Order Directory" value={_.get(edi_ftp, ['order_directory'])} />
              </Col>
              <Col xs={6}>
                <KeyValue label="Invoice Directory" value={_.get(edi_ftp, ['invoice_directory'])} />
              </Col>
              <Col xs={12}>
                <KeyValue label="Notes" value={_.get(edi_ftp, ['notes'])} />
              </Col>
              <Col xs={12}>
                <hr />
              </Col>
            </Row>
          }
          {edi_ftp &&
            <Row>
              <Col xs={12}>
                <h4 className={css.title}>FTP Details</h4>
              </Col>
              <Col xs={3}>
              <KeyValue label="Schedule EDI" value={_.get(edi_job, ['schedule_edi']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Date" value={_.get(edi_job, ['date'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Time" value={_.get(edi_job, ['time'])} />
              </Col>
              <Col xs={3}>
              <KeyValue label="Monday" value={_.get(edi_job, ['is_monday']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Tuesday" value={_.get(edi_job, ['is_tuesday'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Wednesday" value={_.get(edi_job, ['is_wednesday'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Thursday" value={_.get(edi_job, ['is_thursday']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Friday" value={_.get(edi_job, ['is_friday']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Saturday" value={_.get(edi_job, ['is_saturday']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Sunday" value={_.get(edi_job, ['is_sunday']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Send to Emails" value={_.get(edi_job, ['send_to_emails']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Notify All EDI" value={_.get(edi_job, ['notify_all_edi']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Notify Invoice Only" value={_.get(edi_job, ['notify_invoice_only']).toString()} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Notify Error Only" value={_.get(edi_job, ['notify_error_only']).toString()} />
              </Col>
            </Row>
          }
        </div>
      );
    } else {
      return (
        <div>
          <p>-- No agreements available --</p>
        </div>
      )
    }
  }
}

export default EdiInformationView;