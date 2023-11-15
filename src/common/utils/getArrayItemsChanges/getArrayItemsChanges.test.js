import cloneDeep from 'lodash/cloneDeep';

import { getArrayItemsChanges } from './getArrayItemsChanges';

const initialArray = [
  { id: 1, foo: 'a' },
  { id: 2, foo: 'b' },
  { id: 3, foo: 'c' },
  { id: 4, foo: 'd' },
  { id: 5, foo: 'e' },
];

describe('getArrayItemsChanges', () => {
  it('should return a list of created (added) items', () => {
    const newItems = [
      { id: 6, foo: 'f' },
      { id: 7, foo: 'g' },
      { id: 8, foo: 'e' },
    ];
    const currArray = [
      ...initialArray,
      ...newItems,
    ];

    const {
      created,
      deleted,
      updated,
    } = getArrayItemsChanges(initialArray, currArray);

    expect(created).toHaveLength(3);
    expect(created).toEqual(newItems);
    expect(deleted).toHaveLength(0);
    expect(updated).toHaveLength(0);
  });

  it('should return a list of updated items', () => {
    const updatedItems = [
      { id: 2, foo: 'bb' },
      { id: 3, foo: 'cc' },
    ];

    const currArray = cloneDeep(initialArray).map(el => {
      const updatedItem = updatedItems.find(item => item.id === el.id);

      return updatedItem || el;
    });

    const {
      created,
      deleted,
      updated,
    } = getArrayItemsChanges(initialArray, currArray);

    expect(created).toHaveLength(0);
    expect(deleted).toHaveLength(0);
    expect(updated).toHaveLength(2);
    expect(updated).toEqual(updatedItems);
  });

  it('should return a list of deleted items', () => {
    const deletedItems = initialArray.slice(0, 3);

    const currArray = cloneDeep(initialArray).filter(el => {
      const deletedItem = deletedItems.find(item => item.id === el.id);

      return !deletedItem;
    });

    const {
      created,
      deleted,
      updated,
    } = getArrayItemsChanges(initialArray, currArray);

    expect(created).toHaveLength(0);
    expect(deleted).toHaveLength(3);
    expect(deleted).toEqual(deletedItems);
    expect(updated).toHaveLength(0);
  });

  it('should return a list with all changes in the array made at once', () => {
    const newItems = [
      { id: 6, foo: 'f' },
      { id: 7, foo: 'g' },
    ];
    const updatedItems = [
      { id: 1, foo: 'aa' },
      { id: 2, foo: 'bb' },
      { id: 3, foo: 'cc' },
    ];
    const deletedItems = initialArray.slice(3, 4);

    const currArray = [
      ...cloneDeep(initialArray),
      ...newItems,
    ]
      .map(el => {
        const updatedItem = updatedItems.find(item => item.id === el.id);

        return updatedItem || el;
      })
      .filter(el => {
        const deletedItem = deletedItems.find(item => item.id === el.id);

        return !deletedItem;
      });

    const {
      created,
      deleted,
      updated,
    } = getArrayItemsChanges(initialArray, currArray);

    expect(created).toHaveLength(2);
    expect(created).toEqual(newItems);
    expect(deleted).toHaveLength(1);
    expect(deleted).toEqual(deletedItems);
    expect(updated).toHaveLength(3);
    expect(updated).toEqual(updatedItems);
  });
});
