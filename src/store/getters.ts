import {
  UNIQUE_ORGANIZATIONS,
  UNIQUE_JOB_TYPES,
  UNIQUE_DEGREES,
  FILTERED_JOBS,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
  INCLUDE_JOB_BY_DEGREE,
  INCLUDE_JOB_BY_SKILL,
} from "@/store/constants";

import { GlobalState } from "@/store/types";
import { Job } from "@/api/types";

interface IncludeJobGetters {
  INCLUDE_JOB_BY_ORGANIZATION: (job: Job) => boolean;
  INCLUDE_JOB_BY_JOB_TYPE: (job: Job) => boolean;
  INCLUDE_JOB_BY_DEGREE: (job: Job) => boolean;
  INCLUDE_JOB_BY_SKILL: (job: Job) => boolean;
}

const getters = {
  //********** ORGANIZATIONS **********/
  // UNIQUE_ORGANIZATIONS is returning the jobs organizations from db.json without duplicates
  [UNIQUE_ORGANIZATIONS](state: GlobalState) {
    const uniqueOrganizations = new Set<string>();
    state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
    return uniqueOrganizations;
  },

  //********** JOB TYPES **********/
  [UNIQUE_JOB_TYPES](state: GlobalState) {
    const uniqueJobTypes = new Set<string>();
    state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType));
    return uniqueJobTypes;
  },

  //********** DEGREES **********/
  [UNIQUE_DEGREES](state: GlobalState) {
    const uniqueDegrees = new Set<string>();
    state.jobs.forEach((job) => uniqueDegrees.add(job.degree));
    return uniqueDegrees;
  },

  //////////////////////////////////////////////////////////////////////

  // INCLUDE_JOB_BY_ORGANIZATION is ***Getter with ARGUMENT*** returning true if the job organization is included in the selected organizations
  [INCLUDE_JOB_BY_ORGANIZATION]: (state: GlobalState) => (job: Job) => {
    if (state.selectedOrganizations.length === 0) {
      return true;
    }
    return state.selectedOrganizations.includes(job.organization);
  },
  [INCLUDE_JOB_BY_JOB_TYPE]: (state: GlobalState) => (job: Job) => {
    if (state.selectedJobTypes.length === 0) {
      return true;
    }
    return state.selectedJobTypes.includes(job.jobType);
  },
  [INCLUDE_JOB_BY_DEGREE]: (state: GlobalState) => (job: Job) => {
    if (state.selectedDegrees.length === 0) {
      return true;
    }
    return state.selectedDegrees.includes(job.degree);
  },
  [INCLUDE_JOB_BY_SKILL]: (state: GlobalState) => (job: Job) => {
    if (state.skillsSearchTerm.length === 0) return true;

    return job.title
      .toLowerCase()
      .includes(state.skillsSearchTerm.toLocaleLowerCase());
  },

  // FILTERED_JOBS is returning the jobs that match the selected organizations, job types and degrees by user
  [FILTERED_JOBS](state: GlobalState, getters: IncludeJobGetters) {
    return state.jobs
      .filter((job) => getters.INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter((job) => getters.INCLUDE_JOB_BY_JOB_TYPE(job))
      .filter((job) => getters.INCLUDE_JOB_BY_DEGREE(job))
      .filter((job) => getters.INCLUDE_JOB_BY_SKILL(job));
  },
};

export default getters;
