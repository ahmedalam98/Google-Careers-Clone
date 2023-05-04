import { describe, it, expect } from "@jest/globals";
import { mount } from "@vue/test-utils";
import SubNav from "@/components/Navigation/SubNav.vue";

describe("SubNav.vue", () => {
  describe("when  user is on job page", () => {
    it("displays the job count", () => {
      const wrapper = mount(SubNav, {
        data() {
          return {
            onJobResultsPage: true,
          };
        },
      });
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(true);
    });
  });

  describe("when  user is not on job page", () => {
    it("doesn't display the job count", () => {
      const wrapper = mount(SubNav, {
        // global object is used to mock global components
        global: {
          // stubs used to be a replacement for FontAwesomeIcon
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        data() {
          return {
            onJobResultsPage: false,
          };
        },
      });
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
