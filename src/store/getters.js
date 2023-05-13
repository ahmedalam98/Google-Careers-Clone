import {
  UNIQUE_ORGANIZATIONS,
  FILTERED_JOBS_BY_ORGANIZATIONS,
} from "@/store/constants";

const getters = {
  // UNIQUE_ORGANIZATIONS is returning the jobs organizations from db.json without duplicates
  [UNIQUE_ORGANIZATIONS](state) {
    const uniqueOrganizations = new Set();
    state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
    return uniqueOrganizations;
  },
  // FILTERED_JOBS_BY_ORGANIZATIONS is returning the jobs that match the selected organizations by user
  [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
    if (state.selectedOrganizations.length === 0) {
      return state.jobs;
    } else {
      return state.jobs.filter((job) =>
        state.selectedOrganizations.includes(job.organization)
      );
    }
  },
};

export default getters;
