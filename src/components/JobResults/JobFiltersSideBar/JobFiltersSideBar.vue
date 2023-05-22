<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton
            text="Clear Filters"
            type="secondary"
            @click="clearUserJobFiltersSelections"
          />
        </div>
      </div>

      <JobFiltersSideBarSkills header="Skills and Qualifications" />

      <!-- header is a static property.So, using a binding for header is unnecessary because it doesn't need to be reactive -->
      <!-- uniqueValues and mutation are dynamic and dependent on the component's props and state-->
      <JobFitlersSideBarCheckboxGroup
        header="Degrees"
        :uniqueValues="uniqueDegrees"
        :mutation="ADD_SELECTED_DEGREES"
      />
      <JobFitlersSideBarCheckboxGroup
        header="Job Types"
        :uniqueValues="uniqueJobTypes"
        :mutation="ADD_SELECTED_JOB_TYPES"
      />
      <JobFitlersSideBarCheckboxGroup
        header="Organizations"
        :uniqueValues="uniqueOrganizations"
        :mutation="ADD_SELECTED_ORGANIZATIONS"
      />
    </section>
  </div>
</template>

<script lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue";
import JobFitlersSideBarCheckboxGroup from "./JobFiltersSideBarCheckboxGroup.vue";
import JobFiltersSideBarSkills from "./JobFiltersSideBarSkills.vue";

import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

/**** COMPOSABLES ****/
import { useUniqueOrganizations } from "@/store/composables";
import { useUniqueJobTypes } from "@/store/composables";
import { useUniqueDegrees } from "@/store/composables";

/**** MUTATIONS ****/
import {
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
  ADD_SELECTED_DEGREES,
  CLEAR_USER_JOB_FILTER_SELECTIONS,
  UPDATE_SKILLS_SEARCH_TERM,
} from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSideBar",
  components: {
    ActionButton,
    JobFitlersSideBarCheckboxGroup,
    JobFiltersSideBarSkills,
  },
  setup() {
    const store = useStore();

    // Skills Search Term Feature
    const parseSkillsSearchTerm = () => {
      const route = useRoute();
      const role = route.query.role || "";
      store.commit(UPDATE_SKILLS_SEARCH_TERM, role);
    };
    onMounted(parseSkillsSearchTerm);

    const uniqueOrganizations = useUniqueOrganizations();
    const uniqueJobTypes = useUniqueJobTypes();
    const uniqueDegrees = useUniqueDegrees();
    const clearUserJobFiltersSelections = () => {
      store.commit(CLEAR_USER_JOB_FILTER_SELECTIONS);
    };

    return {
      uniqueOrganizations,
      uniqueJobTypes,
      uniqueDegrees,
      ADD_SELECTED_ORGANIZATIONS,
      ADD_SELECTED_JOB_TYPES,
      ADD_SELECTED_DEGREES,
      clearUserJobFiltersSelections,
    };
  },
});
</script>
