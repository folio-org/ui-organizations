import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';
// Folio
import { IfPermission } from '@folio/stripes/core';
import {
  Pane,
  PaneMenu,
  Row,
  Col,
  Icon,
  IconButton,
  Layer,
  AccordionSet,
  Accordion,
  ExpandAllButton,
  ConfirmationModal,
  MenuSection,
  Button,
} from '@folio/stripes/components';
import { withTags } from '@folio/stripes/smart-components';

import { SECTIONS } from '../common/constants';
import { SummaryView } from '../Summary';
import { ContactInformationView } from '../ContactInformation';
import { ContactPeopleView } from '../ContactPeople';
import { InterfacesViewContainer } from '../Interface';
import PaneDetails from '../PaneDetails';
import FormatTime from '../Utils/FormatTime';
import ViewVendorBlocks from './ViewVendorBlocks';

class ViewVendor extends Component {
  static propTypes = {
    connectedSource: PropTypes.object,
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
    poURL: PropTypes.string,
    showToast: PropTypes.func.isRequired,
    tagsToggle: PropTypes.func,
    tagsEnabled: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        [SECTIONS.summarySection]: false,
        [SECTIONS.contactInformationSection]: false,
        [SECTIONS.contactPeopleSection]: true,
        [SECTIONS.vendorTermsSection]: false,
        [SECTIONS.vendorInformationSection]: true,
        [SECTIONS.ediInformationSection]: false,
        [SECTIONS.interfacesSection]: false,
        [SECTIONS.accountsSection]: false,
      },
      showConfirmDelete: false,
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
  };

  mountDeleteLineConfirm = () => this.setState({ showConfirmDelete: true });

  unmountDeleteLineConfirm = () => this.setState({ showConfirmDelete: false });

  deleteOrganization = () => {
    const { parentMutator, showToast } = this.props;
    const organization = this.getData();
    const { id, name } = organization;

    parentMutator.records.DELETE({ id }).then(() => {
      showToast('ui-organizations.organization.delete.success', 'success', { organizationName: name });
      parentMutator.query.update({
        _path: '/organizations',
        layer: null,
      });
    });
  };

  getActionMenu = ({ onToggle }) => {
    const { onEdit } = this.props;
    const organization = this.getData();

    return (
      <MenuSection id="data-test-organizations-details-actions">
        <IfPermission perm="ui-organizations.delete">
          <Button
            buttonStyle="dropdownItem"
            data-test-button-delete-organization
            onClick={() => {
              onToggle();
              this.mountDeleteLineConfirm();
            }}
          >
            <Icon size="small" icon="trash">
              <FormattedMessage id="ui-organizations.view.delete" />
            </Icon>
          </Button>
        </IfPermission>
        <IfPermission perm="ui-organizations.edit">
          {organization && (
            <Button
              buttonStyle="dropdownItem"
              data-test-button-edit-organization
              onClick={() => {
                onToggle();
                onEdit();
              }}
            >
              <Icon size="small" icon="edit">
                <FormattedMessage id="ui-organizations.view.edit" />
              </Icon>
            </Button>
          )}
        </IfPermission>
      </MenuSection>
    );
  };

  render() {
    const { location, parentResources, connectedSource, tagsEnabled, tagsToggle, stripes } = this.props;
    const organization = this.getData();
    const query = location.search ? queryString.parse(location.search) : {};
    const isEdit = query.layer ? query.layer === 'edit' : false;
    const tags = _.get(organization, 'tags.tagList') || [];
    const vendorCategories = _.get(parentResources, 'vendorCategory.records');

    const lastMenu = (
      <PaneMenu>
        <IfPermission perm="ui-organizations.edit">
          {tagsEnabled && (
            <FormattedMessage id="ui-organizations.showTags">
              {(title) => (
                <IconButton
                  ariaLabel={title}
                  badgeCount={tags.length}
                  icon="tag"
                  id="clickable-show-tags"
                  onClick={tagsToggle}
                  title={title}
                />
              )}
            </FormattedMessage>
          )}
        </IfPermission>
        <IfPermission perm="ui-organizations.edit">
          <FormattedMessage id="ui-organizations.view.edit">
            {
              (title) => (
                <IconButton
                  icon="edit"
                  id="clickable-editvendor"
                  style={{ visibility: !organization ? 'hidden' : 'visible' }}
                  onClick={this.props.onEdit}
                  ariaLabel={title}
                  title={title}
                />
              )
            }
          </FormattedMessage>
        </IfPermission>
      </PaneMenu>
    );

    if (!organization || !vendorCategories) {
      return (
        <Pane
          id="pane-vendordetails"
          defaultWidth={this.props.paneWidth}
          paneTitle={<FormattedMessage id="ui-organizations.view.details" />}
          lastMenu={lastMenu}
          dismissible
          actionMenu={this.getActionMenu}
          onClose={this.props.onClose}
        >
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    const { isVendor, name } = organization;

    if (isEdit && stripes.hasPerm('ui-organizations.edit')) {
      return (
        <Layer
          isOpen
          label={<FormattedMessage id="ui-organizations.view.editVendorDialog" />}
          contentLabel="Edit vendor dialog"
        >
          <this.connectedPaneDetails
            stripes={this.props.stripes}
            initialValues={organization}
            onSubmit={this.update}
            onCancel={this.props.onCloseEdit}
            parentResources={parentResources}
            parentMutator={this.props.parentMutator}
            connectedSource={connectedSource}
          />
        </Layer>
      );
    }

    return (
      <Pane
        id="pane-vendordetails"
        defaultWidth={this.props.paneWidth}
        paneTitle={_.get(organization, ['name'], '')}
        lastMenu={lastMenu}
        actionMenu={this.getActionMenu}
        dismissible
        onClose={this.props.onClose}
      >
        <Row end="xs"><Col xs><ExpandAllButton data-test-exp accordionStatus={this.state.sections} onToggle={this.handleExpandAll} /></Col></Row>
        <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
          <Accordion label={<FormattedMessage id="ui-organizations.summary" />} id={SECTIONS.summarySection}>
            <SummaryView initialValues={organization} {...this.props} />
          </Accordion>
          <Accordion label={<FormattedMessage id="ui-organizations.contactInformation" />} id={SECTIONS.contactInformationSection}>
            <ContactInformationView
              organization={organization}
              vendorCategories={vendorCategories}
            />
          </Accordion>
          <Accordion label={<FormattedMessage id="ui-organizations.contactPeople" />} id={SECTIONS.contactPeopleSection}>
            <ContactPeopleView
              contactsIds={organization.contacts}
              vendorCategories={vendorCategories}
            />
          </Accordion>
          <Accordion label={<FormattedMessage id="ui-organizations.interface" />} id={SECTIONS.interfacesSection}>
            <InterfacesViewContainer initialValues={organization} {...this.props} />
          </Accordion>
          {isVendor && (
            <ViewVendorBlocks
              parentResources={parentResources}
              organization={organization}
            />
          )}

        </AccordionSet>
        {this.state.showConfirmDelete && (
          <ConfirmationModal
            id="delete-organization-confirmation"
            confirmLabel={<FormattedMessage id="ui-organizations.organization.delete.confirmLabel" />}
            heading={<FormattedMessage id="ui-organizations.organization.delete.heading" values={{ organizationName: `${name}` }} />}
            message={<FormattedMessage id="ui-organizations.view.delete.message" />}
            onCancel={this.unmountDeleteLineConfirm}
            onConfirm={this.deleteOrganization}
            open
          />
        )}
      </Pane>
    );
  }
}

export default withTags(ViewVendor);
