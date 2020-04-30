import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Row,
  Col,
  Headline,
  Checkbox,
  KeyValue,
} from '@folio/stripes/components';

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
          <KeyValue
            label={<FormattedMessage id="ui-organizations.edi.prorateTax" />}
          >
            <Checkbox
              checked={edi.prorateTax}
              disabled
            />
          </KeyValue>
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.edi.prorateFees" />}
          >
            <Checkbox
              checked={edi.prorateFees}
              disabled
            />
          </KeyValue>
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.edi.ediNamingConvention" />}
            value={edi.ediNamingConvention}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.edi.sendAccountNumber" />}
          >
            <Checkbox
              checked={edi.sendAcctNum}
              disabled
            />
          </KeyValue>
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.edi.orders" />}
          >
            <Checkbox
              checked={edi.supportOrder}
              disabled
            />
          </KeyValue>
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.edi.invoices" />}
          >
            <Checkbox
              checked={edi.supportInvoice}
              disabled
            />
          </KeyValue>
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
              label={<FormattedMessage id="ui-organizations.edi.serverAddress" />}
              value={edi.ediFtp.serverAddress}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.username" />}
              value={edi.ediFtp.username}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.password" />}
              value={edi.ediFtp.password}
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
              label={<FormattedMessage id="ui-organizations.edi.ftpPort" />}
              value={edi.ediFtp.ftpPort}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.orderDirectory" />}
              value={edi.ediFtp.orderDirectory}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.invoiceDirectory" />}
              value={edi.ediFtp.invoiceDirectory}
            />
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.notes" />}
              value={edi.ediFtp.notes}
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
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.scheduleEDI" />}
            >
              <Checkbox
                checked={edi.ediJob.scheduleEdi}
                disabled
              />
            </KeyValue>
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.date" />}
              value={edi.ediJob.date}
            />
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
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.notifyAllEDI" />}
            >
              <Checkbox
                checked={edi.ediJob.notifyAllEdi}
                disabled
              />
            </KeyValue>
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.notifyInvoiceOnly" />}
            >
              <Checkbox
                checked={edi.ediJob.notifyInvoiceOnly}
                disabled
              />
            </KeyValue>
          </Col>

          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.notifyErrorOnly" />}
            >
              <Checkbox
                checked={edi.ediJob.notifyErrorOnly}
                disabled
              />
            </KeyValue>
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.monday" />}
            >
              <Checkbox
                checked={edi.ediJob.isMonday}
                disabled
              />
            </KeyValue>
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.tuesday" />}
            >
              <Checkbox
                checked={edi.ediJob.isTuesday}
                disabled
              />
            </KeyValue>
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.wednesday" />}
            >
              <Checkbox
                checked={edi.ediJob.isWednesday}
                disabled
              />
            </KeyValue>
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.thursday" />}
            >
              <Checkbox
                checked={edi.ediJob.isThursday}
                disabled
              />
            </KeyValue>
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.friday" />}
            >
              <Checkbox
                checked={edi.ediJob.isFriday}
                disabled
              />
            </KeyValue>
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.saturday" />}
            >
              <Checkbox
                checked={edi.ediJob.isSaturday}
                disabled
              />
            </KeyValue>
          </Col>

          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-organizations.edi.sunday" />}
            >
              <Checkbox
                checked={edi.ediJob.isSunday}
                disabled
              />
            </KeyValue>
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
