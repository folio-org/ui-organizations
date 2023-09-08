import { organization } from 'fixtures';

import {
  getResourceDataList,
  getResourceDataItem,
} from './getResourceData';

const resourceName = 'organizations';

describe('getResourceData utils', () => {
  describe('getResourceDataList', () => {
    it('should return defaultValue when resource is failed', () => {
      const defaultValue = [];
      const resources = {
        [resourceName]: {
          failed: true,
        },
      };

      expect(getResourceDataList(resources, resourceName, defaultValue)).toBe(defaultValue);
    });

    it('should return defaultValue when resource records are not defined', () => {
      const defaultValue = [];
      const resources = {
        [resourceName]: {
          failed: false,
          records: undefined,
        },
      };

      expect(getResourceDataList(resources, resourceName, defaultValue)).toBe(defaultValue);
    });

    it('should return records when not loading and defined', () => {
      const records = [organization];
      const resources = {
        [resourceName]: {
          failed: false,
          records,
        },
      };

      expect(getResourceDataList(resources, resourceName)).toBe(records);
    });
  });

  describe('getResourceDataItem', () => {
    it('should return defaultValue when records are empty', () => {
      const resources = {
        [resourceName]: {
          failed: false,
          records: [],
        },
      };

      expect(getResourceDataItem(resources, resourceName, organization)).toBe(organization);
    });

    it('should return defaultValue when resource is not empty', () => {
      const resources = {
        [resourceName]: {
          failed: false,
          records: [organization],
        },
      };

      expect(getResourceDataItem(resources, resourceName)).toBe(organization);
    });
  });
});
