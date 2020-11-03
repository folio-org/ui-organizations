import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Row,
  Col,
  Headline,
  Checkbox,
  KeyValue,
  NoValue,
} from '@folio/stripes/components';
import { FolioFormattedDate } from '@folio/stripes-acq-components';

import FormatTime from '../../../Utils/FormatTime';
import { getEDITypeLabel } from './utils';

const OrganizationEDIInfo = ({ edi }) => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <Headline weight="regular">
            <FormattedMessage id="ui-organizations.edi.ediBasic" />
          </Headline>
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.edi.vendorEDICode" />}
            value={edi.vendorEdiCode}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.edi.vendorEDIType" />}
            value={edi.vendorEdiType}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.edi.libraryEDICode" />}
            value={edi.libEdiCode}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.edi.libraryEDIType" />}
            value={getEDITypeLabel(edi.libEdiType)}
          />
        </Col>

        <Col xs={3}>
          <Checkbox
            checked={edi.prorateTax}
            disabled
            label={<FormattedMessage id="ui-organizations.edi.prorateTax" />}
            vertical
          />
        </Col>

        <Col xs={3}>
          <Checkbox
            checked={edi.prorateFees}
            disabled
            label={<FormattedMessage id="ui-organizations.edi.prorateFees" />}
            vertical
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.edi.ediNamingConvention" />}
            value={edi.ediNamingConvention}
          />
        </Col>

        <Col xs={3}>
          <Checkbox
            checked={edi.sendAcctNum}
            disabled
            label={<FormattedMessage id="ui-organizations.edi.sendAccountNumber" />}
            vertical
          />
        </Col>

        <Col xs={3}>
          <Checkbox
            checked={edi.supportOrder}
            disabled
            label={<FormattedMessage id="ui-organizations.edi.orders" />}
            vertical
          />
        </Col>

        <Col xs={3}>
          <Checkbox
            checked={edi.supportInvoice}
            disabled
            label={<FormattedMessage id="ui-organizations.edi.invoices" />}
            vertical
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.edi.notes" />}
            value={edi.notes}
          />
        </Col>
      </Row>

      {edi.ediFtp && (
        <Row>
          <Col xs={12}>
            <hr />

            <Headline weight="regular">
              <FormattedMessage id="ui-organizations.edi.ftpDetails" />
            </Headline>
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.editFTP" />}
              value={edi.ediFtp.ftpFormat}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.ftpMode" />}
              value={edi.ediFtp.ftpMode}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.serverAddress" />}
              value={edi?.ediFtp?.serverAddress}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.ftpConnectionMode" />}
              value={
                edi.ediFtp.ftpConnMode
                  ? <FormattedMessage id={`ui-organizations.edi.ftpConnectionMode.${edi.ediFtp.ftpConnMode}`} />
                  : <NoValue />
              }
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.username" />}
              value={edi?.ediFtp?.username}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.password" />}
              value={edi?.ediFtp?.password}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.ftpPort" />}
              value={edi?.ediFtp?.ftpPort}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.orderDirectory" />}
              value={edi?.ediFtp?.orderDirectory}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.invoiceDirectory" />}
              value={edi?.ediFtp?.invoiceDirectory}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.notes" />}
              value={edi?.ediFtp?.notes}
            />
          </Col>
        </Row>
      )}

      {edi.ediJob && (
        <Row>
          <Col xs={12}>
            <hr />

            <Headline weight="regular">
              <FormattedMessage id="ui-organizations.edi.scheduling" />
            </Headline>
          </Col>

          <Col xs={3}>
            <Checkbox
              checked={edi.ediJob.scheduleEdi}
              disabled
              label={<FormattedMessage id="ui-organizations.edi.scheduleEDI" />}
              vertical
            />
          </Col>

          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-organizations.edi.date" />}>
              <FolioFormattedDate value={edi?.ediJob?.date} />
            </KeyValue>
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.time" />}
              value={FormatTime({ edi }, 'get')}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.sendToEmails" />}
              value={edi.ediJob.sendToEmails}
            />
          </Col>

          <Col xs={3}>
            <Checkbox
              checked={edi.ediJob.notifyAllEdi}
              disabled
              label={<FormattedMessage id="ui-organizations.edi.notifyAllEDI" />}
              vertical
            />
          </Col>

          <Col xs={3}>
            <Checkbox
              checked={edi.ediJob.notifyInvoiceOnly}
              disabled
              label={<FormattedMessage id="ui-organizations.edi.notifyInvoiceOnly" />}
              vertical
            />
          </Col>

          <Col xs={6}>
            <Checkbox
              checked={edi.ediJob.notifyErrorOnly}
              disabled
              label={<FormattedMessage id="ui-organizations.edi.notifyErrorOnly" />}
              vertical
            />
          </Col>

          <Col xs={3}>
            <Checkbox
              checked={edi.ediJob.isMonday}
              disabled
              label={<FormattedMessage id="ui-organizations.edi.monday" />}
              vertical
            />
          </Col>

          <Col xs={3}>
            <Checkbox
              checked={edi.ediJob.isTuesday}
              disabled
              label={<FormattedMessage id="ui-organizations.edi.tuesday" />}
              vertical
            />
          </Col>

          <Col xs={3}>
            <Checkbox
              checked={edi.ediJob.isWednesday}
              disabled
              label={<FormattedMessage id="ui-organizations.edi.wednesday" />}
              vertical
            />
          </Col>

          <Col xs={3}>
            <Checkbox
              checked={edi.ediJob.isThursday}
              disabled
              label={<FormattedMessage id="ui-organizations.edi.thursday" />}
              vertical
            />
          </Col>

          <Col xs={3}>
            <Checkbox
              checked={edi.ediJob.isFriday}
              disabled
              label={<FormattedMessage id="ui-organizations.edi.friday" />}
              vertical
            />
          </Col>

          <Col xs={3}>
            <Checkbox
              checked={edi.ediJob.isSaturday}
              disabled
              label={<FormattedMessage id="ui-organizations.edi.saturday" />}
              vertical
            />
          </Col>

          <Col xs={3}>
            <Checkbox
              checked={edi.ediJob.isSunday}
              disabled
              label={<FormattedMessage id="ui-organizations.edi.sunday" />}
              vertical
            />
          </Col>
        </Row>
      )}
    </>
  );
};

OrganizationEDIInfo.propTypes = {
  edi: PropTypes.object,
};

OrganizationEDIInfo.defaultProps = {
  edi: {},
};

export default OrganizationEDIInfo;
