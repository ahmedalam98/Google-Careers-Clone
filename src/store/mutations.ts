import {
  LOGIN_USER,
  RECEIVE_JOBS,
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
  ADD_SELECTED_DEGREES,
  CLEAR_USER_JOB_FILTER_SELECTIONS,
  UPDATE_SKILLS_SEARCH_TERM,
} from "@/store/constants";

import { GlobalState } from "@/store/types";
import { Job } from "@/api/types";

const mutations = {
  // array destructuring to avoid typos.
  [LOGIN_USER](state: GlobalState) {
    // (other than React) in Vue nothing wrong with updating the state directly
    state.isLoggedIn = true;
  },
  // jobs is the payload here (the data we want to update the state with)
  [RECEIVE_JOBS](state: GlobalState, jobs: Job[]) {
    state.jobs = jobs;
  },
  // organizations is the payload that will be manipulated by user from (JobFiltersSideBarOrganizations) component
  [ADD_SELECTED_ORGANIZATIONS](state: GlobalState, organizations: string[]) {
    state.selectedOrganizations = organizations;
  },
  [ADD_SELECTED_JOB_TYPES](state: GlobalState, jobTypes: string[]) {
    state.selectedJobTypes = jobTypes;
  },
  [ADD_SELECTED_DEGREES](state: GlobalState, degrees: string[]) {
    state.selectedDegrees = degrees;
  },
  [UPDATE_SKILLS_SEARCH_TERM](state: GlobalState, skillsSearchTerm: string) {
    state.skillsSearchTerm = skillsSearchTerm;
  },
  [CLEAR_USER_JOB_FILTER_SELECTIONS](state: GlobalState) {
    state.selectedOrganizations = [];
    state.selectedJobTypes = [];
    state.selectedDegrees = [];
    state.skillsSearchTerm = "";
  },
};

export default mutations;
