<template>
  <img
    :src="imageSrc"
    alt="My Image"
    class="w-9 h-9 object-contain rounded-3xl"
  />
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      imageSrc: require("../assets/user.jpeg"),
    };
  },
};
</script>
