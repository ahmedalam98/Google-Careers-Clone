import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import App from "@/App.vue";
import "./assets/tailwind.css";
import router from "@/router";

library.add(faSearch);

// createApp(App) creates a new Vue instance and mounts it to the #app element.
// component("font-awesome-icon", FontAwesomeIcon) registers the FontAwesomeIcon component globally.
// mount("#app") mounts the Vue instance to the #app element.
createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
