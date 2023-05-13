import {
  LOGIN_USER,
  RECEIVE_JOBS,
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
  ADD_SELECTED_DEGREES,
} from "@/store/constants";

const mutations = {
  // array destructuring to avoid typos.
  [LOGIN_USER](state) {
    // (other than React) in Vue nothing wrong with updating the state directly
    state.isLoggedIn = true;
  },
  // jobs is the payload here (the data we want to update the state with)
  [RECEIVE_JOBS](state, jobs) {
    state.jobs = jobs;
  },
  // organizations is the payload that will be manipulated by user from (JobFiltersSideBarOrganizations) component
  [ADD_SELECTED_ORGANIZATIONS](state, organizations) {
    state.selectedOrganizations = organizations;
  },
  [ADD_SELECTED_JOB_TYPES](state, jobTypes) {
    state.selectedJobTypes = jobTypes;
  },
  [ADD_SELECTED_DEGREES](state, degrees) {
    state.selectedDegrees = degrees;
  },
};

export default mutations;
