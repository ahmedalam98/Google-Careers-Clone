<template>
  <form
    class="flex items-center w-full h-12 mt-14 border border-solid border-brand-gray-3 rounded-3xl"
    @submit.prevent="searchForJobs"
  >
    <font-awesome-icon
      class="ml-4 mr-3 text-gray-600"
      :icon="['fas', 'search']"
    />
    <div class="flex flex-nowrap flex-1 h-full text-base font-light">
      <div class="relative flex items-center flex-1 h-full pr-3">
        <label class="absolute left-0 -top-10 font-normal">Role</label>
        <TextInput
          placeholder="Software engineer"
          v-model="role"
          data-test="role-input"
        />
      </div>

      <span
        class="flex items-center h-full px-3 border-l border-r border-brand-gray-3 bg-brand-gray-2 font-normal"
        >in</span
      >
      <div class="relative flex items-center flex-1 h-full pl-3">
        <label class="absolute left-0 -top-10 font-normal">Where?</label>
        <TextInput
          placeholder="Los Angeles"
          v-model="location"
          data-test="location-input"
        />
      </div>
    </div>
    <ActionButton
      text="Search"
      type="secondary"
      class="rounded-r-3xl"
      data-test="submit-button"
    />
  </form>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";

import ActionButton from "../Shared/ActionButton.vue";
import TextInput from "../Shared/TextInput.vue";
export default defineComponent({
  name: "JobSearchForm",
  components: {
    ActionButton,
    TextInput,
  },
  setup() {
    const router = useRouter();

    const role = ref("");
    const location = ref("");
    const searchForJobs = () => {
      router.push({
        name: "JobResults",
        query: {
          role: role.value,
          location: location.value,
        },
      });
    };
    return {
      role,
      location,
      searchForJobs,
    };
  },
});
</script>
