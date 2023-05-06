<template>
  <!-- passing classes as array : means go ahead and apply the tailwind classes all time, also accept the computed class -->
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <router-link
          to="/"
          class="flex items-center h-full text-xl text-gray-700 pb-0.5"
          >Google Careers</router-link
        >
        <nav class="h-full ml-12">
          <ul class="flex h-full p-0 m-0 list-none">
            <!-- first:ml-0 --- after setting up a variant inside tailwind.config means that the first element will not have a margin-left like the rest of list items -->
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="h-full ml-9 first:ml-0"
              data-test="main-nav-list-item"
            >
              <router-link
                :to="menuItem.url"
                class="flex items-center h-full py-2.5 text-gray-700 hover:text-gray-950"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>
        <div class="flex items-center h-full ml-auto">
          <ProfileImage v-if="isLoggedIn" data-test="profile-image" />
          <ActionButton
            v-else
            text="Sign in"
            type="primary"
            data-test="login-button"
            @click="handleLogin"
          />
        </div>
      </div>
      <SubNav v-if="isLoggedIn" data-test="subnav" />
    </div>
  </header>
</template>

<script>
import ActionButton from "../Shared/ActionButton.vue";
import ProfileImage from "./ProfileImage.vue";
import SubNav from "./SubNav.vue";
export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
    SubNav,
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true;
    },
  },
  computed: {
    // to fix the MainNav & SubNav are hiding the Hero component
    headerHeightClass() {
      return (this.$route.name === "JobResults") & this.isLoggedIn
        ? "h-32"
        : "h-16";
    },
  },
  data() {
    return {
      menuItems: [
        { text: "Teams", url: "/" },
        { text: "Location", url: "/" },
        { text: "Benefits", url: "/" },
        { text: "Jobs", url: "/jobs/results" },
        { text: "Students", url: "/" },
      ],
      isLoggedIn: false,
    };
  },
};
</script>
