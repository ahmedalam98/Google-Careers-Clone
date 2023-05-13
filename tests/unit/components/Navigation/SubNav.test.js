import { describe, it, expect } from "@jest/globals";
import { mount } from "@vue/test-utils";
import SubNav from "@/components/Navigation/SubNav.vue";

describe("SubNav.vue", () => {
  // factory function to refactor repetitive code
  const createConfig = (routeName, $store = {}) => ({
    global: {
      mocks: {
        $route: {
          name: routeName,
        },
        $store,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when  user is on job page", () => {
    it("displays the job count", () => {
      const routeName = "JobResults";
      const $store = {
        getters: {
          FILTERED_JOBS_BY_ORGANIZATIONS: [{ id: "1" }, { id: "2" }],
        },
      };
      const wrapper = mount(SubNav, createConfig(routeName, $store));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });

  describe("when  user is not on job page", () => {
    it("doesn't display the job count", () => {
      const routeName = "Home";
      const wrapper = mount(SubNav, createConfig(routeName));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
