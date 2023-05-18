import { computed } from "vue";
import { useStore } from "vuex";

import {
  FILTERED_JOBS,
  UNIQUE_ORGANIZATIONS,
  UNIQUE_JOB_TYPES,
  UNIQUE_DEGREES,
  FETCH_JOBS,
} from "@/store/constants";

import { Job } from "@/api/types";

/********** GETTERS**********/

// <Job[]> : is a type ensures the return value is an array of Job objects
export const useFilteredJobs = () => {
  const store = useStore();
  return computed<Job[]>(() => store.getters[FILTERED_JOBS]);
};

// <Set<string>> : is a type ensures the return value is a Set of strings
export const useUniqueOrganizations = () => {
  const store = useStore();
  return computed<Set<string>>(() => store.getters[UNIQUE_ORGANIZATIONS]);
};

export const useUniqueJobTypes = () => {
  const store = useStore();
  return computed<Set<string>>(() => store.getters[UNIQUE_JOB_TYPES]);
};

export const useUniqueDegrees = () => {
  const store = useStore();
  return computed<Set<string>>(() => store.getters[UNIQUE_DEGREES]);
};

/********** ACTIONS **********/

export const useFetchJobsDispatch = () => {
  // using composition api to replace the action
  const store = useStore();
  store.dispatch(FETCH_JOBS);
};
