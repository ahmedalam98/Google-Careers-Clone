import {
  LOGIN_USER,
  RECEIVE_JOBS,
  ADD_SELECTED_ORGANIZATIONS,
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
};

export default mutations;
