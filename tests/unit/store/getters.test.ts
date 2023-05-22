import getters from "@/store/getters";
import { describe, it, expect } from "@jest/globals";

import { createJob, createState } from "./utils";

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const jobs = [
        createJob({ organization: "Google" }),
        createJob({ organization: "Amazon" }),
        createJob({ organization: "Google" }),
      ];
      const state = createState({ jobs });
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const jobs = [
        createJob({ jobType: "Full-time" }),
        createJob({ jobType: "Part-time" }),
        createJob({ jobType: "Full-time" }),
      ];
      const state = createState({ jobs });
      const result = getters.UNIQUE_JOB_TYPES(state);
      expect(result).toEqual(new Set(["Full-time", "Part-time"]));
    });
  });

  describe("UNIQUE_DEGREES", () => {
    it("finds unique degrees from list of jobs", () => {
      const jobs = [
        createJob({ degree: "Master's" }),
        createJob({ degree: "Bachelor's" }),
        createJob({ degree: "Master's" }),
      ];
      const state = createState({ jobs });
      const result = getters.UNIQUE_DEGREES(state);
      expect(result).toEqual(new Set(["Master's", "Bachelor's"]));
    });
  });

  describe("INCLUDE_JOB_BY_SKILL", () => {
    describe("when the user hasn't entered any skills", () => {
      it("includes job", () => {
        const state = createState({ skillsSearchTerm: "" });
        const job = createJob({ title: "Vue Developer" });
        const includeJob = getters.INCLUDE_JOB_BY_SKILL(state)(job);
        expect(includeJob).toBe(true);
      });
    });

    it("identifies if job matches user's skill", () => {
      const state = createState({ skillsSearchTerm: "Vue" });
      const job = createJob({ title: "Vue Developer" });
      const includeJob = getters.INCLUDE_JOB_BY_SKILL(state)(job);
      expect(includeJob).toBe(true);
    });

    it("handles inconsistent character casing", () => {
      const state = createState({ skillsSearchTerm: "vuE" });
      const job = createJob({ title: "Vue Developer" });
      const includeJob = getters.INCLUDE_JOB_BY_SKILL(state)(job);
      expect(includeJob).toBe(true);
    });
  });

  describe("FILTERED_JOBS", () => {
    it("filters jobs by organization, job type and degree", () => {
      const INCLUDE_JOB_BY_ORGANIZATION = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_DEGREE = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_SKILL = jest.fn().mockReturnValue(true);

      const mockGetters: any = {
        INCLUDE_JOB_BY_ORGANIZATION,
        INCLUDE_JOB_BY_JOB_TYPE,
        INCLUDE_JOB_BY_DEGREE,
        INCLUDE_JOB_BY_SKILL,
      };

      const job = createJob({
        organization: "Google",
        jobType: "Full-time",
        degree: "Master's",
      });
      const state = createState({
        jobs: [job],
      });

      const result = getters.FILTERED_JOBS(state, mockGetters);
      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_DEGREE).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_SKILL).toHaveBeenCalledWith(job);
    });
  });
});
