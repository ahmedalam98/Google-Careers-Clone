<template>
  <div id="app">
    <MainNav />
    <!-- router-view is the top level component that will load the routes objects that inside "indes.js"-->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainNav from "./components/Navigation/MainNav.vue";
export default defineComponent({
  name: "App",
  components: {
    MainNav,
  },
});
</script>
