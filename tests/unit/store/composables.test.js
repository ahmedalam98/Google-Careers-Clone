import { describe, expect, it } from "@jest/globals";
import { useStore } from "vuex";
import jest from "jest";
jest.mock("vuex");

import {
  useFilteredJobs,
  useUniqueOrganizations,
  useUniqueJobTypes,
  useUniqueDegrees,
} from "@/store/composables";

describe("composables", () => {
  describe("useFilteredJobs", () => {
    it("retrieves filtered jobs from store", () => {
      useStore.mockReturnValue({
        getters: {
          FILTERED_JOBS: [{ id: 1 }],
        },
      });

      const result = useFilteredJobs();
      expect(result.value).toEqual([{ id: 1 }]);
    });
  });

  describe("useUniqueOrganizations", () => {
    it("retrieves unique organizations from store", () => {
      useStore.mockReturnValue({
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(["Google"]),
        },
      });

      const result = useUniqueOrganizations();
      expect(result.value).toEqual(new Set(["Google"]));
    });
  });

  describe("useUniqueJobTypes", () => {
    it("retrieves unique job types from store", () => {
      useStore.mockReturnValue({
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Full-time"]),
        },
      });

      const result = useUniqueJobTypes();
      expect(result.value).toEqual(new Set(["Full-time"]));
    });
  });

  describe("useUniqueDegrees", () => {
    it("retrieves unique degrees from store", () => {
      useStore.mockReturnValue({
        getters: {
          UNIQUE_DEGREES: new Set(["Bachelors"]),
        },
      });

      const result = useUniqueDegrees();
      expect(result.value).toEqual(new Set(["Bachelors"]));
    });
  });
});
