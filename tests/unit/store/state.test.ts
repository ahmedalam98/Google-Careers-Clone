import state from "@/store/state";
import { describe, it, expect } from "@jest/globals";

describe("state", () => {
  it("keeps track of whether user is logged in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });

  it("stores job listings", () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });

  it("stores user's search term for skills and qualifications", () => {
    const startingState = state();
    expect(startingState.skillsSearchTerm).toEqual("");
  });

  it("stores organizations that user has chosen to filter jobs by", () => {
    const startingState = state();
    expect(startingState.selectedOrganizations).toEqual([]);
  });

  it("stores job types that user has chosen to filter jobs by", () => {
    const startingState = state();
    expect(startingState.selectedJobTypes).toEqual([]);
  });

  it("stores degrees that user has chosen to filter jobs by", () => {
    const startingState = state();
    expect(startingState.selectedDegrees).toEqual([]);
  });
});
