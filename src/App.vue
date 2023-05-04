<template>
  <div id="app">
    <MainNav />
    <!-- router-view is the top level component that will load the routes objects that inside "indes.js"-->
    <router-view />
  </div>
</template>

<script>
import MainNav from "./components/Navigation/MainNav.vue";
export default {
  name: "App",
  components: {
    MainNav,
  },
};
</script>
