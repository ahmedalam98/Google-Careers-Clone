<template>
  <Accordion :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="value in uniqueValues" :key="value" class="w-1/2 h-8">
            <input
              :id="value"
              type="checkbox"
              v-model="selectedValues"
              :value="value"
              class="mr-3"
              :data-test="value"
              @change="selectValue"
            />
            <label :for="value" data-test="value">{{ value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </Accordion>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Accordion from "@/components/Shared/Accordion.vue";
import { CLEAR_USER_JOB_FILTER_SELECTIONS } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSideBarCheckboxGroup",
  components: {
    Accordion,
  },
  props: {
    header: {
      type: String,
      required: true,
    },
    uniqueValues: {
      type: Set,
      required: true,
    },
    mutation: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const selectedValues = ref([]);

    // we use store.subscribe to make the store state listens to the specific mutation we are interested in.
    store.subscribe((mutation) => {
      if (mutation.type === CLEAR_USER_JOB_FILTER_SELECTIONS) {
        selectedValues.value = [];
      }
    });

    const selectValue = () => {
      store.commit(props.mutation, selectedValues.value);
      router.push({ name: "JobResults" });
    };
    return {
      selectedValues,
      selectValue,
    };
  },
});
</script>
