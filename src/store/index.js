import getJobs from "@/api/getJobs";
import { createStore } from "vuex";

// mutation types to avoid typos
export const LOGIN_USER = "LOGIN_USER";
export const RECEIVE_JOBS = "RECEIVE_JOBS";
export const FETCH_JOBS = "FETCH_JOBS";

export const state = () => {
  return {
    isLoggedIn: false,
    jobs: [],
  };
};

export const mutations = {
  // array destructuring to avoid typos.
  [LOGIN_USER](state) {
    // (other than React) in Vue nothing wrong with updating the state directly
    state.isLoggedIn = true;
  },
  // jobs is the payload here (the data we want to update the state with)
  [RECEIVE_JOBS](state, jobs) {
    state.jobs = jobs;
  },
};

export const actions = {
  [FETCH_JOBS]: async (context) => {
    const jobListings = await getJobs();
    // jobListings is the payload that will replace (jobs) in the mutation (RECEIVE_JOBS)
    context.commit(RECEIVE_JOBS, jobListings);
  },
};

const store = createStore({
  state,
  mutations,
  actions,
  // strict mode is only for development. it ensures that state is only mutated in a *mutation*
  strict: process.env.NODE_ENV !== "production",
});

export default store;
