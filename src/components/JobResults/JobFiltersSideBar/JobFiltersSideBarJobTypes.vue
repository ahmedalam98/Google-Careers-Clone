<template>
  <Accordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="jobType in uniqueJobTypes"
            :key="jobType"
            class="w-1/2 h-8"
          >
            <input
              :id="jobType"
              type="checkbox"
              v-model="selectedJobTypes"
              :value="jobType"
              class="mr-3"
              :data-test="jobType"
              @change="selectJobTypes"
            />
            <label :for="jobType" data-test="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </Accordion>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useUniqueJobTypes } from "@/store/composables";
import { ADD_SELECTED_JOB_TYPES } from "@/store/constants";

import Accordion from "@/components/Shared/Accordion.vue";
export default {
  name: "JobFiltersSideBarJobTypes",
  components: {
    Accordion,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const selectedJobTypes = ref([]);
    const uniqueJobTypes = useUniqueJobTypes();

    const selectJobTypes = () => {
      store.commit(ADD_SELECTED_JOB_TYPES, selectedJobTypes.value);
      router.push({ name: "JobResults" });
    };

    return {
      selectedJobTypes,
      uniqueJobTypes,
      selectJobTypes,
    };
  },
};
</script>
