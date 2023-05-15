<template>
  <Accordion header="Degrees">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="degree in uniqueDegrees" :key="degree" class="w-1/2 h-8">
            <input
              :id="degree"
              type="checkbox"
              v-model="selectedDegrees"
              :value="degree"
              class="mr-3"
              :data-test="degree"
              @change="selectDegrees"
            />
            <label :for="degree" data-test="degree">{{ degree }}</label>
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
import { useUniqueDegrees } from "@/store/composables";
import { ADD_SELECTED_DEGREES } from "@/store/constants";

import Accordion from "@/components/Shared/Accordion.vue";
export default {
  name: "JobFiltersSideBarDegrees",
  components: {
    Accordion,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const selectedDegrees = ref([]);
    const uniqueDegrees = useUniqueDegrees();

    const selectDegrees = () => {
      store.commit(ADD_SELECTED_DEGREES, selectedDegrees.value);
      router.push({ name: "JobResults" });
    };

    return {
      selectedDegrees,
      uniqueDegrees,
      selectDegrees,
    };
  },
};
</script>
