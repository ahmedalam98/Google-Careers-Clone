import { state, mutations, getters, actions } from "@/store/index.js";
import { describe, it, expect, beforeEach } from "@jest/globals";

import getJobs from "@/api/getJobs";
import jest from "jest";

jest.mock("@/api/getJobs");

describe("state", () => {
  it("keeps track of whether user is logged in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });

  it("stores job listings", () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });

  it("stores organizations that user has chosen to filter jobs by", () => {
    const startingState = state();
    expect(startingState.selectedOrganizations).toEqual([]);
  });
});

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const state = { isLoggedIn: false };
      mutations.LOGIN_USER(state);
      expect(state).toEqual({ isLoggedIn: true });
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("receives jobs from API", () => {
      const state = { jobs: [] };
      mutations.RECIEVE_JOBS(state, ["Job 1", "Job 2"]);
      expect(state).toEqual({ jobs: ["Job 1", "Job 2"] });
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations that user has chosen to filter jobs by", () => {
      const state = { selectedOrganizations: [] };
      mutations.ADD_SELECTED_ORGANIZATIONS(state, ["Org1", "Org2"]);
      expect(state).toEqual({ selectedOrganizations: ["Org1", "Org2"] });
    });
  });

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
  });

  describe("actions", () => {
    beforeEach(() => {
      getJobs.mockResolvedValue([
        {
          id: 1,
          title: "Software Developer",
        },
      ]);
    });

    it("makes requests to fetch jobs", async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_JOBS(context);
      expect(getJobs).toHaveBeenCalled();
    });

    it("sends message to save recieved jobs in store", async () => {
      const commit = jest.fn();
      const context = { commit };
      await actions.FETCH_JOBS(context);
      expect(commit).toHaveBeenCalledWith("RECEIVE_JOBS", [
        {
          id: 1,
          title: "Software Developer",
        },
      ]);
    });
  });
});
