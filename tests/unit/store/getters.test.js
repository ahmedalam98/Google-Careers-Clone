import { getters } from "@/store/index.js";
import { describe, it, expect } from "@jest/globals";

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

  describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
    it("identifies jobs that match selected organizations", () => {
      const state = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ],
        selectedOrganizations: ["Google", "Amazon"],
      };
      const filteredJobs = getters.FILTERED_JOBS_BY_ORGANIZATIONS(state);
      expect(filteredJobs).toEqual([
        { organization: "Google" },
        { organization: "Amazon" },
      ]);
    });

    describe("when user has not selected any organizations", () => {
      it("returns all jobs", async () => {
        const state = {
          jobs: [
            { organization: "Google" },
            { organization: "Amazon" },
            { organization: "Microsoft" },
          ],
          selectedOrganizations: [],
        };
        const filteredJobs = getters.FILTERED_JOBS_BY_ORGANIZATIONS(state);
        expect(filteredJobs).toEqual([
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ]);
      });
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

  describe("FILTERED_JOBS_BY_JOB_TYPES", () => {
    it("identifies jobs that match selected job types", () => {
      const state = {
        jobs: [
          { jobTypes: "Full-time" },
          { jobTypes: "Temporary" },
          { jobTypes: "Part-time" },
        ],
        selectedJobTypes: ["Full-time", "Part-time"],
      };
      const filteredJobs = getters.FILTERED_JOBS_BY_JOB_TYPES(state);
      expect(filteredJobs).toEqual([
        { jobTypes: "Full-time" },
        { jobTypes: "Part-time" },
      ]);
    });

    describe("when user has not selected any job type", () => {
      it("returns all jobs", async () => {
        const state = {
          jobs: [
            { jobTypes: "Full-time" },
            { jobTypes: "Temporary" },
            { jobTypes: "Part-time" },
          ],
          selectedJobTypes: [],
        };
        const filteredJobs = getters.FILTERED_JOBS_BY_JOB_TYPES(state);
        expect(filteredJobs).toEqual([
          { jobTypes: "Full-time" },
          { jobTypes: "Temporary" },
          { jobTypes: "Part-time" },
        ]);
      });
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

  describe("FILTERED_JOBS_BY_DEGREES", () => {
    it("identifies jobs that match selected degrees", () => {
      const state = {
        jobs: [
          { degree: "Master's" },
          { degree: "Bachelor's" },
          { degree: "Ph.D." },
        ],
        selectedDegrees: ["Master's", "Bachelor's"],
      };
      const filteredJobs = getters.FILTERED_JOBS_BY_DEGREES(state);
      expect(filteredJobs).toEqual([
        { degree: "Master's" },
        { degree: "Bachelor's" },
      ]);
    });

    describe("when user has not selected any degree", () => {
      it("returns all jobs", async () => {
        const state = {
          jobs: [
            { degree: "Master's" },
            { degree: "Bachelor's" },
            { degree: "Ph.D." },
          ],
          selectedDegrees: [],
        };
        const filteredJobs = getters.FILTERED_JOBS_BY_DEGREES(state);
        expect(filteredJobs).toEqual([
          { degree: "Master's" },
          { degree: "Bachelor's" },
          { degree: "Ph.D." },
        ]);
      });
    });
  });
});
