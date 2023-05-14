import { getters } from "@/store/index.js";
import { describe, it, expect } from "@jest/globals";
import jest from "jest";

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const state = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Google" },
        ],
      };
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const state = {
        jobs: [
          { jobType: "Full-time" },
          { jobType: "Part-time" },
          { jobType: "Full-time" },
        ],
      };
      const result = getters.UNIQUE_JOB_TYPES(state);
      expect(result).toEqual(new Set(["Full-time", "Part-time"]));
    });
  });

  describe("UNIQUE_DEGREES", () => {
    it("finds unique degrees from list of jobs", () => {
      const state = {
        jobs: [
          { degree: "Master's" },
          { degree: "Bachelor's" },
          { degree: "Master's" },
        ],
      };
      const result = getters.UNIQUE_DEGREES(state);
      expect(result).toEqual(new Set(["Master's", "Bachelor's"]));
    });
  });

  describe("FILTERED_JOBS", () => {
    it("filters jobs by organization, job type and degree", () => {
      const INCLUDE_JOB_BY_ORGANIZATION = jest.fn().mockResolvedValue(true);
      const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockResolvedValue(true);
      const INCLUDE_JOB_BY_DEGREE = jest.fn().mockResolvedValue(true);
      const mockGetters = {
        INCLUDE_JOB_BY_ORGANIZATION,
        INCLUDE_JOB_BY_JOB_TYPE,
        INCLUDE_JOB_BY_DEGREE,
      };

      const job = {
        organization: "Google",
        jobType: "Full-time",
        degree: "Master's",
      };
      const state = {
        jobs: [job],
      };

      const result = getters.FILTERED_JOBS(state, mockGetters);
      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_DEGREE).toHaveBeenCalledWith(job);
    });
  });
});
