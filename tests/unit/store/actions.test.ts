import getJobs from "@/api/getJobs";
import actions from "@/store/actions";

jest.mock("@/api/getJobs"); // must be outside any suit
const getJobsMock = getJobs as jest.Mock; // type casting so that we can access the "mockResolvedValue" method

describe("actions", () => {
  describe("FETCH_JOBS", () => {
    beforeEach(() => {
      getJobsMock.mockResolvedValue([
        {
          id: 1,
          title: "Software Developer",
        },
      ]);
    });
    it("makes request to fetch jobs", async () => {
      const context = {
        commit: jest.fn(), // create a jest-mock-function named "commit"
      };
      await actions.FETCH_JOBS(context);
      expect(getJobs).toHaveBeenCalled();
    });

    it("send message to save received jobs in store", async () => {
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
