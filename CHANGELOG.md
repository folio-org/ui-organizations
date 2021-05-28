# Change history for ui-organizations

## (IN PROGRESS)

* Acquisition units no longer restrict edit create or delete actions from action menu. Refs UIORGS-243.
* Display contact people status in organization view. Refs UIORGS-248.
* Implement Keyboard shortcuts modal. Refs UIORGS-246.
* Force open accordion for required not filled fields. Refs UIORGS-244.
* Some fields in the "Account" accordion should not be required. Refs UIORGS-245.
* Compile Translation Files into AST Format. Refs UIORGS-238.

## [2.3.2](https://github.com/folio-org/ui-organizations/tree/v2.3.2) (2021-04-19)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v2.3.1...v2.3.2)

* Hide `Copy` action (Organizations: Copy interface does not work). Refs UIORGS-241.
* Hide `Copy` action (Organizations: Copy contact person does not work). Refs UIORGS-242.
* EDI scheduling time incorrectly formatted on edit form. Refs UIORGS-236.

## [2.3.1](https://github.com/folio-org/ui-organizations/tree/v2.3.1) (2021-04-13)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v2.3.0...v2.3.1)

* "Collapse all" accordions on "contact person" view not working. Refs UIORGS-231.
* Contact persons email does not appear in the view. Refs UIORGS-232.
* Deleting a contact person assigned to multiple orgs creates UI error. UIORGS-234.
* State-Region label runs off the chart. Refs UIORGS-233.
* EDI scheduling time incorrectly formatted on edit form. Refs UIORGS-236.

## [2.3.0](https://github.com/folio-org/ui-organizations/tree/v2.3.0) (2021-03-15)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v2.2.1...v2.3.0)

* Upgrade to stripes v6.
* Centralizing country and language data in stripes components. Refs UIORGS-227.
* Translate "Tax" in OrganizationVendorInfoForm. Refs UIORGS-218.
* Translate "Scheduling" in OrganizationEDIInfoForm. Refs UIORGS-216.
* Fix inconsistent use of singular/plural for email addresses. Refs UIORGS-217.
* Remove unused locale keys in `en.json`. Refs UIORGS-215.
* Add personal data disclosure form. Refs UIORGS-222.
* Interface credentials not saving when create interface. Refs UIORGS-224
* Contact information categories are not translated. Refs UIORGS-219.
* Migrate Organization and Contact Forms to React-final-form. Refs UIORGS-200.

## [2.2.1](https://github.com/folio-org/ui-organizations/tree/v2.2.1) (2020-11-10)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v2.2.0...v2.2.1)

* Org list - Move focus to results pane when response has come. Refs UIORGS-208
* Accessibility Error: Buttons must have discernible text. Refs-UIORGS-210.

## [2.2.0](https://github.com/folio-org/ui-organizations/tree/v2.2.0) (2020-10-09)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v2.1.2...v2.2.0)

* Focus details pane after user clicks on org in the search results. Refs UIORGS-207
* Focus details pane after user redirected from organization form. Refs UIORGS-206
* Add "add alternative names" button label. Refs UIORGS-205
* Select list default values not saving in form. Refs UIORGS-203
* Update view pane to display null as hyphen. Refs UIORGS-201
* Fix Typing into drop down box, does not pull the type ahead pick-list. Refs UIORGS-198
* Fix Can NOT remove delivery method from interface. Refs UIORGS-199
* Allow use of spaces in organization code. Refs UIORGS-190
* Ability to use notes with organization record. Refs UIORGS-184
* Add "Export to accounting" toggle and logic to organization/invoice record. Refs UIORGS-186
* End of list displays for search results before all records are loaded. Refs UIORGS-197
* Display contact people in alphabetical order. Refs UIORGS-192

### Stories
* [UISACQCOMP-3](https://issues.folio.org/browse/UISACQCOMP-3) Handle import of stripes-acq-components to modules and platform

### Bug fixes
* [UIORGS-170](https://issues.folio.org/browse/UIORGS-170) Accessibility Error: Form elements must have labels
* [UIORGS-169](https://issues.folio.org/browse/UIORGS-169) Accessibility Error: id attribute value must be unique
* [UIORGS-166](https://issues.folio.org/browse/UIORGS-166) Accessibility Error: Heading levels should only increase by one
* [UIORGS-162](https://issues.folio.org/browse/UIORGS-162) Accessibility Error: Buttons must have discernible text
* [UISACQCOMP-2](https://issues.folio.org/browse/UISACQCOMP-2) ACQ - CurrencySelect values are not translated
* [UIORGS-172](https://issues.folio.org/browse/UIORGS-172) a11y error: Form elements must have labels
* [UIORGS-159](https://issues.folio.org/browse/UIORGS-159) Accessibility Error: Form elements must have labels
* [UIORGS-157](https://issues.folio.org/browse/UIORGS-157) Accessibility error: IDs of active elements must be unique

## [2.1.2](https://github.com/folio-org/ui-organizations/tree/v2.1.2) (2020-07-31)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v2.1.1...v2.1.2)

* Fix Can not add add accounts to organization from edit form. Refs UIORGS-193

## [2.1.1](https://github.com/folio-org/ui-organizations/tree/v2.1.1) (2020-07-01)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v2.1.0...v2.1.1)

### Bug fixes
* [UIORGS-189](https://issues.folio.org/browse/UIORGS-189) Alias descriptions not displayed if Alias 1 has no description
* [UIORGS-187](https://issues.folio.org/browse/UIORGS-187) User not aware you need to search Language using language code

## [2.1.0](https://github.com/folio-org/ui-organizations/tree/v2.1.0) (2020-06-12)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v2.0.1...v2.1.0)

### Stories
* [UIORGS-121](https://issues.folio.org/browse/UIORGS-121) Ability to assign acquisition unit(s) to organization records
* [UIORGS-78](https://issues.folio.org/browse/UIORGS-78) Ability to add acquisition unit(s) to organization account(s)
* [UIORGS-176](https://issues.folio.org/browse/UIORGS-176) Add search filter for Acquisition units to Organization search
* [UIORGS-178](https://issues.folio.org/browse/UIORGS-178) Redirect API calls from mod-organizations-storage to mod-organzations
* [UIORGS-180](https://issues.folio.org/browse/UIORGS-180) Organizations app: Update to Stripes v4
* [UIORGS-15](https://issues.folio.org/browse/UIORGS-15) Increase unit testing code coverage
* [UINV-138](https://issues.folio.org/browse/UINV-138) Align actions icons in table to right hand side of view pane(s)

### Bug fixes
* [UIORGS-177](https://issues.folio.org/browse/UIORGS-177) Attempting to create an organization with a space in the Code returns an incorrect error
* [UIORGS-135](https://issues.folio.org/browse/UIORGS-135) Contact people create and Edit form object overlap
* [UIORGS-151](https://issues.folio.org/browse/UIORGS-151) Organizations is not using the same Expand/Collapse as implemented in Q4 2019
* [UIORGS-128](https://issues.folio.org/browse/UIORGS-128) Edit Organizations: Interface table does not look right
* [UIORGS-154](https://issues.folio.org/browse/UIORGS-154) Delete action at top of action menu

## [2.0.1](https://github.com/folio-org/ui-organizations/tree/v2.0.1) (2020-03-27)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v2.0.0...v2.0.1)

### Bug fixes
* [UIORGS-155](https://issues.folio.org/browse/UIORGS-155) Country codes are handled inconsistently in organization vs. contact addresses

## [2.0.0](https://github.com/folio-org/ui-organizations/tree/v2.0.0) (2020-03-13)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v1.6.1...v2.0.0)

* bump the @folio/stripes peer to v3.0.0

### Stories
* [UIORGS-93](https://issues.folio.org/browse/UIORGS-93) Update the country and language lists in the create/edit Contacts screen
* [UIORGS-92](https://issues.folio.org/browse/UIORGS-92) Update the country and language lists in the create/edit Organizations screen
* [UIORGS-110](https://issues.folio.org/browse/UIORGS-143) Change the Organizations default filters to be empty
* [UIORGS-143](https://issues.folio.org/browse/UIORGS-143) Update settings permission label
* [FOLIO-2436](https://issues.folio.org/browse/FOLIO-2436) organizations-storage.organizations version
* [UIORGS-89](https://issues.folio.org/browse/UIORGS-89) Assign a newly created interface to an Organization record
* [UIORGS-131](https://issues.folio.org/browse/UIORGS-131) Update table layouts in edit forms to remove redundant headings
* [UIORGS-130](https://issues.folio.org/browse/UIORGS-130) TECH-DEBT refactor Organizations list to not use SearchAndSort

### Bug Fixes
* [ERM-722](https://issues.folio.org/browse/ERM-722) Agreements and Licenses: Preview: Links to Organizations have stopped working
* [UIORGS-147](https://issues.folio.org/browse/UIORGS-147) Country filter not working
* [UIORGS-144](https://issues.folio.org/browse/UIORGS-144) Security update eslint to >= 6.2.1 or eslint-util >= 1.4.1
* [UIORGS-127](https://issues.folio.org/browse/UIORGS-127) EDI schedule days shown incorrectly
* [UIORGS-129](https://issues.folio.org/browse/UIORGS-129) Organization codes should be unique
* [UIORGS-137](https://issues.folio.org/browse/UIORGS-137) Create/assign Contact for Organization record takes additional step to complete

## [1.6.1](https://github.com/folio-org/ui-organizations/tree/v1.6.1) (2019-12-18)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v1.6.0...v1.6.1)

### Stories
* [UIORGS-125](https://issues.folio.org/browse/UIORGS-125) Organizations view pane: Update contact information layout
* [UIORGS-124](https://issues.folio.org/browse/UIORGS-124) Update contact people edit form layout
* [UIORGS-122](https://issues.folio.org/browse/UIORGS-122) Organization view pane: Update contact people view
* [UIORGS-123](https://issues.folio.org/browse/UIORGS-123) Update contact people view

### Bug Fixes
* [UIORGS-132](https://issues.folio.org/browse/UIORGS-132) Unable to search by contact information in Organizations

## [1.6.0](https://github.com/folio-org/ui-organizations/tree/v1.6.0) (2019-12-04)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v1.5.0...v1.6.0)

### Stories
* [UIORGS-86](https://issues.folio.org/browse/UIORGS-86) Add ability to hide credentials once they've been shown
* [UIORGS-90](https://issues.folio.org/browse/UIORGS-90) Refine Organization filters
* [UIORGS-114](https://issues.folio.org/browse/UIORGS-114) Organization: Update "save and close" and "Cancel" Buttons - UX
* [UIORGS-115](https://issues.folio.org/browse/UIORGS-115) Update Organization layout for create and edit
* [UIORGS-116](https://issues.folio.org/browse/UIORGS-116) Filter organizations by tags

### Bug Fixes
* [UIORGS-84](https://issues.folio.org/browse/UIORGS-84) Fix capitalization of phrases in ui-organizations
* [UIORGS-99](https://issues.folio.org/browse/UIORGS-99) Username and password field for interfaces masked even if empty
* [UIORGS-100](https://issues.folio.org/browse/UIORGS-100) Change the input of the Interface name to required
* [STCOM-590](https://issues.folio.org/browse/STCOM-590) MCL column width updates

## [1.5.0](https://github.com/folio-org/ui-organizations/tree/v1.5.0) (2019-09-11)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v1.4.0...v1.5.0)

### Stories
* [UIORGS-97](https://issues.folio.org/browse/UIORGS-97) Update the currency list for vendors to rely on the standard currency list

### Bug Fixes
* [UIORGS-87](https://issues.folio.org/browse/UIORGS-87) Unable to assign an interface to an Organization
* [UIOR-367](https://issues.folio.org/browse/UIOR-367) Fix search query

## [1.4.0](https://github.com/folio-org/ui-organizations/tree/v1.4.0) (2019-08-26)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v1.3.0...v1.4.0)

### Stories
* [UIORGS-79](https://issues.folio.org/browse/UIORGS-79) Reconfigure the UI permissions for the Organizations App
* [UIORGS-75](https://issues.folio.org/browse/UIORGS-75) When opening Orgs app, default filtered to Active & Pending
* [UIORGS-74](https://issues.folio.org/browse/UIORGS-74) Reconfigure the Organizations remove button and add confirmation modal
* [UIORGS-71](https://issues.folio.org/browse/UIORGS-71) UI fix: change "remove" buttons to trashcans in Organization records
* [UIORGS-39](https://issues.folio.org/browse/UIORGS-39) Vendor/Organization app | View Detail Record | Interface > password display
* [UIORGS-30](https://issues.folio.org/browse/UIORGS-30) Handle vendor checkbox change in "edit organization" screen for organizations
* [UIORGS-18](https://issues.folio.org/browse/UIORGS-18) Changes to primary address/email/phone_number/urls
* [UIORGS-13](https://issues.folio.org/browse/UIORGS-13) Assign tags to Organization Records
* [UIORGS-11](https://issues.folio.org/browse/UIORGS-11) Populate language fields initially with Organization "Default language"
* [UIORGS-10](https://issues.folio.org/browse/UIORGS-10) Start with filters closed

### Bug Fixes
* [UIORGS-95](https://issues.folio.org/browse/UIORGS-95) Interface: Username and Password auto-populates with saved username/password

## [1.3.0](https://github.com/folio-org/ui-organizations/tree/v1.3.0) (2019-07-23)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v1.2.0...v1.3.0)

* [UIORGS-9](https://issues.folio.org/browse/UIORGS-9) Add metadata widget to the top of the organization record
* [UIORGS-76](https://issues.folio.org/browse/UIORGS-76) Permissions problems with ui-organizations (more fixes)
* [UIORGS-81](https://issues.folio.org/browse/UIORGS-81) test permissions with BigTest

## [1.2.0](https://github.com/folio-org/ui-organizations/tree/v1.2.0) (2019-06-11)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v1.1.0...v1.2.0)
* [UIORGS-76](https://issues.folio.org/browse/UIORGS-76) Permissions problems with ui-organizations;
* [UIORGS-72](https://issues.folio.org/browse/UIORGS-72) Add “Is Vendor” column to Organizations search results and add Filter for "Is Vendor";
* [UIORGS-47](https://issues.folio.org/browse/UIORGS-47) Create/Edit Contact Form;
* [UIORGS-55](https://issues.folio.org/browse/UIORGS-55) Organizations App | Interface Accordion > New Field : Interface Type;
* [UIORGS-36](https://issues.folio.org/browse/UIORGS-36) Un-assign and delete interface form View interface;
* [UIORGS-35](https://issues.folio.org/browse/UIORGS-35) Assign Interfaces;
* [UIORGS-34](https://issues.folio.org/browse/UIORGS-34) Create and Edit interfaces;
* [UIORGS-57](https://issues.folio.org/browse/UIORGS-57) un-assign from organization edit;
* [UIORGS-67](https://issues.folio.org/browse/UIORGS-67) Add note field to contact person;
* [UIORGS-51](https://issues.folio.org/browse/UIORGS-51) Select and add multiple contacts at once;
* [UIORGS-56](https://issues.folio.org/browse/UIORGS-56) View interface;

## [1.1.0](https://github.com/folio-org/ui-organizations/tree/v1.1.0) (2019-05-10)
[Full Changelog](https://github.com/folio-org/ui-organizations/compare/v1.0.0...v1.1.0)

* UIORGS-47 Create/Edit Contact Form
* UIORGS-48 Delete contact action
* UIORGS-50 Modal Select Contact with SearchAndSort implementation
* UIORGS-63 "New" button on modal "Add contacts" to create new one
* UIORGS-52 Un-assign contact function
* UIORGS-38 Problem with vendor lookup when creating a PO
* UIORGS-54 Country should not be a required field
* UIORGS-50 Modal Select Contact with SearchAndSort implementation

## [1.0.0](https://github.com/folio-org/ui-organizations/tree/v1.0.0) (2019-04-26)
* Migrate from ui-vendors
* UIORGS-53 make org status values consistent with back-end
* UIORGS-46 View Contact component
* UIORGS-43 View "contact person" on organization view
* UIORGS-33 Swith to new API (organizations-storage)
* UIORGS-23 Remove asterisks from fields in translations
* UIORGS-17 Create BigTest skeleton/Mirage
* UIORGS-4 Restructure "edit vendor" screen for organizations
* UIORGS-3 Restructure "create vendor" screen for organizations
* UIORGS-2 Restructure "view details" screen for organizations
* UIORGS-1 Project Setup
