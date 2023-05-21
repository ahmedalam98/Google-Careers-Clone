<template>
  <div class="flex flex-row flex-nowrap w-full">
    <JobFiltersSideBar />
    <JobListings />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import JobFiltersSideBar from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBar.vue";
import JobListings from "@/components/JobResults/JobListings.vue";

export default defineComponent({
  name: "JobResultsView",
  components: {
    JobFiltersSideBar,
    JobListings,
  },
});
</script>
