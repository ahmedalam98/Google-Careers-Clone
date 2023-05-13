import actions from "@/store/actions";
import { describe, it, expect, beforeEach } from "@jest/globals";
import jest from "jest";

import { getJobs } from "@/api/getJobs";
jest.mock("@/api/getJobs");

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
