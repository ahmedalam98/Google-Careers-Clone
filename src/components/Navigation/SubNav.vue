<template>
  <div
    v-if="onJobResultsPage"
    class="w-full h-16 bg-white border-b border-solid border-brand-gray-1"
  >
    <div class="flex items-center h-full px-8">
      <div data-test="job-count">
        <!-- icon prop used to customize the actual icon -->
        <font-awesome-icon
          class="mr-3 text-gray-600 text-base"
          :icon="['fas', 'search']"
        />
        <span>
          <span class="text-brand-green-1">{{
            FILTERED_JOBS_BY_ORGANIZATIONS.length
          }}</span>
          jobs matched
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FILTERED_JOBS_BY_ORGANIZATIONS } from "@/store";

export default {
  name: "SubNav",
  computed: {
    ...mapGetters([FILTERED_JOBS_BY_ORGANIZATIONS]),

    onJobResultsPage() {
      return this.$route.name === "JobResults";
    },
  },
};
</script>
