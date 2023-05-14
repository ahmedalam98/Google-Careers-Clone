<template>
  <Accordion header="Degrees">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="degree in UNIQUE_DEGREES" :key="degree" class="w-1/2 h-8">
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
import { mapMutations, mapGetters } from "vuex";
import { ADD_SELECTED_DEGREES, UNIQUE_DEGREES } from "@/store/constants";

import Accordion from "@/components/Shared/Accordion.vue";
export default {
  name: "JobFiltersSideBarDegrees",
  components: {
    Accordion,
  },
  data() {
    return {
      selectedDegrees: [],
    };
  },
  computed: {
    ...mapGetters([UNIQUE_DEGREES]),
  },
  methods: {
    ...mapMutations([ADD_SELECTED_DEGREES]),
    selectDegrees() {
      this.ADD_SELECTED_DEGREES(this.selectedDegrees);
    },
  },
};
</script>
