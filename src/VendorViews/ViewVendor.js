import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';
// Folio
import { IfPermission } from '@folio/stripes/core';
import { Pane, PaneMenu, Row, Col, Icon, IconButton, Layer, AccordionSet, Accordion, ExpandAllButton } from '@folio/stripes/components';
import { withTags } from '@folio/stripes/smart-components';

import { SECTIONS } from '../common/constants';
import { SummaryView } from '../Summary';
import { ContactInformationView } from '../ContactInformation';
import { ContactPeopleView } from '../ContactPeople';
import { AgreementsView } from '../Agreements';
import { VendorInformationView } from '../VendorInformation';
import { EdiInformationView } from '../EdiInformation';
import { InterfaceView } from '../Interface';
import { AccountsView } from '../Accounts';
import PaneDetails from '../PaneDetails';
import FormatTime from '../Utils/FormatTime';

class ViewVendor extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    dropdown: PropTypes.object,
    stripes: PropTypes.object.isRequired,
    onCloseEdit: PropTypes.func,
    onClose: PropTypes.func,
    onEdit: PropTypes.func,
    parentResources: PropTypes.object.isRequired,
    parentMutator: PropTypes.object.isRequired,
    editLink: PropTypes.string,
    paneWidth: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        summarySection: false,
        contactInformationSection: false,
        [SECTIONS.contactPeopleSection]: true,
        agreementsSection: false,
        vendorInformationSection: true,
        EDIInformationSection: false,
        interfaceSection: false,
        accountsSection: false,
      }
    };
    this.connectedPaneDetails = this.props.stripes.connect(PaneDetails);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { parentMutator, parentResources, match: { params: { id } } } = props;
    const vendorID = (parentResources.vendorID || {}).records || [];
    if (!_.isEqual(vendorID, state.vendorData)) {
      parentMutator.queryCustom.update({ vendorIDQuery: `query=(id=${id})` });
      return { vendorData: vendorID };
    }
    return null;
  }

  getData() {
    const { parentResources, match: { params: { id } } } = this.props;
    const resourceData = ((parentResources.records || {}).records || []);
    const selectData = resourceData.length > 0 ? resourceData : this.state.vendorData;
    const vendorData = !_.isEmpty(selectData) ? selectData : [];
    const data = vendorData.find(u => u.id === id);
    const time = FormatTime(data, 'get');
    if (time) { data.edi.ediJob.time = time; }
    return data;
  }

  onToggleSection({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections[id] = !curState.sections[id];
      return newState;
    });
  }

  handleExpandAll(obj) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections = obj;
      return newState;
    });
  }

  update = (data) => {
    // Mutate
    this.props.parentMutator.records.PUT(data).then(() => {
      this.props.onCloseEdit();
    });
  }

  render() {
    const { location } = this.props;
    const initialValues = this.getData();
    const query = location.search ? queryString.parse(location.search) : {};
    const lastMenu = (
      <PaneMenu>
        <IfPermission perm="organizations-storage.organizations.item.put">
          <IconButton
            icon="edit"
            id="clickable-editvendor"
            style={{ visibility: !initialValues ? 'hidden' : 'visible' }}
            onClick={this.props.onEdit}
            href={this.props.editLink}
            title={<FormattedMessage id="ui-organizations.view.editLink" />}
          />
        </IfPermission>
      </PaneMenu>
    );

    if (!initialValues) {
      return (
        <Pane id="pane-vendordetails" defaultWidth={this.props.paneWidth} paneTitle={<FormattedMessage id="ui-organizations.view.details" />} lastMenu={lastMenu} dismissible onClose={this.props.onClose}>
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    const { isVendor } = initialValues;

    return (
      <Pane id="pane-vendordetails" defaultWidth={this.props.paneWidth} paneTitle={_.get(initialValues, ['name'], '')} lastMenu={lastMenu} dismissible onClose={this.props.onClose}>
        <Row end="xs"><Col xs><ExpandAllButton data-test-exp accordionStatus={this.state.sections} onToggle={this.handleExpandAll} /></Col></Row>
        <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
          <Accordion label={<FormattedMessage id="ui-organizations.summary" />} id="summarySection">
            <SummaryView initialValues={initialValues} {...this.props} />
          </Accordion>
          <Accordion label={<FormattedMessage id="ui-organizations.contactInformation" />} id="contactInformationSection">
            <ContactInformationView initialValues={initialValues} {...this.props} />
          </Accordion>
          <Accordion label={<FormattedMessage id="ui-organizations.contactPeople" />} id={SECTIONS.contactPeopleSection}>
            <ContactPeopleView initialValues={initialValues} {...this.props} />
          </Accordion>
          <Accordion label={<FormattedMessage id="ui-organizations.agreements" />} id="agreementsSection">
            <AgreementsView initialValues={initialValues} {...this.props} />
          </Accordion>
          {isVendor && (
            <Accordion
              label={<FormattedMessage id="ui-organizations.vendorInformation" />}
              id="vendorInformationSection"
            >
              <VendorInformationView
                initialValues={initialValues}
                {...this.props}
              />
            </Accordion>
          )}
          {isVendor && (
            <Accordion
              label={<FormattedMessage id="ui-organizations.ediInformation" />}
              id="EDIInformationSection"
            >
              <EdiInformationView initialValues={initialValues} {...this.props} />
            </Accordion>
          )}
          <Accordion label={<FormattedMessage id="ui-organizations.interface" />} id="interfaceSection">
            <InterfaceView initialValues={initialValues} {...this.props} />
          </Accordion>
          {isVendor && (
            <Accordion label={<FormattedMessage id="ui-organizations.accounts" />} id="accountsSection">
              <AccountsView initialValues={initialValues} {...this.props} />
            </Accordion>
          )}
        </AccordionSet>
        <Layer isOpen={query.layer ? query.layer === 'edit' : false} label={<FormattedMessage id="ui-organizations.view.editVendorDialog" />}>
          <this.connectedPaneDetails
            stripes={this.props.stripes}
            initialValues={initialValues}
            onSubmit={this.update}
            onCancel={this.props.onCloseEdit}
            parentResources={this.props.parentResources}
            parentMutator={this.props.parentMutator}
          />
        </Layer>
      </Pane>
    );
  }
}

export default withTags(ViewVendor);
