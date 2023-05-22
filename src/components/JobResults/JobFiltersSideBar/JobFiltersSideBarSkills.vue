<template>
  <Accordion :header="header">
    <div class="mt-5">
      <input
        v-model.lazy.trim="skillsSearchTerm"
        type="text"
        class="p-3 h-12 border border-solid border-brand-gray-1 shadow-gray rounded w-full text-base"
        placeholder="Computer programming, Finance degree"
        data-test="skills-search-input"
      />
    </div>
  </Accordion>
</template>

<script lang="ts">
import Accordion from "@/components/Shared/Accordion.vue";
import { UPDATE_SKILLS_SEARCH_TERM } from "@/store/constants";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "JobFiltersSidebarSkills",
  components: { Accordion },
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const skillsSearchTerm = computed({
      get() {
        return store.state.skillsSearchTerm;
      },
      set(value) {
        store.commit(UPDATE_SKILLS_SEARCH_TERM, value);
      },
    });
    return { skillsSearchTerm };
  },
});
</script>
