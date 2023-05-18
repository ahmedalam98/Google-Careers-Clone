<template>
  <img
    :src="imageSrc"
    alt="My Image"
    class="w-8 h-8 object-contain rounded-3xl"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileImage",
  data() {
    return {
      imageSrc: require("../../assets/user.jpeg"),
    };
  },
});
</script>
