<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <JobListing
        v-for="job in jobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      ></JobListing>
    </ol>
  </main>
</template>

<script>
import axios from "axios";

import JobListing from "@/components/JobResults/JobListing.vue";
export default {
  name: "JobListings",
  components: {
    JobListing,
  },
  data() {
    return {
      // jobs is an array of objects that will be returned from the API call to the backend
      jobs: [],
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:3000/jobs");
    this.jobs = response.data;
  },
};
</script>
