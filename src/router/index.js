import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobResultsView from "@/views/JobResultsView.vue";

const routes = [
  // for each object in the array, ***we have path, name and component***.
  // the path is the URL that the user will see in the browser.
  // the name gives a unique name to its route + we can use it through app in order to navigate instead of remembering the path.
  // the component is the component that will be rendered when the user navigates to that route.
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jobs/results",
    name: "JobResults",
    component: JobResultsView,
  },
];

const router = createRouter({
  // we set it and forget it. it will keep track of the history of user routes backwords and forwards.
  history: createWebHashHistory(),
  routes,
});

export default router;
