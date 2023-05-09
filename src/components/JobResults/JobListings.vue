<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <JobListing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      ></JobListing>
      <h1 v-if="currentPage > 10" class="text-2xl text-center">
        No jobs found
      </h1>
    </ol>

    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow" v-if="currentPage <= 10">
          Page {{ currentPage }}
        </p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage && currentPage <= 10"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sn font-semibold text-brand-blue-1"
            data-test="previous-page-link"
            >Previous</router-link
          >

          <router-link
            v-if="nextPage"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sn font-semibold text-brand-blue-1"
            data-test="next-page-link"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import JobListing from "@/components/JobResults/JobListing.vue";

import { mapState } from "vuex";
import { FETCH_JOBS } from "@/store";

export default {
  name: "JobListings",
  components: {
    JobListing,
  },
  computed: {
    currentPage() {
      // get the page number from the query string.
      const pageString = this.$route.query.page || "1"; // **page** is a custom query parameter

      // parseInt converts the string to a number
      return Number.parseInt(pageString);
    },

    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const maxPage = Math.ceil(this.jobs.length / 10);
      return nextPage <= maxPage ? nextPage : undefined;
    },

    displayedJobs() {
      const pageNumber = this.currentPage;
      // multiply the page number by 10 to get the index of the first job on the page
      const firstJobIndex = (pageNumber - 1) * 10; // page number 1 means jobs index 0:9
      const lastJobIndex = pageNumber * 10;

      return this.jobs.slice(firstJobIndex, lastJobIndex);
    },
    ...mapState(["jobs"]),
  },
  async mounted() {
    this.$store.dispatch(FETCH_JOBS);
  },
};
</script>
