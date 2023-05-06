import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from "@/views/HomeView.vue";
// import JobResultsView from "@/views/JobResultsView.vue";
// import JobView from "@/views/JobView.vue";

// Lazy Loading : dynamic import syntax to tell webpack that we want to split the code into separate chunks.
const HomeView = () => import("@/views/HomeView.vue");

// grouping lazy loaded components by creating a separate chunk for all the routes that are related to jobs.
const JobResultsView = () =>
  import(/* webpackChunkName: "jobs"*/ "@/views/JobResultsView.vue");
const JobView = () =>
  import(/* webpackChunkName: "jobs"*/ "@/views/JobView.vue");

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
  // id ---> is a **dynamic parameter** that we can use to pass the id of the job that we want to display.
  // whatever we write after the colon will be the name of the parameter of ( this.$route.params.id ) in the component.
  {
    path: "/jobs/results/:id",
    name: "JobListing",
    component: JobView,
  },
];

const router = createRouter({
  // we set it and forget it. it will keep track of the history of user routes backwords and forwards.
  history: createWebHashHistory(),
  routes,
});

export default router;
