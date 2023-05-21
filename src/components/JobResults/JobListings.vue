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

<script lang="ts">
import JobListing from "@/components/JobResults/JobListing.vue";

import { onMounted, computed } from "vue";

import { useFilteredJobs, useFetchJobsDispatch } from "@/store/composables";
import useCurrentPage from "@/composables/useCurrentPage";
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";

import { defineComponent } from "vue";

export default defineComponent({
  name: "JobListings",
  components: {
    JobListing,
  },
  setup() {
    /*******COMPOSABLES*******/
    const fetchJobs = useFetchJobsDispatch();
    onMounted(() => {
      fetchJobs;
    });

    const filteredJobs = useFilteredJobs();

    const maxPage = computed(() => Math.ceil(filteredJobs.value.length / 10));

    const currentPage = useCurrentPage();

    const { previousPage, nextPage } = usePreviousAndNextPages(
      currentPage,
      maxPage
    );

    /************************* PAGES LOGIC *************************/
    // const route = useRoute();

    // const currentPage = computed(() =>
    //   Number.parseInt(route.query.page || "1")
    // );

    // const previousPage = computed(() => {
    //   const previousPage = currentPage.value - 1;
    //   const firstPage = 1;
    //   return previousPage >= firstPage ? previousPage : undefined;
    // });

    // const nextPage = computed(() => {
    //   const nextPage = currentPage.value + 1;
    //   const maxPage = Math.ceil(filteredJobs.value.length / 5);
    //   return nextPage <= maxPage ? nextPage : undefined;
    // });

    const displayedJobs = computed(() => {
      const pageNumber = currentPage.value;
      const firstJobIndex = (+pageNumber - 1) * 10;
      const lastJobIndex = +pageNumber * 10;
      return filteredJobs.value.slice(firstJobIndex, lastJobIndex);
    });

    return {
      filteredJobs,
      currentPage,
      previousPage,
      nextPage,
      displayedJobs,
    };
  },
});
</script>
