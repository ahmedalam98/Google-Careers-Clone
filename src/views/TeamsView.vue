<template>
  <HeaderContainer>
    <!--customizing named slots inside HeaderContainer-->
    <template v-slot:title>
      <h1 class="w-full text-4xl font-semibold text-gray-700">Teams</h1>
    </template>
    <template v-slot:subtitle>
      <h2 class="w-full my-4 text-base font-light">
        Together, we create access to information and build products that
        improve people's lives. Want to be a Googler? Find your role.
      </h2>
    </template>
  </HeaderContainer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

export default defineComponent({
  name: "TeamsView",
  components: {
    HeaderContainer,
  },
});
</script>
