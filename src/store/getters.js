import {
  UNIQUE_ORGANIZATIONS,
  UNIQUE_JOB_TYPES,
  UNIQUE_DEGREES,
  FILTERED_JOBS,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
  INCLUDE_JOB_BY_DEGREE,
} from "@/store/constants";

const getters = {
  //********** ORGANIZATIONS **********/
  // UNIQUE_ORGANIZATIONS is returning the jobs organizations from db.json without duplicates
  [UNIQUE_ORGANIZATIONS](state) {
    const uniqueOrganizations = new Set();
    state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
    return uniqueOrganizations;
  },

  //********** JOB TYPES **********/
  [UNIQUE_JOB_TYPES](state) {
    const uniqueJobTypes = new Set();
    state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType));
    return uniqueJobTypes;
  },

  //********** DEGREES **********/
  [UNIQUE_DEGREES](state) {
    const uniqueDegrees = new Set();
    state.jobs.forEach((job) => uniqueDegrees.add(job.degree));
    return uniqueDegrees;
  },

  //////////////////////////////////////////////////////////////////////

  // INCLUDE_JOB_BY_ORGANIZATION is ***Getter with ARGUMENT*** returning true if the job organization is included in the selected organizations
  [INCLUDE_JOB_BY_ORGANIZATION]: (state) => (job) => {
    if (state.selectedOrganizations.length === 0) {
      return true;
    }
    return state.selectedOrganizations.includes(job.organization);
  },
  [INCLUDE_JOB_BY_JOB_TYPE]: (state) => (job) => {
    if (state.selectedJobTypes.length === 0) {
      return true;
    }
    return state.selectedJobTypes.includes(job.jobType);
  },
  [INCLUDE_JOB_BY_DEGREE]: (state) => (job) => {
    if (state.selectedDegrees.length === 0) {
      return true;
    }
    return state.selectedDegrees.includes(job.degree);
  },

  // FILTERED_JOBS is returning the jobs that match the selected organizations, job types and degrees by user
  [FILTERED_JOBS](state, getters) {
    return state.jobs
      .filter((job) => getters.INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter((job) => getters.INCLUDE_JOB_BY_JOB_TYPE(job))
      .filter((job) => getters.INCLUDE_JOB_BY_DEGREE(job));
  },
};

export default getters;