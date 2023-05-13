import getJobs from "@/api/getJobs";
import { FETCH_JOBS, RECEIVE_JOBS } from "@/store/constants";

const actions = {
  [FETCH_JOBS]: async (context) => {
    const jobListings = await getJobs();
    // jobListings is the payload that will replace (jobs) in the mutation (RECEIVE_JOBS)
    context.commit(RECEIVE_JOBS, jobListings);
  },
};

export default actions;
