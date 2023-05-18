import { describe, it, expect } from "@jest/globals";
import mutations from "@/store/mutations";
import { createState, createJob } from "./utils";

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const statringState = createState({ isLoggedIn: false });
      mutations.LOGIN_USER(statringState);
      expect(statringState.isLoggedIn).toBe(true);
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("receives jobs from API", () => {
      const statringState = createState({ jobs: [] });
      const jobOne = createJob();
      const jobTwo = createJob();
      mutations.RECEIVE_JOBS(statringState, [jobOne, jobTwo]);
      expect(statringState.jobs).toEqual([jobOne, jobTwo]);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations that user has chosen to filter jobs by", () => {
      const statringState = createState({ selectedOrganizations: [] });
      mutations.ADD_SELECTED_ORGANIZATIONS(statringState, ["Org1", "Org2"]);
      expect(statringState.selectedOrganizations).toEqual(["Org1", "Org2"]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types that user has chosen to filter jobs by", () => {
      const statringState = createState({ selectedJobTypes: [] });
      mutations.ADD_SELECTED_JOB_TYPES(statringState, [
        "Full-time",
        "Part-time",
      ]);
      expect(statringState.selectedJobTypes).toEqual([
        "Full-time",
        "Part-time",
      ]);
    });
  });

  describe("ADD_SELECTED_DEGREES", () => {
    it("updates degrees that user has chosen to filter jobs by", () => {
      const statringState = createState({ selectedDegrees: [] });
      mutations.ADD_SELECTED_DEGREES(statringState, ["Master's", "Bachelor's"]);
      expect(statringState.selectedDegrees).toEqual(["Master's", "Bachelor's"]);
    });
  });
});
