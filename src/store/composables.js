import { computed } from "vue";
import { useStore } from "vuex";

import {
  FILTERED_JOBS,
  UNIQUE_ORGANIZATIONS,
  UNIQUE_JOB_TYPES,
  UNIQUE_DEGREES,
  FETCH_JOBS,
} from "@/store/constants";

export const useFilteredJobs = () => {
  const store = useStore();
  return computed(() => store.getters[FILTERED_JOBS]);
};

export const useUniqueOrganizations = () => {
  const store = useStore();
  return computed(() => store.getters[UNIQUE_ORGANIZATIONS]);
};

export const useUniqueJobTypes = () => {
  const store = useStore();
  return computed(() => store.getters[UNIQUE_JOB_TYPES]);
};

export const useUniqueDegrees = () => {
  const store = useStore();
  return computed(() => store.getters[UNIQUE_DEGREES]);
};

/********** ACTIONS **********/

export const useFetchJobsDispatch = () => {
  // using composition api to replace the action
  const store = useStore();
  store.dispatch(FETCH_JOBS);
};
