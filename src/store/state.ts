import { GlobalState } from "@/store/types";

const state = (): GlobalState => {
  return {
    isLoggedIn: false,
    jobs: [],
    selectedOrganizations: [],
    selectedJobTypes: [],
    selectedDegrees: [],
    skillsSearchTerm: "",
  };
};

export default state;
