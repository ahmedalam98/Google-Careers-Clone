<template>
  <div class="flex h-screen">
    <div class="m-auto p-12">
      <div
        class="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl"
      >
        <div class="px-4 py-2">
          <h2 class="text-2xl font-bold">{{ currentJob.title }}</h2>

          <p class="text-gray-600 mt-3">
            <svg
              role="presentation"
              xmlns="http://www.w3.org/2000/svg"
              class="gc-icon inline-block w-6 h-6 fill-current text-gray-500 mr-1 mb-1"
            >
              <g>
                <path
                  d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"
                ></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </g>
            </svg>

            {{ currentJob.organization }}
          </p>

          <div class="flex items-center mt-4">
            <div class="flex items-center mr-6">
              <svg
                viewBox="0 0 24 24"
                class="h-6 w-6 fill-current text-gray-500 mr-2"
              >
                <path
                  d="M17.66 3h-11a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-1 14H8.34a1 1 0 0 1 0-2h8.32a1 1 0 0 1 0 2zm0-4H8.34a1 1 0 0 1 0-2h8.32a1 1 0 0 1 0 2zm0-4H8.34a1 1 0 0 1 0-2h8.32a1 1 0 0 1 0 2z"
                />
              </svg>
              <p class="text-gray-600">{{ currentJob.degree }}</p>
            </div>
            <div class="flex items-center mr-6">
              <svg
                viewBox="0 0 24 24"
                role="presentation"
                xmlns="http://www.w3.org/2000/svg"
                class="gc-icon h-6 w-6 fill-current text-gray-500 mr-2"
              >
                <g>
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path
                    d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"
                  ></path>
                </g>
              </svg>
              <p class="text-gray-600">{{ currentJob.jobType }}</p>
            </div>
            <div class="flex items-center">
              <svg
                viewBox="0 0 18 24"
                role="presentation"
                xmlns="http://www.w3.org/2000/svg"
                class="gc-icon h-6 w-6 fill-current text-gray-500 mr-2"
              >
                <g>
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  ></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </g>
              </svg>
              <p class="text-gray-600">{{ currentJob.locations.join(", ") }}</p>
            </div>
          </div>
          <div class="mt-4">
            <h3 class="text-lg font-bold mb-2">Minimum Qualifications</h3>
            <ul class="list-disc list-inside mb-4">
              <li
                v-for="qualification in currentJob.minimumQualifications"
                :key="qualification"
              >
                {{ qualification }}
              </li>
            </ul>
            <h3 class="text-lg font-bold mb-2">Preferred Qualifications</h3>
            <ul class="list-disc list-inside">
              <li
                v-for="qualification in currentJob.preferredQualifications"
                :key="qualification"
              >
                {{ qualification }}
              </li>
            </ul>
          </div>
          <div class="mt-4">
            <h3 class="text-lg font-bold mb-2">Description</h3>
            <p>{{ currentJob.description.join(", ") }}</p>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <ActionButton text="Apply" type="primary" class="mb-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue";
export default {
  name: "JobView",
  components: {
    ActionButton,
  },
  computed: {
    currentJob() {
      const jobs = this.$store.state.jobs;
      const job = jobs.find((job) => job.id === +this.$route.params.id);
      return job;
    },
  },
};
</script>
