<template>
  <div class="fixed top-0 left-0 w-full h-16 bg-white">
    <div
      class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
    >
      <a :href="url" class="flex items-center h-full text-xl">{{ company }}</a>
      <nav class="h-full ml-12">
        <ul class="flex h-full p-0 m-0 list-none">
          <!-- first:ml-0 --- after setting up a variant inside tailwind.config means that the first element will not have a margin-left like the rest of list items -->
          <li
            v-for="menuItem in menuItems"
            :key="menuItem"
            class="h-full ml-9 first:ml-0"
            data-test="main-nav-list-item"
          >
            <a href="" class="flex items-center h-full py-2.5">{{
              menuItem
            }}</a>
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
  </div>
</template>

<script>
import ActionButton from "./ActionButton.vue";
import ProfileImage from "./ProfileImage.vue";
export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true;
    },
  },
  data() {
    return {
      company: "Google Careers",
      url: "/",
      menuItems: ["Teams", "Location", "Benefits", "Jobs", "Students"],
      isLoggedIn: false,
    };
  },
};
</script>
