<template>
  <div class="flex h-screen">
    <div class="m-auto">
      <p class="text-center text-3xl mb-28">
        Job Route Parameter : {{ currentJobId }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobView",
  computed: {
    currentJobId() {
      return this.$route.params.id;
    },
  },
};
</script>
