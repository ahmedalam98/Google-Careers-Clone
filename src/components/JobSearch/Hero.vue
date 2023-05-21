<template>
  <main class="flex flex-col h-screen">
    <section class="flex flex-col pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-start-1 col-span-1"></div>
        <div class="col-start-2 col-span-5">
          <Headline />
          <JobSearchForm />
        </div>
        <div class="col-start-7 col-span-5 self-center justify-self-center">
          <img
            class="ml-10"
            src="https://careers.google.com/jobs/dist/img/assets/hero-04_1x.5377e160fa426c8b388a861f23cc185b.png"
            alt="hero image"
          />
        </div>
        <div class="col-start-12 col-span1"></div>
      </div>
    </section>

    <!-----------Spotlight slot injection----------->
    <Spotlight class="flex flex-row justify-center pb-16 px-4">
      <!--slotProps is the object of data for spotlights, you can assign any name to it-->
      <template #default="{ img, title, description }">
        <router-link
          to="/jobs/results"
          class="flex flex-col mx-5 border rounded-lg w-72 bg-brand-gray-2 h-96"
          :style="{ width: '600px', height: '300' }"
        >
          <div
            class="flex flex-col justify-end h-full bg-cover"
            :style="{ backgroundImage: 'url(' + img + ')' }"
          >
            <div class="text-white">
              <div class="px-6 py-4">
                <h3 class="text-3xl">{{ title }}</h3>
                <p class="pt-4 text-xl">
                  {{ description }}
                </p>
              </div>
            </div>

            <router-link
              to="/jobs/results"
              class="px-6 pb-4 text-sm text-white"
            >
              See jobs
            </router-link>
          </div>
        </router-link>
      </template>
    </Spotlight>
  </main>
</template>

<script lang="ts">
import Headline from "./Headline.vue";
import JobSearchForm from "./JobSearchForm.vue";
import Spotlight from "./Spotlight.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Hero",
  components: {
    Headline,
    JobSearchForm,
    Spotlight,
  },
});
</script>
