import { describe, it, expect } from "@jest/globals";
import { mount } from "@vue/test-utils";
import SubNav from "@/components/Navigation/SubNav.vue";

describe("SubNav.vue", () => {
  // factory function to refactor repetitive code
  const createConfig = (routeName) => ({
    global: {
      mocks: {
        $route: {
          name: routeName,
        },
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when  user is on job page", () => {
    it("displays the job count", () => {
      const routeName = "JobResults";
      const wrapper = mount(SubNav, createConfig(routeName));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(true);
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
