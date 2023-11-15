import { Form } from 'react-final-form';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import CategoryDropdown from './CategoryDropdown';

const categories = [
  { id: 'category1', value: 'Main' },
  { id: 'category2', value: 'Uncategorize' },
];

const wrapper = ({ children }) => (
  <MemoryRouter>
    <Form
      onSubmit={jest.fn()}
      render={() => children}
    />
  </MemoryRouter>
);

const renderCategoryDropdown = (props = {}) => render(
  <CategoryDropdown {...props} />,
  { wrapper },
);

describe('CategoryDropdown', () => {
  it('should display passed categories as options', () => {
    renderCategoryDropdown({ dropdownVendorCategories: categories });

    categories.forEach(({ value }) => expect(screen.getByText(value)).toBeDefined());
  });

  it('should display categories dropdown without label when withLabel is false', () => {
    renderCategoryDropdown({ dropdownVendorCategories: categories, withLabel: false });

    expect(screen.queryByText('ui-organizations.data.contactTypes.categories')).toBeNull();
  });

  it('should display categories dropdown label when withLabel is true', () => {
    renderCategoryDropdown({ dropdownVendorCategories: categories, withLabel: true });

    expect(screen.getByText('ui-organizations.data.contactTypes.categories')).toBeDefined();
  });
});
