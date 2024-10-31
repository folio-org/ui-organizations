import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import { queryHelpers } from '@folio/jest-config-stripes/testing-library/dom';
import user from '@folio/jest-config-stripes/testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
  HasCommand,
  expandAllSections,
  collapseAllSections,
} from '@folio/stripes/components';

import { contact } from 'fixtures';

import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import EditContact from './EditContact';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
}));
jest.mock('@folio/stripes-components/lib/Commander', () => ({
  HasCommand: jest.fn(({ children }) => <div>{children}</div>),
  expandAllSections: jest.fn(),
  collapseAllSections: jest.fn(),
}));
// eslint-disable-next-line react/prop-types
jest.mock('@folio/stripes-components/lib/AutoSuggest', () => (props) => <input {...props.input} />);

const queryAllByClass = queryHelpers.queryAllByAttribute.bind(null, 'class');

const defaultProps = {
  onSubmit: jest.fn(),
  initialValues: contact,
  onClose: jest.fn(),
  categories: [{ value: 'Customer Service', id: 'f52ceea4-8e35' }],
  paneTitle: contact.firstName,
};
const renderEditContact = (props = defaultProps) => render(
  <EditContact {...props} />,
  { wrapper: MemoryRouter },
);

describe('EditContact', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  // TODO: release blocker: enable after release
  xit('should render correct form structure', () => {
    const { container, asFragment } = renderEditContact();

    container.querySelector('#edit-contact-accordion-set').removeAttribute('aria-multiselectable');

    expect(asFragment()).toMatchSnapshot();
  });

  describe('Sections toggle', () => {
    it('should have all expanded sections by default', () => {
      const { container } = renderEditContact();

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'true')
          .length,
      ).toBe(sections.length);
    });

    it('should collapse sections when Collapse all button is pressed', async () => {
      const { container } = renderEditContact();

      await user.click(screen.getByText('stripes-components.collapseAll'));

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'false')
          .length,
      ).toBe(sections.length);
    });
  });

  describe('Shortcuts', () => {
    beforeEach(() => {
      HasCommand.mockClear();
      expandAllSections.mockClear();
      collapseAllSections.mockClear();
    });

    it('should call expandAllSections when expandAllSections shortcut is called', async () => {
      expandAllSections.mockClear();
      renderEditContact();

      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'expandAllSections').handler();

      expect(expandAllSections).toHaveBeenCalled();
    });

    it('should call collapseAllSections when collapseAllSections shortcut is called', () => {
      collapseAllSections.mockClear();
      renderEditContact();

      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'collapseAllSections').handler();

      expect(collapseAllSections).toHaveBeenCalled();
    });

    it('should cancel form when cancel shortcut is called', () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderEditContact();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'cancel').handler();

      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('should navigate to list view when search shortcut is called', () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });

      renderEditContact();
      HasCommand.mock.calls[0][0].commands.find(c => c.name === 'search').handler();

      expect(pushMock).toHaveBeenCalledWith(ORGANIZATIONS_ROUTE);
    });
  });
});
