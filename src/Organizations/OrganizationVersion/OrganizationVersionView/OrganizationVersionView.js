import PropTypes from 'prop-types';
import { useRef } from 'react';

import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  checkScope,
  Col,
  collapseAllSections,
  ExpandAllButton,
  expandAllSections,
  HasCommand,
  Row,
} from '@folio/stripes/components';

import {
  ORGANIZATION_SECTION_LABELS,
  ORGANIZATION_SECTIONS,
} from '../../constants';
import {
  OrganizationAccountsVersionView,
  OrganizationContactInfoVersionView,
  OrganizationContactPeopleVersionView,
  OrganizationInterfacesVersionView,
  OrganizationSummaryVersionView,
  OrganizationVendorInfoVersionView,
  OrganizationVendorTermsVersionView,
} from '../components';

const initialAccordionStatus = {
  [ORGANIZATION_SECTIONS.summarySection]: true,
  [ORGANIZATION_SECTIONS.contactInformationSection]: false,
  [ORGANIZATION_SECTIONS.contactPeopleSection]: true,
  [ORGANIZATION_SECTIONS.interfacesSection]: false,
  [ORGANIZATION_SECTIONS.vendorInformationSection]: false,
  [ORGANIZATION_SECTIONS.vendorTermsSection]: false,
  [ORGANIZATION_SECTIONS.integrationDetailsSection]: false,
  [ORGANIZATION_SECTIONS.accountsSection]: false,
  [ORGANIZATION_SECTIONS.agreements]: false,
};

export const OrganizationVersionView = ({ version }) => {
  const accordionStatusRef = useRef();

  const shortcuts = [
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
  ];

  console.log('version', version);

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <AccordionStatus ref={accordionStatusRef}>
        <Row end="xs">
          <Col xs={12}>
            <ExpandAllButton />
          </Col>
        </Row>

        <AccordionSet initialStatus={initialAccordionStatus}>
          <Accordion
            id={ORGANIZATION_SECTIONS.summarySection}
            label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.summarySection]}
          >
            <OrganizationSummaryVersionView version={version} />
          </Accordion>

          <Accordion
            id={ORGANIZATION_SECTIONS.contactInformationSection}
            label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.contactInformationSection]}
          >
            <OrganizationContactInfoVersionView
              version={version}
            />
          </Accordion>

          <Accordion
            id={ORGANIZATION_SECTIONS.contactPeopleSection}
            label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.contactPeopleSection]}
          >
            <OrganizationContactPeopleVersionView
              name="contacts"
              version={version}
            />
          </Accordion>

          <Accordion
            id={ORGANIZATION_SECTIONS.interfacesSection}
            label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.interfacesSection]}
          >
            <OrganizationInterfacesVersionView
              name="interfaces"
              version={version}
            />
          </Accordion>

          {
            version?.isVendor && (
              <>
                <Accordion
                  id={ORGANIZATION_SECTIONS.vendorInformationSection}
                  label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.vendorInformationSection]}
                >
                  <OrganizationVendorInfoVersionView version={version} />
                </Accordion>

                <Accordion
                  id={ORGANIZATION_SECTIONS.vendorTermsSection}
                  label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.vendorTermsSection]}
                >
                  <OrganizationVendorTermsVersionView
                    name="agreements"
                    version={version}
                  />
                </Accordion>

                <Accordion
                  id={ORGANIZATION_SECTIONS.accountsSection}
                  label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.accountsSection]}
                >
                  <OrganizationAccountsVersionView
                    name="accounts"
                    version={version}
                  />
                </Accordion>
              </>
            )
          }
        </AccordionSet>
      </AccordionStatus>
    </HasCommand>
  );
};

OrganizationVersionView.propTypes = {
  version: PropTypes.object,
};
