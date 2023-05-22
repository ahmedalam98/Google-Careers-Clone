// mutation types to avoid typos

/* USER */
export const LOGIN_USER = "LOGIN_USER"; // mutation

/* JOBS */
export const RECEIVE_JOBS = "RECEIVE_JOBS"; // mutation
export const FETCH_JOBS = "FETCH_JOBS"; // action
export const FILTERED_JOBS = "FILTERED_JOBS"; // getter
export const CLEAR_USER_JOB_FILTER_SELECTIONS =
  "CLEAR_USER_JOB_FILTER_SELECTIONS"; // mutation

/* ORGANIZATIONS */
export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS"; // mutation
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS"; // getter

export const INCLUDE_JOB_BY_ORGANIZATION = "INCLUDE_JOB_BY_ORGANIZATION"; // getter

/* JOB TYPES */
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES"; // mutation
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES"; // getter
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE"; // getter

/* DEGREES */
export const ADD_SELECTED_DEGREES = "ADD_SELECTED_DEGREES"; // mutation
export const UNIQUE_DEGREES = "UNIQUE_DEGREES"; // getter
export const INCLUDE_JOB_BY_DEGREE = "INCLUDE_JOB_BY_DEGREE"; // getter
